import Phaser from "phaser";

export default class Enemy1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, platforms, player, direction) {
    super(scene, x, y, "Enemy_idle_1.png");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.player = player;
    scene.physics.add.collider(
      this,
      platforms,
      this.handlePlatformCollision,
      null,
      this
    );
    this.setOrigin(0.5, 0.5).setScale(1, 1);
    this.setSize(60, 85).setOffset(20, 30);
    this.body.collideWorldBounds = true;
    this.setBounce(0);
    this.setDrag(1000, 0);
    this.initializeAni();
    this.platforms = platforms;
    this.playerVel = 180;
    this.worldGrav = 3000;
    this.fireRate = 800;
    this.lastFired = 0;
    this.bulletSpeed = 500;
    this.moving = false;
    this.shootflg = false;
    this.shootAngle;
    this.playerDetect = false;
    this.direction = direction;
    this.maxHealth = 175;
    this.health = this.maxHealth;
    this.createHealthBar();
    this.timeToMove = 0;
    this.firstDetect = false;
    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
    });
  }

  handleDamage(player, bullet) {
    if (!player || !bullet) return;
    player.takeDamage(5);
    bullet.destroy();
  }

  initializeAni() {
    this.anims.create({
      key: "enemy_idle",
      frames: [
        { key: "enemy1_idle_1" },
        { key: "enemy1_idle_2" },
        { key: "enemy1_idle_3" },
        { key: "enemy1_idle_4" },
        { key: "enemy1_idle_5" },
        { key: "enemy1_idle_6" },
        { key: "enemy1_idle_7" },
        { key: "enemy1_idle_8" },
        { key: "enemy1_idle_9" },
      ],
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy_shoot",
      frames: [
        { key: "enemy1_shoot_1" },
        { key: "enemy1_shoot_2" },
        { key: "enemy1_shoot_3" },
        { key: "enemy1_shoot_4" },
        { key: "enemy1_shoot_5" },
        { key: "enemy1_shoot_6" },
        { key: "enemy1_shoot_7" },
        { key: "enemy1_shoot_8" },
        { key: "enemy1_shoot_9" },
        { key: "enemy1_shoot_10" },
      ],
      frameRate: 2,
      repeat: -1,
    });
  }

  update(time, delta) {
    if (!this.scene || !this.active) return;
    this.detectPlayer();

    if (this.playerDetect) {
      if (this.firstDetect) {
        this.timeToMove = time;
        this.firstDetect = false;
      }
      if (
        (this.player.x < this.x && this.direction === "right") ||
        (this.player.x > this.x && this.direction === "left")
      ) {
        this.direction = this.direction === "left" ? "right" : "left";
        this.flipX = !this.flipX;
      }
      if (Math.floor(120 * (time - this.timeToMove)) % 70 == 0) {
        this.triggerRandomMovement();
      }
      this.fireBullet();
    } else {
      this.firstDetect = true;
      this.movement();
    }

    this.handleInput();
    this.updateHealth();
  }

  enemyDie() {
    this.scene.events.emit('enemyKilled'); 
    this.destroy();
  }

  triggerRandomMovement() {
    const randomDirection = Phaser.Math.RND.pick(["left", "right"]);
    const randomDistance = 400;
    this.setVelocityX(
      randomDirection === "left" ? -randomDistance : randomDistance
    );
  }

  handleInput() {
    if (this.moving) {
      if (
        !this.anims.isPlaying ||
        this.anims.currentAnim.key !== "enemy_idle"
      ) {
        this.play("enemy_idle", true);
      }
    }
  }

  detectPlayer() {
    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    if (distanceToPlayer <= 500) {
      const ray = new Phaser.Geom.Line(
        this.x,
        this.y,
        this.player.x,
        this.player.y
      );

      // Check if any platform is between the enemy and the player
      const blocked = this.platforms.getChildren().some((platform) => {
        const bounds = platform.getBounds();
        return Phaser.Geom.Intersects.LineToRectangle(ray, bounds);
      });
      console.log(blocked);

      if (!blocked) {
        this.playerDetect = true;
        this.shootAngle = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          this.player.x,
          this.player.y - 20
        );
      } else {
        // The line of sight is blocked by a platform, so the enemy should not detect the player
        this.playerDetect = false;
      }
    } else {
      this.playerDetect = false;
    }
  }

  movement() {
    if (this.direction === "left") {
      this.setVelocityX(-this.playerVel);
      this.flipX = false;
      this.moving = true;
    } else {
      this.setVelocityX(this.playerVel);
      this.flipX = true;
      this.moving = true;
    }
  }

  handlePlatformCollision() {
    if (!this.scene || !this.active) return;
    if (!this.playerDetect) {
      if (this.direction === "left") {
        this.direction = "right";
      } else {
        this.direction = "left";
      }
    }
  }

  fireBullet() {
    if (!this.scene || !this.scene.time || !this.active) {
        console.error("Scene or Scene Time is not defined!");
        return;
    }
    if (this.scene.time.now > this.lastFired) {
      const bullet = this.bullets.create(
        this.flipX ? this.x - 20 : this.x + 20,
        this.y + 20,
        "bullet_1"
      );
      bullet.setTint(0xffff00);
      bullet.setScale(1, 1);
      bullet.play("player_bullet");
      bullet.setVelocity(
        Math.cos(this.shootAngle) * this.bulletSpeed,
        Math.sin(this.shootAngle) * this.bulletSpeed
      );
      bullet.rotation = this.shootAngle;
      bullet.body.allowGravity = false;
      this.scene.physics.add.collider(bullet, this.platforms, (bullet) => {
        bullet.destroy();
      });
      this.lastFired = this.scene.time.now + this.fireRate;
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.enemyDie();
      return;
    }
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.updateHealth();
  }

  updateHealth() {
    this.healthBar.clear();
    let color = 0xff0000;
    this.healthBar.fillStyle(color, 1);
    if (this.health == 0) {
      this.healthBar.fillRect(this.x - 55, this.y - 55, 0, 0);
    } else {
      this.healthBar.fillRoundedRect(
        this.x - 55,
        this.y - 55,
        0.7 * this.health,
        5,
        { tl: 2, tr: 2, bl: 2, br: 2 }
      );
    }
  }

  destroy(){
    super.destroy();
  }
}

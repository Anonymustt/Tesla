import Phaser from "phaser";

export default class EnemyHover extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, platforms, direction, velocity, ground, respawns, player) {
        super(scene, x, y, "Enemy 2 (1).png");
        this.moveTimer = null;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.player = player;
        this.ground = ground;
        this.respawns = respawns;
        this.velocity = velocity;
        this.moveTimer = this.scene.time.addEvent({
            delay: 2131,
            callback: this.handleMovement,
            callbackScope: this,
            loop: true
        });
        this.setOrigin(0.5, 0.5).setScale(1, 1);
        this.setSize(60, 85).setOffset(20, 30);
        this.body.collideWorldBounds = true;
        this.setBounce(0);
        this.setDrag(1000, 0);
        this.initializeAni();
        this.platforms = platforms;
        this.playerVel = 180;
        this.fireRate = 800;
        this.lastFired = 0;
        this.bulletSpeed = 500;
        this.moving = false;
        this.shootflg = false;
        this.shootAngle;
        this.playerDetect = false;
        this.direction = direction;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.createHealthBar();
        this.timeToMove = 0;
        this.firstDetect = false;
        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
        });

    }

    handleMovement() {
        if (!this.scene || !this.active) return;
        this.moving = true;
        this.currentState = 'moving';
    
        if (this.direction === 'left') {
            this.setVelocityX(this.velocity);
            this.direction = 'right';
            this.flipX = true;
        } else {
            this.setVelocityX(-this.velocity);
            this.direction = 'left';
            this.flipX = false;
        }
    }
    

    handleDamage(player, bullet) {
        if (!player || !bullet) return;
        player.takeDamage(2);
        bullet.destroy();
    }

    initializeAni() {
        this.anims.create({
            key: "enemy_idle",
            frames: [
                { key: "enemyHover_idle_1" },
                { key: "enemyHover_idle_2" },
                { key: "enemyHover_idle_3" },
                { key: "enemyHover_idle_4" },
                { key: "enemyHover_idle_5" },
                { key: "enemyHover_idle_6" }
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "enemy_shoot",
            frames: [
                { key: "enemyHover_attack_1" },
                { key: "enemyHover_attack_2" },
                { key: "enemyHover_attack_3" },
                { key: "enemyHover_attack_4" },
                { key: "enemyHover_attack_5" },
                { key: "enemyHover_attack_6" }
            ],
            frameRate: 2,
            repeat: -1,
        });
    }

    update(time, delta) {
        if (!this.scene || !this.active) return;
        this.detectPlayer();
        this.body.setAllowGravity(false);
        if (this.playerDetect) {
            if (
                (this.player.x < this.x && this.direction === "right") ||
                (this.player.x > this.x && this.direction === "left")
            ) {
                this.direction = this.direction === "left" ? "right" : "left";
                this.flipX = !this.flipX;
            }
            this.fireBullet();
        }
        this.handleInput();
        this.updateHealth();
    }

    enemyDie() {
        this.destroy();
    }

    handleInput() {
        if (
            !this.anims.isPlaying ||
            this.anims.currentAnim.key !== "enemy_idle"
        ) {
            this.play("enemy_idle", true);
        }
    }

    detectPlayer() {
        if (true) {
            const ray = new Phaser.Geom.Line(
                this.x,
                this.y,
                this.player.x,
                this.player.y
            );

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
                this.playerDetect = false;
            }
        } else {
            this.playerDetect = false;
        }
    }

    fireBullet() {
        if (!this.scene || !this.scene.time || !this.active) {
            console.error("Scene or Scene Time is not defined!");
            return;
        }
        if (this.scene.time.now > this.lastFired) {
            let angleIncrement = Math.PI / 6;
            let baseAngle = this.shootAngle;

            for (let i = 0; i < 6; i++) {
                const bullet = this.bullets.create(
                    this.x + (this.flipX ? -20 : 20),
                    this.y + 20,
                    "player_bullet_1"
                );
                bullet.setTint(0xffff00);
                bullet.setScale(0.7, 0.7);
                bullet.setSize(90, 50);
                bullet.play("player_bullet");

                let adjustedAngle = baseAngle + (this.flipX ? 1 : -1) * angleIncrement * i;
                bullet.setVelocity(
                    Math.cos(adjustedAngle) * this.bulletSpeed,
                    Math.sin(adjustedAngle) * this.bulletSpeed
                );
                bullet.rotation = adjustedAngle;
                bullet.body.allowGravity = false;

                this.scene.physics.add.collider(bullet, this.platforms, bullet => {
                    bullet.destroy();
                });
                this.scene.physics.add.collider(bullet, this.ground, bullet => {
                    bullet.destroy();
                });
            }
            this.lastFired = this.scene.time.now + this.fireRate;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.destroy();
            return;
        }
    }

    respawn() {
        if (this.respawns <= 0) return; 
        const newX = Phaser.Math.Between(300, this.scene.sizes.width - 300);
        const newY = Phaser.Math.Between(200, this.scene.sizes.height/2);
    
        this.setPosition(newX, newY);
        this.health = this.maxHealth;
    
        this.setActive(true);
        this.setVisible(true);
    
        this.moveTimer.reset({
            delay: 2131,
            callback: this.handleMovement,
            callbackScope: this,
            loop: true
        });
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
            this.healthBar.fillRect(this.x - 35, this.y - 55, 0, 0);
        } else {
            this.healthBar.fillRoundedRect(
                this.x - 35,
                this.y - 55,
                0.8 * this.health,
                5,
                { tl: 2, tr: 2, bl: 2, br: 2 }
            );
        }
    }

    destroy() {
        if (this.respawns > 0) {
            this.scene.events.emit('enemyKilled');
            this.respawn(); 
            this.respawns = this.respawns-1;
        } else {
            super.destroy(); 
        }
    }
}

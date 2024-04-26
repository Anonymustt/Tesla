import Phaser, { LEFT } from "phaser";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, platforms, player, direction) {
        super(scene, x, y, "Enemy_idle_1.png");
        this.moveTimer = null;
        this.dashTimer = null;
        this.fireFiveTimer = null;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.fireFiveTimer = this.scene.time.addEvent({
            delay: 3001,
            callback: this.fireFive,
            callbackScope: this,
            loop: true
        });
        this.dashTimer = this.scene.time.addEvent({
            delay: 3989, 
            callback: this.handleDash,
            callbackScope: this,
            loop: true
        });
        this.moveTimer = this.scene.time.addEvent({
            delay: 2131,
            callback: this.handleMovement,
            callbackScope: this,
            loop: true
        });
        this.player = player;
        this.setOrigin(0.5, 0.5).setScale(1, 1);
        this.setSize(90, 190).setOffset(45, 0);
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
        this.dashing = false;
        this.shootAngle;
        this.playerDetect = false;
        this.direction = direction;
        this.maxHealth = 1000;
        this.health = this.maxHealth;
        this.createHealthBar();
        this.timeToMove = 0;
        this.firstDetect = false;
        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
        });
        this.currentState = 'idle';
    }

    handleOverlapDamage(enemy, player){
        if(this.dashing){
            player.takeDamage(35, true);
        }else{
            player.takeDamage(10, true);
        }
        player.setVelocityX(0);
        player.setVelocityY(0);
    }

    handleDamage(player, bullet) {
        if (!player || !bullet) return;
        player.takeDamage(4);
        bullet.destroy();
        player.setVelocityX(0);
        player.setVelocityY(0);
    }

    initializeAni() {
        this.anims.create({
            key: "boss_idle",
            frames: [
                { key: "boss_idle_1" },
                { key: "boss_idle_2" },
                { key: "boss_idle_3" },
                { key: "boss_idle_4" },
                { key: "boss_idle_5" }
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "boss_walk",
            frames: [
                { key: "boss_walk_1" },
                { key: "boss_walk_2" },
                { key: "boss_walk_3" },
                { key: "boss_walk_4" },
                { key: "boss_walk_5" },
                { key: "boss_walk_6" },
                { key: "boss_walk_7" }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "boss_dash",
            frames: [
                { key: "boss_dash_1" },
                { key: "boss_dash_2" },
                { key: "boss_dash_3" },
                { key: "boss_dash_4" },
                { key: "boss_dash_5" },
                { key: "boss_dash_6" },
                { key: "boss_dash_7" },
                { key: "boss_dash_8" },
                { key: "boss_dash_9" },
                { key: "boss_dash_10" },
                { key: "boss_dash_11" },
                { key: "boss_dash_12" },
                { key: "boss_dash_13" },
                { key: "boss_dash_14" },
                { key: "boss_dash_15" },
                { key: "boss_dash_16" },
                { key: "boss_dash_17" },
                { key: "boss_dash_18" }
            ],
            frameRate: 60,
            repeat: -1
        });

        this.scene.anims.create({
            key: "enemy_bullet",
            frames: [
                { key: "enemy_bullet_1" },
                { key: "enemy_bullet_2" },
                { key: "enemy_bullet_3" },
                { key: "enemy_bullet_4" },
                { key: "enemy_bullet_5" },
                { key: "enemy_bullet_6" }
            ],
            frameRate: 24,
            repeat: -1,
        });
    }

    update(time, delta) {
        this.detectPlayer();
        this.flipX = (this.player.x > this.x);
        if (true) {
            this.fireBullet();
        }
        this.manageAnimations();
        this.updateHealth();
        if (this.body.velocity.x == 0) {
            this.moving = false;
            this.dashing = false;
            this.currentState = 'idle';
        }
    }

    handleMovement() {
        if (this.currentState === 'dashing') return;
        var distanceToPlayer = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            this.player.x,
            this.player.y
        );
        if (distanceToPlayer > 10) {
            this.moving = true;
            this.currentState = 'moving';
            distanceToPlayer = Math.floor(distanceToPlayer / Math.floor(distanceToPlayer));
            const velocity = distanceToPlayer * 800;
            if (this.player.x < this.x) {
                this.setVelocityX(-velocity);
                this.direction = 'left';
                this.flipX = false;
            } else {
                this.setVelocityX(velocity);
                this.direction = 'right';
                this.flipX = true;
            }
        } else {
            this.moving = false;
            this.currentState = 'moving';
            this.setVelocityX(0);
        }
    }

    handleDash() {
        if (this.currentState !== 'idle' && this.currentState !== 'moving') return;
        var distanceToPlayer = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            this.player.x,
            this.player.y
        );
        if (distanceToPlayer > 100) {
            this.dashing = true;
            this.currentState = 'dashing';
            distanceToPlayer = Math.floor(distanceToPlayer / Math.floor(distanceToPlayer));
            const velocity = distanceToPlayer * 1600;
            if (this.player.x < this.x) {
                this.setVelocityX(-velocity);
                this.direction = 'left';
                this.flipX = false;
            } else {
                this.setVelocityX(velocity);
                this.direction = 'right';
                this.flipX = true;
            }
        } else {
            this.dashing = false;
            this.currentState = 'idle';
            this.setVelocityX(0);
        }
    }

    manageAnimations() {
        switch (this.currentState) {
            case 'idle':
                if (!this.anims.isPlaying || this.anims.currentAnim.key !== "boss_idle") {
                    this.play("boss_idle", true);
                }
                break;
            case 'moving':
                if (!this.anims.isPlaying || this.anims.currentAnim.key !== "boss_walk") {
                    this.play("boss_walk", true);
                }
                break;
            case 'dashing':
                if (!this.anims.isPlaying || this.anims.currentAnim.key !== "boss_dash") {
                    this.play("boss_dash", true);
                }
                break;
        }
    }

    detectPlayer() {
        this.shootAngle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            this.player.x,
            this.player.y - 20);
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

    fireFive() {
        let angleIncrement = Math.PI / 6; 
        let baseAngle = this.shootAngle;
    
        for (let i = 0; i < 6; i++) {
            const bullet = this.bullets.create(
                this.x + (this.flipX ? -20 : 20), 
                this.y + 20,
                "enemy_bullet_1"
            );
            bullet.setScale(-0.7, 0.7);
            bullet.setSize(90, 50);
            bullet.play("enemy_bullet");

            let adjustedAngle = baseAngle + (this.flipX ? -1 : 1) * angleIncrement * i;    
            bullet.setVelocity(
                Math.cos(adjustedAngle) * this.bulletSpeed,
                Math.sin(adjustedAngle) * this.bulletSpeed
            );
            bullet.rotation = adjustedAngle;
            bullet.body.allowGravity = false;
    
            this.scene.physics.add.collider(bullet, this.platforms, bullet => {
                bullet.destroy();
            });
        }
    }
    

    fireBullet() {
        if (this.scene.time.now > this.lastFired) {
            const bullet = this.bullets.create(
                this.flipX ? this.x - 20 : this.x + 20,
                this.y + 20,
                "enemy_bullet_1"
            );
            bullet.setScale(-0.7, 0.7);
            bullet.setSize(90,50);
            bullet.play("enemy_bullet");
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
            this.health = 1000;
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
            this.healthBar.fillRect(this.x - 100, this.y - 100, 0, 0);
        } else {
            this.healthBar.fillRoundedRect(
                this.x - 100,
                this.y - 100,
                0.2 * this.health,
                5,
                { tl: 2, tr: 2, bl: 2, br: 2 }
            );
        }
    }
}

import Phaser from "phaser";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, platforms, enemies) {
        super(scene, x, y, "player.png");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.enemies = enemies;
        this.setOrigin(0.5, 0.5).setScale(1, 1);
        this.setSize(30, 85).setOffset(30, 10);
        this.body.collideWorldBounds = true;
        this.setBounce(0);
        //this.setDrag(1000, 0);
        this.initializeAni();
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
        this.scene = scene;
        this.platforms = platforms;
        this.jumpVel = 1200;
        this.playerVel = 380;
        this.dashSpeed = 1200;
        this.isJumping = false;
        this.isDashing = false;
        this.isDashingUp = false;
        this.lastDashTime = 0;
        this.dashCooldown = 1200;
        this.dashDuration = 250;
        this.lastOnGroundTime = 0;
        this.coyoteTime = 150;
        this.dashAni = false;
        this.didDashUp = false;
        this.worldGrav = 1000;
        this.fireRate = 200;
        this.lastFired = 0;
        this.bulletSpeed = 1000;
        this.moving = false;
        this.shootflg = false;
        this.shootAngle;

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.createHealthBar();

        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
        });
        this.mouse = scene.input.mousePointer;
        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        });
    }



    initializeAni() {
        this.anims.create({
            key: "player_idle",
            frames: [
                { key: "player_idle_f1" },
                { key: "player_idle_f2" },
                { key: "player_idle_f3" },
                { key: "player_idle_f4" },
            ],
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "player_move",
            frames: [
                { key: "player_walk_1" },
                { key: "player_walk_2" },
                { key: "player_walk_3" },
                { key: "player_walk_4" },
                { key: "player_walk_5" },
                { key: "player_walk_6" },
                { key: "player_walk_7" },
                { key: "player_walk_8" },
                { key: "player_walk_9" },
                { key: "player_walk_10" },
                { key: "player_walk_11" },
            ],
            frameRate: 22,
            repeat: -1,
        });

        this.anims.create({
            key: "player_walk_shoot_diag",
            frames: [
                { key: "walk_shoot_dia_1" },
                { key: "walk_shoot_dia_2" },
                { key: "walk_shoot_dia_3" },
                { key: "walk_shoot_dia_4" },
                { key: "walk_shoot_dia_5" },
                { key: "walk_shoot_dia_6" },
                { key: "walk_shoot_dia_7" },
                { key: "walk_shoot_dia_8" },
                { key: "walk_shoot_dia_9" },
                { key: "walk_shoot_dia_10" },
                { key: "walk_shoot_dia_11" },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "player_shoot",
            frames: [
                { key: "player_shoot_1" },
                { key: "player_shoot_2" },
                { key: "player_shoot_3" },
            ],
            frameRate: 13,
            repeat: -1,
        });

        this.anims.create({
            key: "player_walk_shoot_str",
            frames: [
                { key: "walk_shoot_str_1" },
                { key: "walk_shoot_str_2" },
                { key: "walk_shoot_str_3" },
                { key: "walk_shoot_str_4" },
                { key: "walk_shoot_str_5" },
                { key: "walk_shoot_str_6" },
                { key: "walk_shoot_str_7" },
                { key: "walk_shoot_str_8" },
                { key: "walk_shoot_str_9" },
                { key: "walk_shoot_str_10" },
                { key: "walk_shoot_str_11" },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "player_jump",
            frames: [
                { key: "player_jump_1" },
                { key: "player_jump_2" },
                { key: "player_jump_3" },
                { key: "player_jump_4" },
                { key: "player_jump_5" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "player_dash",
            frames: [
                { key: "player_dash_1" },
                { key: "player_dash_2" },
                { key: "player_dash_3" },
                { key: "player_dash_4" },
                { key: "player_dash_5" },
                { key: "player_dash_6" },
                { key: "player_dash_7" },
                { key: "player_dash_8" },
                { key: "player_dash_9" },
                { key: "player_dash_10" },
                { key: "player_dash_11" },
                { key: "player_dash_12" },
                { key: "player_dash_13" },
                { key: "player_dash_14" },
                { key: "player_dash_15" },
                { key: "player_dash_16" },
            ],
            frameRate: 60,
            repeat: 0,
        });

        this.scene.anims.create({
            key: "player_bullet",
            frames: [
                { key: "bullet_1" },
                { key: "bullet_2" },
                { key: "bullet_3" },
                { key: "bullet_4" },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.play("player_idle");
    }

    update(time, delta) {
        this.handleInput(time);
        this.handleGravity();
        if (this.body.onFloor()) {
            this.didDashUp = false;
            this.lastOnGroundTime = 0;
            if (this.isJumping) {
                this.isJumping = false;
                this.play("player_idle");
            }
        } else {
            this.lastOnGroundTime += delta;
        }

        if (this.isDashingUp) {
            this.body.velocity.y = -this.dashSpeed;
        }

        if (this.isDashing) {
            this.body.velocity.x = this.flipX ? -this.dashSpeed : this.dashSpeed;
        }

        if (this.dashAni) {
            this.anims.stop();
            this.play("player_dash");
            this.dashAni = false;
        }
        if (
            this.mouse.isDown &&
            !this.isDashing &&
            !this.isDashingUp &&
            !this.moving
        ) {
            this.fireBullet();
        } else if (this.mouse.isDown && !this.isDashing && !this.isDashingUp) {
            this.shootflg = true;
            this.fireBullet();
        }

        if (this.invulnerable) {
            this.invulnerabilityTimer -= delta;
            if (this.invulnerabilityTimer <= 0) {
                this.invulnerable = false;
            }
        }
    }

    handleDamage(enemy, bullet) {
        if (!enemy || !bullet) return;
        enemy.takeDamage(25);
        console.log("enemy took damage");
        bullet.destroy();
    }

    handleInput(time) {
        if (this.cursors.left.isDown && !this.isDashing) {
            this.setVelocityX(-this.playerVel);
            this.flipX = true;
            this.moving = true;
        } else if (this.cursors.right.isDown && !this.isDashing) {
            this.setVelocityX(this.playerVel);
            this.flipX = false;
            this.moving = true;
        } else {
            this.moving = false;
            this.setVelocityX(0);
        }
        if (!this.mouse.isDown && !this.moving) {
            this.shootflg = false;
        }
        if (!this.isJumping && !this.isDashing && !this.isDashingUp) {
            if (this.moving) {
                if (this.mouse.isDown) {
                    if (
                        this.shootflg &&
                        this.shootAngle > -0.25 &&
                        (!this.anims.isPlaying ||
                            (this.anims.isPlaying &&
                                this.anims.currentAnim.key !== "player_walk_shoot_str"))
                    ) {
                        this.play("player_walk_shoot_str", true);
                    } else if (
                        this.shootflg &&
                        this.shootAngle < -0.35 &&
                        this.shootAngle > -2.2 &&
                        (!this.anims.isPlaying ||
                            (this.anims.isPlaying &&
                                this.anims.currentAnim.key !== "player_walk_shoot_diag"))
                    ) {
                        this.play("player_walk_shoot_diag", true);
                    }
                } else {
                    if (
                        !this.anims.isPlaying ||
                        (this.anims.isPlaying &&
                            this.anims.currentAnim.key !== "player_move")
                    ) {
                        this.play("player_move", true);
                    }
                }
            } else {
                if (this.mouse.isDown) {
                    this.play("player_shoot", true);
                } else if (
                    !this.moving &&
                    this.anims.currentAnim.key !== "player_idle"
                ) {
                    this.play("player_idle", true);
                }
            }
        }

        if (
            this.cursors.jump.isDown &&
            !this.isJumping &&
            (this.body.onFloor() || this.lastOnGroundTime <= this.coyoteTime)
        ) {
            this.setVelocityY(-this.jumpVel);
            this.isJumping = true;
        } else if (this.cursors.jump.isUp && this.isJumping) {
            this.body.setVelocityY(0.8 * this.body.velocity.y);
        } else if (this.isJumping && Math.abs(this.body.velocity.y) < 0.1) {
            this.body.setGravityY(this.worldGrav / 5);
        }

        if (this.isJumping && !this.isDashing && !this.isDashingUp) {
            this.play("player_jump", true);
        }
        if (
            this.cursors.dash.isDown &&
            this.cursors.up.isDown &&
            !this.isDashingUp &&
            !this.isDashing &&
            time > this.lastDashTime + this.dashCooldown
        ) {
            this.isDashingUp = true;
            this.didDashUp = true;
            this.lastDashTime = time;
            this.dashAni = true;
            this.scene.time.delayedCall(
                this.dashDuration,
                () => {
                    this.setVelocityY(0);
                    this.isDashingUp = false;
                    this.play("player_idle", true);
                },
                [],
                this
            );
        } else if (
            this.cursors.dash.isDown &&
            !this.isDashing &&
            time > this.lastDashTime + this.dashCooldown
        ) {
            this.isDashing = true;
            this.lastDashTime = time;
            this.dashAni = true;
            this.scene.time.delayedCall(
                this.dashDuration,
                () => {
                    this.setVelocityX(0);
                    this.isDashing = false;
                    this.play("player_idle", true);
                },
                [],
                this
            );
        }

        this.updateHealth();
    }

    handleGravity() {
        if (!this.body.onFloor() && this.isJumping && this.cursors.down.isDown) {
            this.body.setGravityY(3 * this.worldGrav);
        } else if (!this.body.onFloor() && this.lastOnGroundTime > 500) {
            this.body.setGravityY(2 * this.worldGrav);
        } else {
            this.body.setGravityY(this.worldGrav);
        }
    }

    createHealthBar() {
        this.healthbarBg = this.scene.add.graphics();
        this.healthbarBg.fillStyle(0xffffff, 1);
        this.healthbarBg.fillRoundedRect(30, 30, 400, 40, {
            tl: 10,
            tr: 10,
            bl: 10,
            br: 10,
        });
        this.healthBar = this.scene.add.graphics();
        this.updateHealth();
    }

    updateHealth() {
        this.healthBar.clear();
        let color = 0x00ff00;
        if (this.health < 50 && this.health > 20) {
            color = 0xffff00;
        } else if (this.health <= 20) {
            color = 0xff0000;
        }
        this.healthBar.fillStyle(color, 1);
        if (this.health == 0) {
            this.healthBar.fillRect(35, 32, 0, 0);
        } else {
            this.healthBar.fillRoundedRect(35, 32, 3.9 * this.health, 35, {
                tl: 10,
                tr: 10,
                bl: 10,
                br: 10,
            });
        }
    }

    takeDamage(damage, causedByBoss = false) {
        if (!this.invulnerable) {
            this.health -= damage;
            if (causedByBoss) {
                this.health -= damage;
                this.invulnerable = true;
                this.invulnerabilityTimer = 800; 
                this.setTint(0xff0000);
                this.scene.time.delayedCall(800, () => {
                    this.invulnerable = false;
                    this.clearTint();
                }, [], this);
            }
        }
    }

    fireBullet() {
        if (this.scene.time.now > this.lastFired) {
            const bullet = this.bullets.create(
                this.flipX ? this.x - 20 : this.x + 10,
                this.y + 20,
                "bullet_1"
            );
            bullet.setScale(1.5, 1.5);
            bullet.play("player_bullet");
            this.shootAngle = Phaser.Math.Angle.Between(
                this.x,
                this.y,
                this.mouse.x,
                this.mouse.y
            );
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
}

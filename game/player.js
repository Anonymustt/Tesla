import Phaser from "phaser";
import { repeat, timestamp } from "rxjs";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, platforms) {
        super(scene, x, y, 'player.png');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5).setScale(1, 1);
        this.setSize(30,85).setOffset(30,10)
        this.body.collideWorldBounds = true;
        //this.setDrag(1000, 0);
        this.initializeAni();
        this.scene = scene;
        this.platforms = platforms;
        this.jumpVel = 800;
        this.playerVel = 150;
        this.dashSpeed = 1200;
        this.isJumping = false;
        this.isDashing = false;
        this.isDashingUp = false;
        this.lastDashTime = 0;
        this.dashCooldown = 1500;
        this.dashDuration = 250;
        this.lastOnGroundTime = 0;
        this.coyoteTime = 150;
        this.dashAni = false;
        this.didDashUp = false;
        this.worldGrav = 3000;
        this.fireRate = 200;
        this.lastFired = 0;
        this.bulletSpeed = 500;

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.createHealthBar();

        this.bullets = scene.physics.add.group();
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

    initializeAni(){
        this.anims.create({
            key:'player_idle',
            frames:[
                {key : 'player_idle_f1'},
                {key : 'player_idle_f2'},
                {key : 'player_idle_f3'},
                {key : 'player_idle_f4'}
            ],
            frameRate:4,
            repeat:-1
        });

        this.anims.create({
            key:'player_move',
            frames: [
                {key : 'player_walk_1'},
                {key : 'player_walk_2'},
                {key : 'player_walk_3'},
                {key : 'player_walk_4'},
                {key : 'player_walk_5'},
                {key : 'player_walk_6'},
                {key : 'player_walk_7'},
                {key : 'player_walk_8'},
                {key : 'player_walk_9'},
                {key : 'player_walk_10'},
                {key : 'player_walk_11'}
            ],
            frameRate:22,
            repeat:-1
        });

        this.anims.create({
            key:'player_jump',
            frames: [
                {key : 'player_jump_1'},
                {key : 'player_jump_2'},
                {key : 'player_jump_3'},
                {key : 'player_jump_4'},
                {key : 'player_jump_5'}
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key:'player_dash',
            frames: [
                {key : 'player_dash_1'},
                {key : 'player_dash_2'},
                {key : 'player_dash_3'},
                {key : 'player_dash_4'},
                {key : 'player_dash_5'},
                {key : 'player_dash_6'},
                {key : 'player_dash_7'},
                {key : 'player_dash_8'},
                {key : 'player_dash_9'},
                {key : 'player_dash_10'},
                {key : 'player_dash_11'},
                {key : 'player_dash_12'}
            ],
            frameRate: 60,
            repeat:0
        });

        this.play('player_idle')
    }

    update(time, delta) {
        this.updateHealth();
        this.handleInput(time);
        this.handleGravity();
        if (this.body.onFloor()) {
            this.didDashUp = false;
            this.lastOnGroundTime = 0;
            if (this.isJumping) {
                this.isJumping = false; 
                this.play('player_idle'); 
            }
        } else {
            this.lastOnGroundTime += delta;
        }

        if(this.isDashingUp){
            this.body.velocity.y = -this.dashSpeed;
        }

        if(this.isDashing){
            this.body.velocity.x = this.flipX ? -this.dashSpeed : this.dashSpeed;
        }

        if(this.dashAni){
            this.anims.stop();
            this.play('player_dash')
            this.dashAni = false;
        }

        if(this.mouse.isDown){
            this.fireBullet();
        }
    }

    handleInput(time) {
        let moving = false;

        if (this.cursors.left.isDown && !this.isDashing) {
            this.setVelocityX(-this.playerVel);
            this.flipX = true;
            moving = true;
        } else if (this.cursors.right.isDown && !this.isDashing) {
            this.setVelocityX(this.playerVel);
            this.flipX = false;
            moving = true;
        } else {
            this.setVelocityX(0);
        }
        if(!this.isJumping && !this.isDashing && !this.isDashingUp){
            if (moving) {
                if (!this.anims.isPlaying || (this.anims.isPlaying && this.anims.currentAnim.key !== 'player_move')) {
                    this.play('player_move', true);
                }
            } else if (!moving && this.anims.currentAnim.key !== 'player_idle') {
                this.play('player_idle', true);
            }
        }
    
        if (this.cursors.jump.isDown && !this.isJumping && (this.body.onFloor() || this.lastOnGroundTime <= this.coyoteTime)) {
            this.setVelocityY(-this.jumpVel);
            this.isJumping = true;
        } else if (this.cursors.jump.isUp && this.isJumping) {
            this.body.setVelocityY(0.8 * this.body.velocity.y);
        } else if (this.isJumping && Math.abs(this.body.velocity.y)<0.1){
            this.scene.physics.world.gravity.y = this.worldGrav/5;
        }

        if(this.isJumping && !this.isDashing && !this.isDashingUp){
            this.play('player_jump', true);
        }
        if((this.cursors.dash.isDown && this.cursors.up.isDown) && !this.isDashingUp && !this.isDashing && (time > this.lastDashTime + this.dashCooldown)){
            this.isDashingUp = true;
            this.didDashUp = true;
            this.lastDashTime = time;
            this.dashAni = true;
            this.scene.time.delayedCall(this.dashDuration, () => {
                this.setVelocityY(0);
                this.isDashingUp = false;
                this.play('player_idle', true);
            }, [], this);
        }else if (this.cursors.dash.isDown && !this.isDashing && (time > this.lastDashTime + this.dashCooldown)) {
            this.isDashing = true;
            this.lastDashTime = time;
            this.dashAni = true;
            this.scene.time.delayedCall(this.dashDuration, () => {
                this.setVelocityX(0);
                this.isDashing = false;
                this.play('player_idle', true);
            }, [], this);
        }
    }
    

    handleGravity() {
        if (!this.body.onFloor() && this.isJumping && this.cursors.down.isDown) {
            this.scene.physics.world.gravity.y = 3*this.worldGrav;
        }else if(!this.body.onFloor() && this.isJumping && this.didDashUp){
            this.scene.physics.world.gravity.y = 2*this.worldGrav;
        } else if (!this.body.onFloor() && this.lastOnGroundTime > 500 && !this.didDashUp) {
            this.scene.physics.world.gravity.y = 2*this.worldGrav;
        } else {
            this.scene.physics.world.gravity.y = this.worldGrav;
        }
    }

    createHealthBar(){
        this.healthbarBg = this.scene.add.graphics();
        this.healthbarBg.fillStyle(0xFFFFFF, 1);
        this.healthbarBg.fillRoundedRect(30,30,400,40,{ tl: 10, tr: 10, bl: 10, br: 10 });
        this.healthBar = this.scene.add.graphics();
    }

    updateHealth(){
        let color = 0x00ff00;
        if(this.health<50 && this.health>20){
            color = 0xffff00;
        }else if(this.health<=20){
            color = 0xff0000;
        }

        this.healthBar.fillStyle(color,1);
        this.healthBar.fillRoundedRect(35,32,390,35,{ tl: 10, tr: 10, bl: 10, br: 10 })
    }

    fireBullet() {
        if (this.scene.time.now > this.lastFired) {
          const bullet = this.bullets.create(this.flipX? this.x-20:this.x+20, this.y+20, 'bullet');
          const angle = Phaser.Math.Angle.Between(this.x, this.y, this.mouse.x, this.mouse.y);
          bullet.setVelocity(Math.cos(angle)*this.bulletSpeed, Math.sin(angle)*this.bulletSpeed);
          bullet.rotation = angle;
          bullet.body.allowGravity = false;
          this.scene.physics.add.collider(bullet, this.platforms, (bullet) => {
            bullet.destroy(); 
          });
          this.lastFired = this.scene.time.now + this.fireRate;
        }
      }
}

import Phaser from "phaser";
import { repeat } from "rxjs";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player.png');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5).setScale(1, 1);
        this.setSize(30,85).setOffset(30,10)
        this.body.collideWorldBounds = true;
        //this.setDrag(1000, 0);
        this.initializeAni();
        this.scene = scene;
        this.jumpVel = 500;
        this.playerVel = 150;
        this.dashSpeed = 8000;
        this.isJumping = false;
        this.isDashing = false;
        this.lastDashTime = 0;
        this.dashCooldown = 1200;
        this.dashDuration = 1200;
        this.lastOnGroundTime = 0;
        this.coyoteTime = 150;

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            dash: Phaser.Input.Keyboard.KeyCodes.SHIFT
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
                {key : 'player_jump_5'},
                {key : 'player_jump_6'}
            ],
            frameRate: 14,
            repeat: -1
        });

        this.play('player_idle')
    }

    update(time, delta) {
        this.handleInput(time);
        this.handleGravity();
        if (this.body.onFloor()) {
            this.lastOnGroundTime = 0;
            if (this.isJumping) {
                this.isJumping = false; 
                this.play('player_idle'); 
            }
        } else {
            this.lastOnGroundTime += delta;
        }
    }

    handleInput(time) {
        let moving = false;
        let jumping = false;

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.playerVel);
            this.flipX = true;
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.playerVel);
            this.flipX = false;
            moving = true;
        } else {
            this.setVelocityX(0);
        }
        if(!this.isJumping){
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
        }

        if(this.isJumping){
            this.play('player_jump', true);
        }
    
        if (this.cursors.dash.isDown && !this.isDashing && (time > this.lastDashTime + this.dashCooldown)) {
            this.isDashing = true;
            this.lastDashTime = time;
            this.body.velocity.x = this.flipX ? -this.dashSpeed : this.dashSpeed;
            this.scene.time.delayedCall(this.dashDuration, () => {
                this.setVelocityX(0);
                this.isDashing = false;
            }, [], this);
        }
    }
    

    handleGravity() {
        if (!this.body.onFloor() && this.isJumping && this.cursors.down.isDown) {
            this.scene.physics.world.gravity.y = 5000;
        } else if (!this.body.onFloor() && this.isJumping) {
            this.scene.physics.world.gravity.y = 3000;
        } else {
            this.scene.physics.world.gravity.y = 1000;
        }
    }
}

import Phaser from "phaser";
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player.png');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 0).setScale(5, 5);
        this.body.setOffset(1, 1);
        this.body.setSize(8, 16);
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
        this.play('player_idle')
    }

    update(time, delta) {
        this.handleInput(time);
        this.handleGravity();
        if (this.body.onFloor()) {
            this.lastOnGroundTime = 0;
            this.isJumping = false;
        } else {
            this.lastOnGroundTime += delta;
        }
    }

    handleInput(time) {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.playerVel);
            this.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.playerVel);
            this.flipX = false;
        } else {
            this.setVelocityX(0);
        }
        if (this.cursors.jump.isDown && !this.isJumping && (this.body.onFloor()||this.lastOnGroundTime<=this.coyoteTime)) {
            this.setVelocityY(-this.jumpVel);
            this.isJumping = true;
        } else if (this.cursors.jump.isUp && this.isJumping) {
            this.body.setVelocityY(0.8 * this.body.velocity.y);
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

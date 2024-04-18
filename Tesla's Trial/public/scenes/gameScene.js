class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
        this.player;
        this.sizes = {
            width: 1000,
            height: 562
        };
        this.playerVel = 150;
        this.playerMaxVerVel = 600;
        this.jumpVel = 275;
        this.isJumping = false;
        this.lastOnGroundTime = 0;
        this.coyoteTime = 100;
    }

    preload() {
        this.load.image("bg", "/assets/blueBG.jpeg");
        this.load.image("player", "./assets/player.png");
    }

    create() {
        this.add.image(0, 0, "bg").setScale(1,1).setOrigin(0, 0);
        const platforms = this.physics.add.staticGroup();
        platforms.create(this.sizes.width / 2, this.sizes.height - 50, null).setSize(this.sizes.width - 120, 10).setVisible(false);
        platforms.create(this.sizes.width / 2, 50, null).setSize(this.sizes.width - 120, 10).setVisible(false);
        platforms.create(68, this.sizes.height / 2, null).setSize(10, this.sizes.height - 100).setVisible(false);
        platforms.create(this.sizes.width - 68, this.sizes.height / 2, null).setSize(10, this.sizes.height - 100).setVisible(false);
        platforms.create(312, this.sizes.height - 84).setSize(114, 10).setVisible(false);
        platforms.create(590, 315).setSize(90, 10).setVisible(false);
        platforms.create(590, 345).setSize(90, 10).setVisible(false);
        this.player = this.physics.add.image(100, this.sizes.height - 100, "player").setScale(2,2).setOrigin(0, 0);
        this.player.body.collideWorldBounds = true;
        this.physics.add.collider(this.player, platforms);
        this.physics.world.gravity.y = 1000; 
        this.player.setDrag(1000, 0);
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update(time, delta) {
        if (this.player.body.onFloor()) {
            this.lastOnGroundTime = 0;
            this.isJumping = false;
        } else {
            this.lastOnGroundTime += delta;
        }

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-this.playerVel);
            this.player.flipX = true;
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(this.playerVel);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
        }

        // Jumping logic
        if (this.keys.jump.isDown && !this.isJumping && (this.player.body.onFloor() || this.lastOnGroundTime <= this.coyoteTime)) {
            this.player.setVelocityY(-this.jumpVel);
            this.isJumping = true;
        }

        // Optional: Enhanced gravity when falling (fast fall)
        if (!this.player.body.onFloor() && this.isJumping && this.keys.down.isDown) {
            this.physics.world.gravity.y = 1700; // Increased gravity
        } else {
            this.physics.world.gravity.y = 1000; // Normal gravity
        }
    }
}

export default GameScene;

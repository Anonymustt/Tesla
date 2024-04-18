import Player from "../../player";
import Phaser from "phaser";
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
        this.sizes = {
            width: 1920,
            height: 1080
        };
    }

    preload() {
        this.load.image("bg", "/assets/LevelProto1.png");
        this.load.image("player", "./assets/player.png");
        //player idle animation preload
        this.load.image("player_idle_f1", "/assets/player_idle_ani/idle anim1.png")
        this.load.image("player_idle_f2", "/assets/player_idle_ani/idle anim2.png")
        this.load.image("player_idle_f3", "/assets/player_idle_ani/idle anim3.png")
        this.load.image("player_idle_f4", "/assets/player_idle_ani/idle anim4.png")
    }

    create() {
        //Background and platforms
        this.add.image(0, 0, "bg").setScale(1,1).setOrigin(0, 0);
        const platforms = this.physics.add.staticGroup();
        platforms.create(this.sizes.width / 2, this.sizes.height - 50, null).setSize(this.sizes.width - 120, 10).setVisible(false);
        platforms.create(this.sizes.width / 2, 50, null).setSize(this.sizes.width - 120, 10).setVisible(false);
        platforms.create(68, this.sizes.height / 2, null).setSize(10, this.sizes.height - 100).setVisible(false);
        platforms.create(this.sizes.width - 68, this.sizes.height / 2, null).setSize(10, this.sizes.height - 100).setVisible(false);
        platforms.create(312, this.sizes.height - 84).setSize(114, 10).setVisible(false);
        platforms.create(590, 315).setSize(90, 10).setVisible(false);
        platforms.create(590, 345).setSize(90, 10).setVisible(false);
        this.player = new Player(this, 100, this.sizes.height-100);
        this.physics.add.collider(this.player, platforms);
        this.physics.world.gravity.y = 1000; 
        this.lastDashTime = this.time.now - this.dashCooldown;
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}

export default GameScene;

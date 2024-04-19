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
        //player walking animation preload 
        this.load.image("player_walk_1", "/assets/player_move_ani/walking anim1.png")
        this.load.image("player_walk_2", "/assets/player_move_ani/walking anim2.png")
        this.load.image("player_walk_3", "/assets/player_move_ani/walking anim3.png")
        this.load.image("player_walk_4", "/assets/player_move_ani/walking anim4.png")
        this.load.image("player_walk_5", "/assets/player_move_ani/walking anim5.png")
        this.load.image("player_walk_6", "/assets/player_move_ani/walking anim6.png")
        this.load.image("player_walk_7", "/assets/player_move_ani/walking anim7.png")
        this.load.image("player_walk_8", "/assets/player_move_ani/walking anim8.png")
        this.load.image("player_walk_9", "/assets/player_move_ani/walking anim9.png")
        this.load.image("player_walk_10", "/assets/player_move_ani/walking anim10.png")
        this.load.image("player_walk_11", "/assets/player_move_ani/walking anim11.png")
        //player jumping animation preload
        this.load.image("player_jump_1", "/assets/player_jump_ani/idle anim1.png")
        this.load.image("player_jump_2", "/assets/player_jump_ani/jump anim1.png")
        this.load.image("player_jump_3", "/assets/player_jump_ani/jump anim2.png")
        this.load.image("player_jump_4", "/assets/player_jump_ani/jump anim3.png")
        this.load.image("player_jump_5", "/assets/player_jump_ani/jump anim4.png")
        this.load.image("player_jump_6", "/assets/player_jump_ani/idle anim1.png")
    }

    create() {
        //Background and platforms
        this.add.image(0, 0, "bg").setScale(1,1).setOrigin(0, 0);
        const platforms = this.physics.add.staticGroup();
        platforms.create(this.sizes.width / 2, this.sizes.height - 100, null).setSize(this.sizes.width - 120, 15).setVisible(false);
        platforms.create(this.sizes.width / 2, 100, null).setSize(this.sizes.width - 120, 15).setVisible(false);
        platforms.create(130, this.sizes.height / 2, null).setSize(15, this.sizes.height - 100).setVisible(false);
        platforms.create(202, 695, null).setSize(15, 170).setVisible(false);
        platforms.create(this.sizes.width - 130, this.sizes.height / 2, null).setSize(15, this.sizes.height - 100).setVisible(false);
        platforms.create(600, this.sizes.height - 160).setSize(218, 15).setVisible(false);
        platforms.create(150, 770).setSize(100, 15).setVisible(false);
        platforms.create(150, 620).setSize(100, 15).setVisible(false);
        platforms.create(700, 950, null).setSize(15, 75).setVisible(false);
        platforms.create(500, 950, null).setSize(15, 75).setVisible(false);
        platforms.create(1210, 635, null).setSize(15, 75).setVisible(false);
        platforms.create(1058, 635, null).setSize(15, 75).setVisible(false);
        platforms.create(1135, 605).setSize(168, 15).setVisible(false);
        platforms.create(1135, 665).setSize(168, 15).setVisible(false);
        platforms.create(1478, 665).setSize(126, 15).setVisible(false);
        platforms.create(1795, 508).setSize(168, 15).setVisible(false);
        platforms.create(1795, 385).setSize(168, 15).setVisible(false);
        platforms.create(1715, 448, null).setSize(15, 130).setVisible(false);
        platforms.create(this.sizes.width-385, 820, null).setSize(15, 320).setVisible(false);
        platforms.create(this.sizes.width-498, 820, null).setSize(15, 320).setVisible(false);
        this.player = new Player(this, 200, this.sizes.height-200);
        this.physics.add.collider(this.player, platforms);
        this.physics.world.gravity.y = 1000; 
        this.lastDashTime = this.time.now - this.dashCooldown;
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}

export default GameScene;

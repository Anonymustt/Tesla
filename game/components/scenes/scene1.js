import Phaser from 'phaser';
import Player1 from '../player/player1.js';
import ElectronCloud from '../enemy/enemy1.js';

export default class Scene1 extends Phaser.Scene {
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
    //player dash animation preload
    this.load.image("player_dash_1", "/assets/player_dash_ani/dash anim1.png")
    this.load.image("player_dash_2", "/assets/player_dash_ani/dash anim2.png")
    this.load.image("player_dash_3", "/assets/player_dash_ani/dash anim3.png")
    this.load.image("player_dash_4", "/assets/player_dash_ani/dash anim4.png")
    this.load.image("player_dash_5", "/assets/player_dash_ani/dash anim5.png")
    this.load.image("player_dash_6", "/assets/player_dash_ani/dash anim6.png")
    this.load.image("player_dash_7", "/assets/player_dash_ani/dash anim7.png")
    this.load.image("player_dash_8", "/assets/player_dash_ani/dash anim8.png")
    this.load.image("player_dash_9", "/assets/player_dash_ani/dash anim9.png")
    this.load.image("player_dash_10", "/assets/player_dash_ani/dash anim10.png")
    this.load.image("player_dash_11", "/assets/player_dash_ani/dash anim11.png")
    this.load.image("player_dash_12", "/assets/player_dash_ani/dash anim12.png")
    //player bullets animation preload
    this.load.image("bullet_1", "/assets/player_bullet_ani/Energy ball1.png")
    this.load.image("bullet_2", "/assets/player_bullet_ani/Energy ball2.png")
    this.load.image("bullet_3", "/assets/player_bullet_ani/Energy ball3.png")
    this.load.image("bullet_4", "/assets/player_bullet_ani/Energy ball4.png")
    //player shooting animation preload
    this.load.image("player_shoot_1", "assets/player_shooting_ani/Attack frames1.png")
    this.load.image("player_shoot_2", "assets/player_shooting_ani/Attack frames2.png")
    this.load.image("player_shoot_3", "assets/player_shooting_ani/Attack frames3.png")
  }

  create() {
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

        this.player = new Player1(this, 200, this.sizes.height-200, platforms);
        this.physics.add.collider(this.player, platforms);
        this.physics.world.gravity.y = 1000; 
        this.lastDashTime = this.time.now - this.dashCooldown;

        const electronCloud = new ElectronCloud(this, 1300, 500, this.player, platforms);
        this.physics.add.collider(this.player, electronCloud);
        this.physics.add.collider(electronCloud, platforms);
        this.player.update(this.time, 0);
}

  update(time, delta) {
    this.player.update(time, delta);
}
}

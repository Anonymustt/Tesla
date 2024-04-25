import Player from "../../player";
import Phaser from "phaser";
import Enemy1 from "../../Enemy/Enemy";
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
        this.load.image("player", "/assets/player.png");
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
        this.load.image("player_dash_13", "/assets/player_dash_ani/dash anim13.png")
        this.load.image("player_dash_14", "/assets/player_dash_ani/dash anim14.png")
        this.load.image("player_dash_15", "/assets/player_dash_ani/dash anim15.png")
        this.load.image("player_dash_16", "/assets/player_dash_ani/dash anim16.png")
        //player bullets animation preload
        this.load.image("bullet_1", "/assets/player_bullet_ani/Energy ball1.png")
        this.load.image("bullet_2", "/assets/player_bullet_ani/Energy ball2.png")
        this.load.image("bullet_3", "/assets/player_bullet_ani/Energy ball3.png")
        this.load.image("bullet_4", "/assets/player_bullet_ani/Energy ball4.png")
        //player shooting animation preload
        this.load.image("player_shoot_1", "/assets/player_shooting_ani/Attack frames1.png")
        this.load.image("player_shoot_2", "/assets/player_shooting_ani/Attack frames2.png")
        this.load.image("player_shoot_3", "/assets/player_shooting_ani/Attack frames3.png")
        //player shooting straight walking animation preload 
        this.load.image("walk_shoot_str_1", "/assets/player_walk_shoot_ani/walking shooting straight anim1.png")
        this.load.image("walk_shoot_str_2", "/assets/player_walk_shoot_ani/walking shooting straight anim2.png")
        this.load.image("walk_shoot_str_3", "/assets/player_walk_shoot_ani/walking shooting straight anim3.png")
        this.load.image("walk_shoot_str_4", "/assets/player_walk_shoot_ani/walking shooting straight anim4.png")
        this.load.image("walk_shoot_str_5", "/assets/player_walk_shoot_ani/walking shooting straight anim5.png")
        this.load.image("walk_shoot_str_6", "/assets/player_walk_shoot_ani/walking shooting straight anim6.png")
        this.load.image("walk_shoot_str_7", "/assets/player_walk_shoot_ani/walking shooting straight anim7.png")
        this.load.image("walk_shoot_str_8", "/assets/player_walk_shoot_ani/walking shooting straight anim8.png")
        this.load.image("walk_shoot_str_9", "/assets/player_walk_shoot_ani/walking shooting straight anim9.png")
        this.load.image("walk_shoot_str_10", "/assets/player_walk_shoot_ani/walking shooting straight anim10.png")
        this.load.image("walk_shoot_str_11", "/assets/player_walk_shoot_ani/walking shooting straight anim11.png")
        //player shooting diagonal walking animation preload
        this.load.image("walk_shoot_dia_1", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim1.png")
        this.load.image("walk_shoot_dia_2", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim2.png")
        this.load.image("walk_shoot_dia_3", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim3.png")
        this.load.image("walk_shoot_dia_4", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim4.png")
        this.load.image("walk_shoot_dia_5", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim5.png")
        this.load.image("walk_shoot_dia_6", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim6.png")
        this.load.image("walk_shoot_dia_7", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim7.png")
        this.load.image("walk_shoot_dia_8", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim8.png")
        this.load.image("walk_shoot_dia_9", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim9.png")
        this.load.image("walk_shoot_dia_10", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim10.png")
        this.load.image("walk_shoot_dia_11", "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim11.png")
        //enemy 1 idle animation preload
        this.load.image("enemy1_idle_1", "/assets/enemy1_idle_ani/Enemy 1 idle1.png");
        this.load.image("enemy1_idle_2", "/assets/enemy1_idle_ani/Enemy 1 idle2.png");
        this.load.image("enemy1_idle_3", "/assets/enemy1_idle_ani/Enemy 1 idle3.png");
        this.load.image("enemy1_idle_4", "/assets/enemy1_idle_ani/Enemy 1 idle4.png");
        this.load.image("enemy1_idle_5", "/assets/enemy1_idle_ani/Enemy 1 idle5.png");
        this.load.image("enemy1_idle_6", "/assets/enemy1_idle_ani/Enemy 1 idle6.png");
        this.load.image("enemy1_idle_7", "/assets/enemy1_idle_ani/Enemy 1 idle7.png");
        this.load.image("enemy1_idle_8", "/assets/enemy1_idle_ani/Enemy 1 idle8.png");
        this.load.image("enemy1_idle_9", "/assets/enemy1_idle_ani/Enemy 1 idle9.png");
        //enemy 1 shooting animation preload
        this.load.image("enemy1_shoot_1", "/assets/enemy1_shooting_ani/Enemy 1.png");
        this.load.image("enemy1_shoot_2", "/assets/enemy1_shooting_ani/Enemy 2.png");
        this.load.image("enemy1_shoot_3", "/assets/enemy1_shooting_ani/Enemy 3.png");
        this.load.image("enemy1_shoot_4", "/assets/enemy1_shooting_ani/Enemy 4.png");
        this.load.image("enemy1_shoot_5", "/assets/enemy1_shooting_ani/Enemy 5.png");
        this.load.image("enemy1_shoot_6", "/assets/enemy1_shooting_ani/Enemy 6.png");
        this.load.image("enemy1_shoot_7", "/assets/enemy1_shooting_ani/Enemy 7.png");
        this.load.image("enemy1_shoot_8", "/assets/enemy1_shooting_ani/Enemy 8.png");
        this.load.image("enemy1_shoot_9", "/assets/enemy1_shooting_ani/Enemy 9.png");
        this.load.image("enemy1_shoot_10", "/assets/enemy1_shooting_ani/Enemy 10.png");
    }

    create() {
        //Background and platforms
        this.add.image(0, 0, "bg").setScale(1,1).setOrigin(0, 0);
        const platforms = this.physics.add.staticGroup();
        const ground = this.physics.add.staticGroup();
        ground.create(this.sizes.width / 2, this.sizes.height - 100, null).setSize(this.sizes.width - 120, 15).setVisible(false);
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
        this.enemy1 = new Enemy1(this, this.sizes.width/2, this.sizes.height - 200, platforms, this.player);
        this.player = new Player(this, 200, this.sizes.height-200, platforms, this.enemy1);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, ground);
        this.physics.world.gravity.y = 1000; 
        this.lastDashTime = this.time.now - this.dashCooldown;
        this.physics.add.collider(this.enemy1, ground);
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.enemy1.update(time, delta);
    }
}

export default GameScene;

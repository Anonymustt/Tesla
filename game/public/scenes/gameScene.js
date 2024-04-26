import Player from "../../player";
import Phaser from "phaser";
import Enemy1 from "../../Enemy/Enemy";
import EnemyHover from "../../Enemy/EnemyHover";

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game_Scene");
    this.sizes = {
      width: 1920,
      height: 1080,
    };
    this.enemyKills = 0;
  }

  preload() {

    this.load.audio("backgroundMusic", "bg_audio.mp3")

    this.load.image("bg", "/assets/LevelProto1.png");
    this.load.image("player", "/assets/player.png");
    //player idle animation preload
    this.load.image("player_idle_f1", "/assets/player_idle_ani/idle anim1.png");
    this.load.image("player_idle_f2", "/assets/player_idle_ani/idle anim2.png");
    this.load.image("player_idle_f3", "/assets/player_idle_ani/idle anim3.png");
    this.load.image("player_idle_f4", "/assets/player_idle_ani/idle anim4.png");
    //player walking animation preload
    this.load.image(
      "player_walk_1",
      "/assets/player_move_ani/walking anim1.png"
    );
    this.load.image(
      "player_walk_2",
      "/assets/player_move_ani/walking anim2.png"
    );
    this.load.image(
      "player_walk_3",
      "/assets/player_move_ani/walking anim3.png"
    );
    this.load.image(
      "player_walk_4",
      "/assets/player_move_ani/walking anim4.png"
    );
    this.load.image(
      "player_walk_5",
      "/assets/player_move_ani/walking anim5.png"
    );
    this.load.image(
      "player_walk_6",
      "/assets/player_move_ani/walking anim6.png"
    );
    this.load.image(
      "player_walk_7",
      "/assets/player_move_ani/walking anim7.png"
    );
    this.load.image(
      "player_walk_8",
      "/assets/player_move_ani/walking anim8.png"
    );
    this.load.image(
      "player_walk_9",
      "/assets/player_move_ani/walking anim9.png"
    );
    this.load.image(
      "player_walk_10",
      "/assets/player_move_ani/walking anim10.png"
    );
    this.load.image(
      "player_walk_11",
      "/assets/player_move_ani/walking anim11.png"
    );
    //player jumping animation preload
    this.load.image("player_jump_1", "/assets/player_jump_ani/idle anim1.png");
    this.load.image("player_jump_2", "/assets/player_jump_ani/jump anim1.png");
    this.load.image("player_jump_3", "/assets/player_jump_ani/jump anim2.png");
    this.load.image("player_jump_4", "/assets/player_jump_ani/jump anim3.png");
    this.load.image("player_jump_5", "/assets/player_jump_ani/jump anim4.png");
    //player dash animation preload
    this.load.image("player_dash_1", "/assets/player_dash_ani/dash anim1.png");
    this.load.image("player_dash_2", "/assets/player_dash_ani/dash anim2.png");
    this.load.image("player_dash_3", "/assets/player_dash_ani/dash anim3.png");
    this.load.image("player_dash_4", "/assets/player_dash_ani/dash anim4.png");
    this.load.image("player_dash_5", "/assets/player_dash_ani/dash anim5.png");
    this.load.image("player_dash_6", "/assets/player_dash_ani/dash anim6.png");
    this.load.image("player_dash_7", "/assets/player_dash_ani/dash anim7.png");
    this.load.image("player_dash_8", "/assets/player_dash_ani/dash anim8.png");
    this.load.image("player_dash_9", "/assets/player_dash_ani/dash anim9.png");
    this.load.image(
      "player_dash_10",
      "/assets/player_dash_ani/dash anim10.png"
    );
    this.load.image(
      "player_dash_11",
      "/assets/player_dash_ani/dash anim11.png"
    );
    this.load.image(
      "player_dash_12",
      "/assets/player_dash_ani/dash anim12.png"
    );
    this.load.image(
      "player_dash_13",
      "/assets/player_dash_ani/dash anim13.png"
    );
    this.load.image(
      "player_dash_14",
      "/assets/player_dash_ani/dash anim14.png"
    );
    this.load.image(
      "player_dash_15",
      "/assets/player_dash_ani/dash anim15.png"
    );
    this.load.image(
      "player_dash_16",
      "/assets/player_dash_ani/dash anim16.png"
    );
    //player bullets animation preload
    this.load.image("bullet_1", "/assets/player_bullet_ani/Energy ball1.png");
    this.load.image("bullet_2", "/assets/player_bullet_ani/Energy ball2.png");
    this.load.image("bullet_3", "/assets/player_bullet_ani/Energy ball3.png");
    this.load.image("bullet_4", "/assets/player_bullet_ani/Energy ball4.png");
    //player shooting animation preload
    this.load.image(
      "player_shoot_1",
      "/assets/player_shooting_ani/Attack frames1.png"
    );
    this.load.image(
      "player_shoot_2",
      "/assets/player_shooting_ani/Attack frames2.png"
    );
    this.load.image(
      "player_shoot_3",
      "/assets/player_shooting_ani/Attack frames3.png"
    );
    //player shooting straight walking animation preload
    this.load.image(
      "walk_shoot_str_1",
      "/assets/player_walk_shoot_ani/walking shooting straight anim1.png"
    );
    this.load.image(
      "walk_shoot_str_2",
      "/assets/player_walk_shoot_ani/walking shooting straight anim2.png"
    );
    this.load.image(
      "walk_shoot_str_3",
      "/assets/player_walk_shoot_ani/walking shooting straight anim3.png"
    );
    this.load.image(
      "walk_shoot_str_4",
      "/assets/player_walk_shoot_ani/walking shooting straight anim4.png"
    );
    this.load.image(
      "walk_shoot_str_5",
      "/assets/player_walk_shoot_ani/walking shooting straight anim5.png"
    );
    this.load.image(
      "walk_shoot_str_6",
      "/assets/player_walk_shoot_ani/walking shooting straight anim6.png"
    );
    this.load.image(
      "walk_shoot_str_7",
      "/assets/player_walk_shoot_ani/walking shooting straight anim7.png"
    );
    this.load.image(
      "walk_shoot_str_8",
      "/assets/player_walk_shoot_ani/walking shooting straight anim8.png"
    );
    this.load.image(
      "walk_shoot_str_9",
      "/assets/player_walk_shoot_ani/walking shooting straight anim9.png"
    );
    this.load.image(
      "walk_shoot_str_10",
      "/assets/player_walk_shoot_ani/walking shooting straight anim10.png"
    );
    this.load.image(
      "walk_shoot_str_11",
      "/assets/player_walk_shoot_ani/walking shooting straight anim11.png"
    );
    //player shooting diagonal walking animation preload
    this.load.image(
      "walk_shoot_dia_1",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim1.png"
    );
    this.load.image(
      "walk_shoot_dia_2",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim2.png"
    );
    this.load.image(
      "walk_shoot_dia_3",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim3.png"
    );
    this.load.image(
      "walk_shoot_dia_4",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim4.png"
    );
    this.load.image(
      "walk_shoot_dia_5",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim5.png"
    );
    this.load.image(
      "walk_shoot_dia_6",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim6.png"
    );
    this.load.image(
      "walk_shoot_dia_7",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim7.png"
    );
    this.load.image(
      "walk_shoot_dia_8",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim8.png"
    );
    this.load.image(
      "walk_shoot_dia_9",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim9.png"
    );
    this.load.image(
      "walk_shoot_dia_10",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim10.png"
    );
    this.load.image(
      "walk_shoot_dia_11",
      "/assets/player_walk_shoot_dia_ani/walking shooting diagonal  anim11.png"
    );
    //enemy 1 idle animation preload
    this.load.image(
      "enemy1_idle_1",
      "/assets/enemy1_idle_ani/Enemy 1 idle1.png"
    );
    this.load.image(
      "enemy1_idle_2",
      "/assets/enemy1_idle_ani/Enemy 1 idle2.png"
    );
    this.load.image(
      "enemy1_idle_3",
      "/assets/enemy1_idle_ani/Enemy 1 idle3.png"
    );
    this.load.image(
      "enemy1_idle_4",
      "/assets/enemy1_idle_ani/Enemy 1 idle4.png"
    );
    this.load.image(
      "enemy1_idle_5",
      "/assets/enemy1_idle_ani/Enemy 1 idle5.png"
    );
    this.load.image(
      "enemy1_idle_6",
      "/assets/enemy1_idle_ani/Enemy 1 idle6.png"
    );
    this.load.image(
      "enemy1_idle_7",
      "/assets/enemy1_idle_ani/Enemy 1 idle7.png"
    );
    this.load.image(
      "enemy1_idle_8",
      "/assets/enemy1_idle_ani/Enemy 1 idle8.png"
    );
    this.load.image(
      "enemy1_idle_9",
      "/assets/enemy1_idle_ani/Enemy 1 idle9.png"
    );
    //enemy 1 shooting animation preload
    this.load.image(
      "enemy1_shoot_1",
      "/assets/enemy1_shooting_ani/Enemy 1.png"
    );
    this.load.image(
      "enemy1_shoot_2",
      "/assets/enemy1_shooting_ani/Enemy 2.png"
    );
    this.load.image(
      "enemy1_shoot_3",
      "/assets/enemy1_shooting_ani/Enemy 3.png"
    );
    this.load.image(
      "enemy1_shoot_4",
      "/assets/enemy1_shooting_ani/Enemy 4.png"
    );
    this.load.image(
      "enemy1_shoot_5",
      "/assets/enemy1_shooting_ani/Enemy 5.png"
    );
    this.load.image(
      "enemy1_shoot_6",
      "/assets/enemy1_shooting_ani/Enemy 6.png"
    );
    this.load.image(
      "enemy1_shoot_7",
      "/assets/enemy1_shooting_ani/Enemy 7.png"
    );
    this.load.image(
      "enemy1_shoot_8",
      "/assets/enemy1_shooting_ani/Enemy 8.png"
    );
    this.load.image(
      "enemy1_shoot_9",
      "/assets/enemy1_shooting_ani/Enemy 9.png"
    );
    this.load.image(
      "enemy1_shoot_10",
      "/assets/enemy1_shooting_ani/Enemy 10.png"
    );
    //Hover Enemy idle animation preload
    this.load.image("enemyHover_idle_1", "/assets/enemyHover_idle_ani/Enemy 2 (1).png");
    this.load.image("enemyHover_idle_2", "/assets/enemyHover_idle_ani/Enemy 3 (1).png");
    this.load.image("enemyHover_idle_3", "/assets/enemyHover_idle_ani/Enemy 4 (1).png");
    this.load.image("enemyHover_idle_4", "/assets/enemyHover_idle_ani/Enemy 5 (1).png");
    this.load.image("enemyHover_idle_5", "/assets/enemyHover_idle_ani/Enemy 6 (1).png");
    this.load.image("enemyHover_idle_6", "/assets/enemyHover_idle_ani/Enemy 7 (1).png");
    //Hover Enemy attack animation preload
    this.load.image("enemyHover_attack_1", "/assets/enemyHover_attack_ani/Enemy attack 2.png");
    this.load.image("enemyHover_attack_2", "/assets/enemyHover_attack_ani/Enemy attack 3.png");
    this.load.image("enemyHover_attack_3", "/assets/enemyHover_attack_ani/Enemy attack 4.png");
    this.load.image("enemyHover_attack_4", "/assets/enemyHover_attack_ani/Enemy attack 5.png");
    this.load.image("enemyHover_attack_5", "/assets/enemyHover_attack_ani/Enemy attack 6.png");
    this.load.image("enemyHover_attack_6", "/assets/enemyHover_attack_ani/Enemy attack 7.png");

  }

  create() {

    const backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
    backgroundMusic.play();

    //Background and platforms
    this.add.image(0, 0, "bg").setScale(1, 1).setOrigin(0, 0);
    const platforms = this.physics.add.staticGroup();
    const ground = this.physics.add.staticGroup();
    ground
      .create(this.sizes.width / 2, this.sizes.height - 100, null)
      .setSize(this.sizes.width - 120, 15)
      .setVisible(false);
      const platform1 = platforms.create(this.sizes.width / 2, 100, null).setVisible(false);
      platform1.body.setSize(this.sizes.width - 120, 15);
     const platform2 = platforms.create(130, this.sizes.height / 2, null).setVisible(false);
     platform2.body.setSize(15, this.sizes.height - 100);
    const platform3 = platforms.create(1789, this.sizes.height / 2, null).setVisible(false);
    platform3.setSize(15, this.sizes.height - 100);

    const platform4 = platforms
      .create(600, this.sizes.height - 130)
      .setVisible(false);
    platform4.setSize(214, 80);
    const platform5 = platforms
      .create(1133, this.sizes.height / 2 + 94)
      .setVisible(false);
    platform5.setSize(170, 73);
    const platform6 = platforms
      .create(165, this.sizes.height / 2 + 154)
      .setVisible(false);
    platform6.setSize(88, 170);
    const platform7 = platforms
      .create(1750, this.sizes.height / 2 - 92)
      .setVisible(false);
    platform7.setSize(88, 140);
    const platform8 = platforms
      .create(this.sizes.width - 440, 820, null)
      .setVisible(false);
    platform8.setSize(125, 320);
      this.enemyHover1 = new EnemyHover(
        this,
        this.sizes.width/2,
        this.sizes.height/2,
        platforms,
        'left',
        350,
        ground,
        2
      );
      this.enemyHover2 = new EnemyHover(
        this,
        400,
        400,
        platforms,
        'right',
        150,
        ground,
        3
      );
      this.enemyHover3 = new EnemyHover(
        this,
        600,
        600,
        platforms,
        'right',
        400,
        ground,
        5
      );
    this.enemy1 = new Enemy1(
      this,
      this.sizes.width / 2 - 20,
      this.sizes.height - 200,
      platforms
    );
    this.enemy2 = new Enemy1(
        this,
        this.sizes.width / 2 + 40,
        this.sizes.height - 200,
        platforms
    );
    this.enemy3 = new Enemy1(
        this,
        this.sizes.width / 2,
        this.sizes.height - 200,
        platforms
    );
    this.player = new Player(
      this,
      200,
      this.sizes.height - 200,
      platforms,
      [this.enemy1, this.enemy2, this.enemyHover1]
    );
    this.enemy1.player = this.player;
    this.enemy1.direction = 'left';
    this.enemy2.player = this.player;
    this.enemy2.direction = 'right';
    this.enemy3.player = this.player;
    this.enemy3.direction = 'right';
    this.enemyHover1.player = this.player;
    this.enemyHover2.player = this.player;
    this.enemyHover3.player = this.player;
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, ground);
    this.physics.world.gravity.y = 3000;
    this.lastDashTime = this.time.now - this.dashCooldown;
    this.physics.add.collider(this.enemy1, ground);
    this.physics.add.collider(this.enemy2, ground);
    this.physics.add.collider(this.enemy3, ground);
    this.physics.add.collider(this.enemyHover1, ground);
    this.physics.add.collider(this.enemyHover1, platforms);
    this.physics.add.collider(this.enemyHover2, ground);
    this.physics.add.collider(this.enemyHover2, platforms);
    this.physics.add.collider(this.enemyHover3, ground);
    this.physics.add.collider(this.enemyHover3, platforms);
        
    this.physics.add.overlap(
      this.enemy1,
      this.player.bullets,
      this.player.handleDamage,
      null,
      this.player
    );
    this.physics.add.overlap(
        this.enemy3,
        this.player.bullets,
        this.player.handleDamage,
        null,
        this.player
      );
    this.physics.add.overlap(
        this.enemy2,
        this.player.bullets,
        this.player.handleDamage,
        null,
        this.player
      );
    this.physics.add.overlap(
      this.player,
      this.enemy1.bullets,
      this.enemy1.handleDamage,
      null,
      this.enemy1
    );
    this.physics.add.overlap(
        this.player,
        this.enemy3.bullets,
        this.enemy3.handleDamage,
        null,
        this.enemy3
      );
    this.physics.add.overlap(
        this.player,
        this.enemy2.bullets,
        this.enemy2.handleDamage,
        null,
        this.enemy2
    );
    this.physics.add.overlap(
        this.enemyHover1,
        this.player.bullets,
        this.player.handleDamage,
        null,
        this.player
      );
    this.physics.add.overlap(
      this.player,
      this.enemyHover1.bullets,
      this.enemyHover1.handleDamage,
      null,
      this.enemyHover1
    );
    this.physics.add.overlap(
        this.enemyHover2,
        this.player.bullets,
        this.player.handleDamage,
        null,
        this.player
      );
    this.physics.add.overlap(
      this.player,
      this.enemyHover2.bullets,
      this.enemyHover2.handleDamage,
      null,
      this.enemyHover2
    );
    this.physics.add.overlap(
        this.enemyHover3,
        this.player.bullets,
        this.player.handleDamage,
        null,
        this.player
      );
    this.physics.add.overlap(
      this.player,
      this.enemyHover3.bullets,
      this.enemyHover3.handleDamage,
      null,
      this.enemyHover3
    );
    this.physics.world.gravity.y = 3000;
    this.createGameOverGraphic();
    this.events.on('enemyKilled', this.handleEnemyKilled, this);
  }

  createGameOverGraphic() {
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);  
    graphics.fillRect(0, 0, this.sizes.width, this.sizes.height);
    let gameOverText = this.add.text(this.sizes.width / 2, this.sizes.height / 2, 'Game Over', {
      fontFamily: 'main',
      fontSize: '38px',
      fill: '#fff'
    });
    gameOverText.setOrigin(0.5, 0.5); 

    let restartButton = this.add.text(this.sizes.width / 2, this.sizes.height / 2 + 100, 'Restart Game', {
      fontFamily: 'main',
      fontSize: '38px',
      fill: '#fff'
    }).setOrigin(0.5, 0.5).setInteractive();

    restartButton.on('pointerdown', () => {
        this.scene.restart();
    });

    graphics.setVisible(false);
    gameOverText.setVisible(false);
    restartButton.setVisible(false);
    this.gameOverGraphic = graphics;
    this.gameOverText = gameOverText;
    this.restartButton = restartButton;
}

  update(time, delta) {
    this.player.update(time, delta);
    this.enemy1.update(time, delta);
    this.enemy2.update(time, delta);
    this.enemy3.update(time, delta);
    this.enemyHover1.update(time, delta);
    this.enemyHover2.update(time, delta);
    this.enemyHover3.update(time, delta);
    if (this.player.health <= 0 && !this.gameOverGraphic.visible) {
        this.gameOver();
    }
  }

  gameOver() {
    this.gameOverGraphic.setVisible(true);
    this.gameOverText.setVisible(true);
    this.restartButton.setVisible(true);
    this.physics.pause(); 
    this.player.setVelocity(0, 0); 
    this.player.anims.stop();
    this.enemyKills = 0;
}

  handleEnemyKilled() {
    this.enemyKills++;
    if (this.enemyKills >= 13) {
      this.scene.start('Final_Scene'); 
    }
  }
}

export default GameScene;

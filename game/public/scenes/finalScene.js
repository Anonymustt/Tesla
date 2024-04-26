import Player from "../../player";
import Phaser from "phaser";
import Boss from "../../Enemy/Boss";
class finalScene extends Phaser.Scene {
    constructor() {
        super("Final_Scene");
        this.sizes = {
            width: 1920,
            height: 1080,
        };
    }

    preload() {

        this.load.audio("backgroundMusic", "bg_audio.mp3")


        this.load.image("bg1", "/assets/F3.png");
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
        //boss idle animation preload
        this.load.image("boss_idle_1", "/assets/boss_idle_ani/Boss idle1.png");
        this.load.image("boss_idle_2", "/assets/boss_idle_ani/Boss idle2.png");
        this.load.image("boss_idle_3", "/assets/boss_idle_ani/Boss idle3.png");
        this.load.image("boss_idle_4", "/assets/boss_idle_ani/Boss idle2.png");
        this.load.image("boss_idle_5", "/assets/boss_idle_ani/Boss idle1.png");
        //boss walking animtion preload
        this.load.image("boss_walk_1", "/assets/boss_walk_ani/Boss Walking1.png");
        this.load.image("boss_walk_2", "/assets/boss_walk_ani/Boss Walking2.png");
        this.load.image("boss_walk_3", "/assets/boss_walk_ani/Boss Walking3.png");
        this.load.image("boss_walk_4", "/assets/boss_walk_ani/Boss Walking4.png");
        this.load.image("boss_walk_5", "/assets/boss_walk_ani/Boss Walking5.png");
        this.load.image("boss_walk_6", "/assets/boss_walk_ani/Boss Walking6.png");
        this.load.image("boss_walk_7", "/assets/boss_walk_ani/Boss Walking7.png");
        //boss dash animation preload
        this.load.image("boss_dash_1", "/assets/boss_dash_ani/Boss dash1.png");
        this.load.image("boss_dash_2", "/assets/boss_dash_ani/Boss dash2.png");
        this.load.image("boss_dash_3", "/assets/boss_dash_ani/Boss dash3.png");
        this.load.image("boss_dash_4", "/assets/boss_dash_ani/Boss dash4.png");
        this.load.image("boss_dash_5", "/assets/boss_dash_ani/Boss dash5.png");
        this.load.image("boss_dash_6", "/assets/boss_dash_ani/Boss dash6.png");
        this.load.image("boss_dash_7", "/assets/boss_dash_ani/Boss dash7.png");
        this.load.image("boss_dash_8", "/assets/boss_dash_ani/Boss dash8.png");
        this.load.image("boss_dash_9", "/assets/boss_dash_ani/Boss dash9.png");
        this.load.image("boss_dash_10", "/assets/boss_dash_ani/Boss dash10.png");
        this.load.image("boss_dash_11", "/assets/boss_dash_ani/Boss dash11.png");
        this.load.image("boss_dash_12", "/assets/boss_dash_ani/Boss dash12.png");
        this.load.image("boss_dash_13", "/assets/boss_dash_ani/Boss dash13.png");
        this.load.image("boss_dash_14", "/assets/boss_dash_ani/Boss dash14.png");
        this.load.image("boss_dash_15", "/assets/boss_dash_ani/Boss dash15.png");
        this.load.image("boss_dash_16", "/assets/boss_dash_ani/Boss dash16.png");
        this.load.image("boss_dash_17", "/assets/boss_dash_ani/Boss dash17.png");
        this.load.image("boss_dash_18", "/assets/boss_dash_ani/Boss dash18.png");
        //Enemy Bullet animation preload
        this.load.image("enemy_bullet_1", "/assets/enemy_bullet_ani/Fireball enemy1.png");
        this.load.image("enemy_bullet_2", "/assets/enemy_bullet_ani/Fireball enemy2.png");
        this.load.image("enemy_bullet_3", "/assets/enemy_bullet_ani/Fireball enemy3.png");
        this.load.image("enemy_bullet_4", "/assets/enemy_bullet_ani/Fireball enemy4.png");
        this.load.image("enemy_bullet_5", "/assets/enemy_bullet_ani/Fireball enemy5.png");
        this.load.image("enemy_bullet_6", "/assets/enemy_bullet_ani/Fireball enemy6.png");
    }

    create() {
        const backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
    backgroundMusic.play();

        //Background and platforms
        this.add.image(0, 0, "bg1").setScale(1, 1).setOrigin(0, 0);
        const platforms = this.physics.add.staticGroup();
        const ground = this.physics.add.staticGroup();
        ground
            .create(this.sizes.width / 2, this.sizes.height - 100, null)
            .setSize(this.sizes.width - 120, 15)
            .setVisible(false);
        platforms
            .create(this.sizes.width / 2, 100, null)
            .setSize(this.sizes.width - 120, 15)
            .setVisible(false);
        platforms
            .create(130, this.sizes.height / 2, null)
            .setSize(15, this.sizes.height - 100)
            .setVisible(false);
        platforms
            .create(1789, this.sizes.height / 2, null)
            .setSize(15, this.sizes.height - 100)
            .setVisible(false);
        this.enemy1 = new Boss(
            this,
            this.sizes.width - 300,
            this.sizes.height - 300,
            platforms
        );
        this.player = new Player(
            this,
            200,
            this.sizes.height - 200,
            platforms,
            this.enemy1
        );
        this.enemy1.player = this.player;
        this.enemy1.direction = 'left';
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, ground);
        this.physics.world.gravity.y = 1000;
        this.lastDashTime = this.time.now - this.dashCooldown;
        this.physics.add.collider(this.enemy1, ground);
        this.physics.add.collider(this.enemy1, platforms);
        this.physics.add.overlap(
            this.enemy1,
            this.player,
            this.enemy1.handleOverlapDamage,
            null,
            this.player
        );
        this.physics.add.overlap(
            this.enemy1,
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
        this.physics.world.gravity.y = 3000;
        this.createGameOverGraphic();
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.enemy1.update(time, delta);
        if (this.player.health <= 0 && !this.gameOverGraphic.visible) {
            this.gameOver();
        }
        if (this.enemy1.health <= 0) {
            this.scene.start('Ending');
        }
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
            this.scene.start('Game_Scene');
        });
    
        graphics.setVisible(false);
        gameOverText.setVisible(false);
        restartButton.setVisible(false);
        this.gameOverGraphic = graphics;
        this.gameOverText = gameOverText;
        this.restartButton = restartButton;
    }

    gameOver() {
        this.gameOverGraphic.setVisible(true);
        this.gameOverText.setVisible(true);
        this.restartButton.setVisible(true);
        this.physics.pause(); 
        this.player.setVelocity(0, 0); 
        this.player.anims.stop();
    }
}

export default finalScene;

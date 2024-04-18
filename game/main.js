import './style.css';
import Phaser from 'phaser';

const sizes = {
  width: 1080,
  height: 600
};

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.isJumping = false;
    this.dashCount = [3, 5, 7];
    this.currentStage = 0;
    this.dashDuration = 200;
    this.direction = 1; 
    this.characterHealth = 100; 
    this.enemyHealth = 1000; 
    this.lastAttackTime = 0;
  }

  preload() {
    this.load.image("bg", "blueBG.jpeg");
    this.load.image("character", "character.png");
    this.load.image("bullet", "bullet.png");
    this.load.image("enemy", "teslaCoil.png"); 
    this.load.image("electricBolt", "lightening_circle.jpg"); 
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.character = this.physics.add.sprite(100, 450, "character").setOrigin(0, 0);
    this.character.body.setSize(190, 240);
    this.character.setCollideWorldBounds(true);

    this.bullets = this.physics.add.group();

    this.enemy = this.physics.add.sprite(700, 450, "enemy").setOrigin(0, 0); 
    this.enemy.body.setSize(150, 220);
    this.enemy.setCollideWorldBounds(true);

    this.characterHealthBar = this.add.graphics();
    this.enemyHealthBar = this.add.graphics();
    this.updateHealthBars();

    this.enemyProjectiles = this.physics.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.physics.add.collider(this.bullets, this.enemy, this.handleBulletCollision, null, this);
    this.physics.add.collider(this.enemyProjectiles, this.character, this.handleProjectileCollision, null, this);
  }

  update() {
    const speed = 200;
    const currentTime = this.time.now;

   
    if (this.cursors.left.isDown) {
      this.character.setVelocityX(-speed);
      this.direction = -1; 
    } else if (this.cursors.right.isDown) {
      this.character.setVelocityX(speed);
      this.direction = 1; 
    } else {
      this.character.setVelocityX(0);
    }

    if (this.cursors.up.isDown && !this.isJumping) {
      this.character.setVelocityY(-300);
      this.isJumping = true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.QKey)) {
      this.fireBullet();
    }

    if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.dashCount[this.currentStage] > 0) {
      this.dash();
    }

    if (this.character.body.onFloor()) {
      this.isJumping = false;
    }

    if (currentTime - this.lastAttackTime > 2000) { 
      const distanceToCharacter = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.character.x, this.character.y);
      if (distanceToCharacter > 300) {
        this.time.addEvent({
          delay: 200,
          repeat: 2,
          callback: this.rangeAttack,
          callbackScope: this
        });
      } else {
        this.time.addEvent({
          delay: 500,
          callback: this.rangeAttack,
          callbackScope: this
        });
      }
      this.lastAttackTime = currentTime;
    }
  }

  fireBullet() {
    const bulletVelocity = 400 * this.direction; 
    const bullet = this.bullets.create(this.character.x + 30, this.character.y + 10, "bullet");
    bullet.setVelocityX(bulletVelocity);
  }

  dash() {
    console.log("Dashing");

    const dashSpeed = 5000;
    const dashDirection = this.direction;

    this.character.body.checkCollision.none = true;

    this.character.setVelocityX(dashSpeed * dashDirection);

    this.time.addEvent({
      delay: this.dashDuration,
      callback: this.endDash,
      callbackScope: this
    });

    this.dashCount[this.currentStage]--;
    console.log(`Remaining dashes: ${this.dashCount[this.currentStage]}`);
  }

  endDash() {
    console.log("End Dash");

    this.character.body.checkCollision.none = false;

    this.character.setVelocityX(0);
  }

  rangeAttack() {
    if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.character.x, this.character.y) < 300) {
      const boltVelocity = 1000 * Math.sign(this.character.x - this.enemy.x); 
      const bolt = this.enemyProjectiles.create(this.enemy.x, this.enemy.y, "electricBolt");
      bolt.setVelocityX(boltVelocity);
    }
  }  

  handleBulletCollision(bullet, enemy) {
    bullet.disableBody(true, true); 
    this.enemyHealth -= 10; 
    this.updateHealthBars(); 
  }

  handleProjectileCollision(projectile, character) {
    projectile.disableBody(true, true); 
    this.characterHealth -= 10; 
    this.updateHealthBars(); 
    if (this.characterHealth <= 0) {
      this.showRetryPopup();
    }
  }

  updateHealthBars() {
    const characterHealthWidth = (this.characterHealth / 100) * 100; 
    const enemyHealthWidth = (this.enemyHealth / 1000) * 100; 

    this.characterHealthBar.clear();
    this.characterHealthBar.fillStyle(0x00FF00);
    this.characterHealthBar.fillRect(10, 10, characterHealthWidth, 10);

    this.enemyHealthBar.clear();
    this.enemyHealthBar.fillStyle(0xFF0000);
    this.enemyHealthBar.fillRect(970, 10, enemyHealthWidth, 10);
  }

  showRetryPopup() {
    const retryPopup = this.add.text(sizes.width / 2, sizes.height / 2, "Retry?", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    retryPopup.setInteractive();
    retryPopup.on('pointerdown', () => {
      this.scene.restart();
    });
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [GameScene]
};

const game = new Phaser.Game(config);

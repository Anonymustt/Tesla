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
  }

  preload() {
    this.load.image("bg", "blueBG.jpeg");
    this.load.image("character", "character.png");
    this.load.image("bullet", "bullet.png"); 
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.character = this.physics.add.sprite(100, 450, "character").setOrigin(0, 0);
    this.character.body.setSize(190, 220);
    this.character.setCollideWorldBounds(true);

    this.bullets = this.physics.add.group();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  }

  update() {
    const speed = 200;

    if (this.cursors.left.isDown) {
      this.character.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.character.setVelocityX(speed);
    } else {
      this.character.setVelocityX(0);
    }

    // Jumping
    if (this.cursors.up.isDown && !this.isJumping) {
      this.character.setVelocityY(-300);
      this.isJumping = true;
    }

    // Firing ability (Q)
    if (Phaser.Input.Keyboard.JustDown(this.QKey)) {
      this.fireBullet();
    }

    // Reset jump flag when character is on the ground
    if (this.character.body.onFloor()) {
      this.isJumping = false;
    }
  }

  fireBullet() {
    const bullet = this.bullets.create(this.character.x + 30, this.character.y + 10, "bullet");
    bullet.setVelocityX(400); // Adjust bullet speed as needed
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

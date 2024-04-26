import './style.css'
import Phaser from 'phaser'
import finalScene from './public/scenes/finalScene';
import GameScene from './public/scenes/gameScene';

const sizes = {
  width: 1920,
  height: 1080
}

const speedDown = 3000;

const config = {
  type : Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics : {
    default:"arcade",
    arcade:{
      gravity:{y:speedDown},
      debug:false
    }
  },
  scene:[GameScene, finalScene]
}

const game = new Phaser.Game(config);

import './style.css'
import Phaser from 'phaser'
import GameScene from './public/scenes/gameScene';

const sizes = {
  width: 1920,
  height: 1080
}

const speedDown = 1000;

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
  scene:[GameScene]
}

const game = new Phaser.Game(config);

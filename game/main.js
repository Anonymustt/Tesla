import './style.css'
import Phaser from 'phaser'
import GameScene from './public/scenes/gameScene';

const sizes = {
  width: 1000,
  height: 562
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

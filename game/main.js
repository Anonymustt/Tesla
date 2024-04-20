import Phaser from 'phaser';
import Scene1 from './components/scenes/scene1.js';
import './style.css'

const sizes = {
  width: 1920,
  height: 1080
};
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
      debug:true
    }
  },
  scene: [Scene1]
};

const game = new Phaser.Game(config);
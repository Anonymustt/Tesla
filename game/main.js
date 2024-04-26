import './style.css'
import Phaser from 'phaser'
import finalScene from './public/scenes/finalScene';
import GameScene from './public/scenes/gameScene';
import MainMenu from './public/scenes/mainMenu';
import Ending from './public/scenes/Ending';
import cutScene from './public/scenes/Cutscene';

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
  scene:[MainMenu, cutScene, GameScene, finalScene, Ending],
  audio: {
    disableWebAudio: false // Set to true if you prefer HTML5 Audio
  }
}

const game = new Phaser.Game(config);


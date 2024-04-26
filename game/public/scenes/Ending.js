import Phaser from 'phaser';

class Ending extends Phaser.Scene {
    constructor() {
        super('Ending');
    }

    preload(){
        this.load.audio("backgroundMusic", "bg_audio.mp3")

        this.load.image('background', '/assets/Level2.png');
    }

    create() {


        const backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
    backgroundMusic.play();

        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        const { width, height } = this.sys.game.config;

        this.add.text(width / 2, height * 0.3, 'Game Completed', { 
            fontFamily: 'main',
            fontSize: '38px',
            fill: '#fff'
        }).setOrigin(0.5);

        const storyText = `Tesla's apprentice was never found after the experiment failed, Some say he became the very meaning of electricity, Some say it was just another Tesla's Trial`;
        this.add.text(width / 2, height / 2, storyText, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: width - 100 }
        }).setOrigin(0.5);
    }
}

export default Ending;

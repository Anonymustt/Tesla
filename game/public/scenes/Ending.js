import Phaser from 'phaser';

class Ending extends Phaser.Scene {
    constructor() {
        super('Ending');
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.text(width / 2, height * 0.1, 'Game Completed', { 
            fontSize: '32px', 
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const storyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`;
        this.add.text(width / 2, height / 2, storyText, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: width - 100 }
        }).setOrigin(0.5);

        const creditsText = 'Credits:\nGame Development: 2 College Kids !';
        this.add.text(width / 2, height * 0.9, creditsText, {
            fontSize: '18px',
            fill: '#fff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);
    }
}

export default Ending;

import Phaser from 'phaser';

class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('background', '/assets/Level2.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        let startButton = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 60, 'Start Game', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('Cut_Scene');
        });

        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#f39c12' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#fff' });
        });

        let quitButton = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 40, 'Quit Game', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        quitButton.on('pointerdown', () => {
            this.sys.game.destroy(true);
        });

        quitButton.on('pointerover', () => {
            quitButton.setStyle({ fill: '#c0392b' });
        });

        quitButton.on('pointerout', () => {
            quitButton.setStyle({ fill: '#fff' });
        });
    }
}

export default MainMenu;

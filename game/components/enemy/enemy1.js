import Phaser from "phaser";

export default class ElectronCloud extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, player) {
    super(scene, x, y, "cloudImageKey");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setVelocityY(Phaser.Math.RND.between(-10, 10)); 
    this.setBounce(1, 1); 
    this.setCollideWorldBounds(true); 
    this.player = player;

    this.shootingTimer = scene.time.addEvent({
      delay: 3000, 
      callback: this.shootElectron,
      callbackScope: this,
      loop: true
    });
  }

  update() {
        if (this.y <= 1000 && this.body.velocity.y < 0) {
            this.setVelocityY(Phaser.Math.RND.between(1, 10)); // Move downwards
        }
        else if (this.y >= 1500 && this.body.velocity.y > 0) {
            this.setVelocityY(Phaser.Math.RND.between(-10, -1)); // Move upwards
        }
        else {
            if (Phaser.Math.RND.between(0, 10) < 1) {
                this.setVelocityY(Phaser.Math.RND.between(-10, 10)); // Random movement within limits
            }
        }
    }
    


  shootElectron() {
    const electron = this.scene.physics.add.sprite(this.x, this.y, "electronImageKey");
    const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);

    this.scene.physics.moveTo(electron, this.player.x, this.player.y, 1200); // Speed of electron
    electron.body.allowGravity = false;

    this.scene.physics.add.collider(electron, this.platforms, () => {
        electron.destroy();
    });
  }
}

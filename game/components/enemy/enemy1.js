import Phaser from "phaser";

export default class ElectronCloud extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, player, platforms) {
    super(scene, x, y, "cloudImageKey");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // this.setImmovable(true);
    this.setBounce(1,1)
    this.setVelocityY(Phaser.Math.RND.between(-10, 10)); 
    this.body.collideWorldBounds = true;
    this.scene.physics.add.collider(this, platforms); 
     
    this.player = player;
    this.platforms = platforms;

    this.maxHealth = 500;
    this.health = this.maxHealth;
    this.createHealthBar();

    this.shootingTimer = scene.time.addEvent({
      delay: Phaser.Math.RND.between(800, 2500), 
      callback: this.shootElectron,
      callbackScope: this,
      loop: true
    });
  }


  update() {
        
    }
    


  shootElectron() {
    const electron = this.scene.physics.add.sprite(this.x, this.y, "electronImageKey");
    const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);

    this.scene.physics.moveTo(electron, this.player.x, this.player.y, 1000); // Speed of electron
    electron.body.allowGravity = false;

    // this.scene.physics.add.collider(electron, this.platforms, () => {
    //     electron.destroy();
    // });
  }
}

import { Scene } from "phaser";

export default class BaseScene extends Scene {
  constructor(sceneKey, config) {
    super(sceneKey);

    this.config = config;
    this.screenCenter = [this.config.width / 2, this.config.height / 2];

    this.fontSize = 32;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: "#FFF" };
    this.lineHeight = 42;
  }

  create() {
    this.add.image(0, 0, "sky").setOrigin(0);
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const x = this.screenCenter[0];
      const y = this.screenCenter[1] + lastMenuPositionY;

      menuItem.textGameObject = this.add
        .text(x, y, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 2);

      lastMenuPositionY += this.lineHeight;

      setupMenuEvents(menuItem);
    });
  }
}

import BaseScene from "./base";

export default class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Play" },
      { scene: "ScoreScene", text: "Score" },
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));
  }

  setupMenuEvents(menuItem) {
    const textGameObject = menuItem.textGameObject;
    textGameObject.setInteractive();

    textGameObject.on("pointerover", () => {
      textGameObject.setStyle({ fill: "#ff0" });
    });

    textGameObject.on("pointerout", () => {
      textGameObject.setStyle({ fill: "#fff" });
    });

    textGameObject.on("pointerup", () => {
      this.scene.start(menuItem.scene);
    });
  }
}

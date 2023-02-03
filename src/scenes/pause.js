import BaseScene from "./base";

export default class PauseScene extends BaseScene {
  constructor(config) {
    super("PauseScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Continue" },
      { scene: "MenuScene", text: "Exit" },
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));

    this.input.keyboard.on("keydown_SPACE", this.onContinue, this);
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
      if (menuItem.text === "Continue") {
        this.onContinue();
      }

      if (menuItem.text === "Exit") {
        this.scene.stop("PlayScene");
        this.scene.start(menuItem.scene);
      }
    });
  }

  onContinue() {
    this.scene.stop();
    this.scene.resume("PlayScene");
  }
}

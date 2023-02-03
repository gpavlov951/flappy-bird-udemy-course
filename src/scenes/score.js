import BaseScene from "./base";
import { getBestScore } from "../storage/index";
import { bestScoreText } from "../utils/index";

export default class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
  }

  create() {
    super.create();

    const bestScore = getBestScore();

    this.add
      .text(...this.screenCenter, bestScoreText(bestScore), this.fontOptions)
      .setOrigin(0.5);

    this.createBackButton();
  }

  createBackButton() {
    const backButton = this.add
      .image(this.config.width - 10, this.config.height - 10, "back")
      .setOrigin(1)
      .setScale(2)
      .setInteractive();

    backButton.on("pointerup", this.onBackButton, this);
    this.input.keyboard.on("keydown_ESC", this.onBackButton, this);
    this.input.keyboard.on("keydown_BACKSPACE", this.onBackButton, this);
  }

  onBackButton() {
    this.scene.start("MenuScene");
  }
}

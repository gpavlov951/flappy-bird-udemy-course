import BaseScene from "./base";
import { getBestScore, setBestScore } from "../storage/index";
import { scoreText, bestScoreText } from "../utils/index";

const PIPES_TO_RENDER = 4;

export default class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", config);

    this.bird = null;
    this.pipes = null;
    this.isPaused = false;

    this.flapVelocity = 300;

    this.score = 0;
    this.scoreText = "";

    this.currentDifficulty = "";
    this.difficulties = {
      easy: {
        pipeHorizontalDistanceRange: [300, 400], // 100
        pipeVerticalDistanceRange: [150, 250], // 100
      },
      normal: {
        pipeHorizontalDistanceRange: [280, 350], // 70
        pipeVerticalDistanceRange: [130, 200], // 70
      },
      hard: {
        pipeHorizontalDistanceRange: [260, 310], // 50
        pipeVerticalDistanceRange: [120, 170], // 50
      },
      expert: {
        pipeHorizontalDistanceRange: [240, 280], // 40
        pipeVerticalDistanceRange: [110, 150], // 40
      },
    };
  }

  create() {
    this.currentDifficulty = "easy";

    super.create();

    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPause();

    this.handleInputs();

    this.listenToEvents();

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("bird", { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1,
    });

    this.bird.play("fly");
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  listenToEvents() {
    if (this.pauseEvent) return;

    this.pauseEvent = this.events.on("resume", () => {
      this.initialTime = 3;

      this.countDownText = this.add
        .text(
          ...this.screenCenter,
          `Fly in: ${this.initialTime}`,
          this.fontOptions
        )
        .setOrigin(0.5);

      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText(`Fly in: ${this.initialTime}`);

    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText("");
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0);

    this.bird.body.gravity.y = 600;
    this.bird.setBodySize(this.bird.width, this.bird.height - 8);
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes
        .create(0, 0, "pipe")
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, scoreText(this.score), {
      fontSize: "32px",
      fill: "#00000",
    });

    const bestScore = getBestScore();
    this.add.text(16, 52, bestScoreText(bestScore), {
      fontSize: "18px",
      fill: "#00000",
    });
  }

  createPause() {
    this.isPaused = false;

    const pauseButton = this.add
      .image(this.config.width - 10, this.config.height - 10, "pause")
      .setOrigin(1)
      .setScale(2)
      .setInteractive();

    pauseButton.on("pointerdown", this.onPause, this);
  }

  handleInputs() {
    this.input.on("pointerdown", this.flap, this);
    this.input.keyboard.on("keydown_SPACE", this.flap, this);
    this.input.keyboard.on("keydown_ESC", this.onPause, this);
  }

  onPause() {
    this.isPaused = true;

    this.physics.pause();
    this.scene.pause();
    this.scene.launch("PauseScene");
  }

  checkGameStatus() {
    if (
      this.bird.getBounds().bottom >= this.config.height ||
      this.bird.y <= 0
    ) {
      this.gameOver();
    }
  }

  placePipe(upperPipe, lowerPipe) {
    const difficulty = this.difficulties[this.currentDifficulty];

    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(
      ...difficulty.pipeVerticalDistanceRange
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      this.config.height - 20 - pipeVerticalDistance
    );
    const pipeHorizontalDistance = Phaser.Math.Between(
      ...difficulty.pipeHorizontalDistanceRange
    );

    upperPipe.x = rightMostX + pipeHorizontalDistance;
    upperPipe.y = pipeVerticalPosition;

    lowerPipe.x = upperPipe.x;
    lowerPipe.y = upperPipe.y + pipeVerticalDistance;
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
      }
    });

    if (tempPipes.length === 2) {
      this.placePipe(...tempPipes);
      this.increaseScore();
      this.saveBestScore();
      this.increaseDifficulty();
    }
  }

  increaseDifficulty() {
    const bestScore = getBestScore();
    const normalDifficulty = bestScore ? Math.floor(bestScore * 0.5) : 20;
    const hardDifficulty = bestScore ? Math.floor(bestScore * 0.8) : 40;
    const expertDifficulty = bestScore ? Math.floor(bestScore * 0.9) : 70;

    if (this.score === normalDifficulty) {
      this.currentDifficulty = "normal";
    }

    if (this.score === hardDifficulty) {
      this.currentDifficulty = "hard";
    }

    if (this.score === expertDifficulty) {
      this.currentDifficulty = "expert";
    }
  }

  flap() {
    if (this.isPaused) return;

    this.bird.body.velocity.y = -this.flapVelocity;
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(scoreText(this.score));
  }

  saveBestScore() {
    const bestScoreText = getBestScore();
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      setBestScore(this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => this.scene.restart(),
      loop: false,
    });
  }
}

import { AUTO, Game } from "phaser";
import MenuScene from "./scenes/menu";
import PlayScene from "./scenes/play";
import PreloadScene from "./scenes/preload";
import ScoreScene from "./scenes/score";
import PauseScene from "./scenes/pause";

const { width, height } = window.screen;

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const SHARED_CONFIG = {
  width: DEFAULT_WIDTH > width ? width : DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  startPosition: { x: DEFAULT_WIDTH / 10, y: DEFAULT_HEIGHT / 2 },
};

const scenes = [PreloadScene, ScoreScene, MenuScene, PlayScene, PauseScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScrenes = (scenes) => scenes.map(createScene);

const config = {
  type: AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: "arcade",
  },
  scene: initScrenes(scenes),
};

new Game(config);

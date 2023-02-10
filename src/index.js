import { AUTO, Game } from "phaser";
import MenuScene from "./scenes/menu";
import PlayScene from "./scenes/play";
import PreloadScene from "./scenes/preload";
import ScoreScene from "./scenes/score";
import PauseScene from "./scenes/pause";

const { innerWidth, innerHeight } = window;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const regexp = /android|iphone|kindle|ipad/i;
const isMobileDevice = regexp.test(navigator.userAgent);

const width = isMobileDevice ? innerWidth : DEFAULT_WIDTH;
const height = isMobileDevice ? innerHeight : DEFAULT_HEIGHT;

const SHARED_CONFIG = {
  width: width,
  height: height,
  startPosition: { x: width / 10, y: height / 2 },
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

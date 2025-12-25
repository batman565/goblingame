import "./styles/style.css";
import goblinImage from "./assets/goblin.png";
import hammerCursorImage from "./assets/hammer-cursor.png";

import { GameField } from "./js/GameField.js";
import { Game } from "./js/Game.js";

const app = document.getElementById("app");
const gameField = new GameField(app);

document.documentElement.style.setProperty(
  "--hammer-cursor",
  `url(${hammerCursorImage}) 16 16, pointer`
);

const game = new Game(gameField, goblinImage, () => {
  console.log("Game over!");
});

game.start();

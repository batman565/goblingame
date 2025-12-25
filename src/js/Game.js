import { Goblin } from "./Goblin.js";

export class Game {
  constructor(gameField, goblinImagePath, onGameOver) {
    this.gameField = gameField;
    this.goblinImagePath = goblinImagePath;
    this.score = 0;
    this.misses = 0;
    this.onGameOver = onGameOver;
    this.activeGoblin = null;
    this.timer = null;

    this.scoreElement = document.createElement("div");
    this.scoreElement.id = "score";
    this.scoreElement.style.fontSize = "24px";
    this.scoreElement.style.marginBottom = "20px";
    this.scoreElement.style.textAlign = "center";
    document.getElementById("app").prepend(this.scoreElement);

    this.updateScore();

    gameField.field.addEventListener("click", (e) => {
      const cell = e.target.closest(".cell");
      if (cell) {
        this.handleCellClick(cell);
      }
    });
  }

  handleCellClick(clickedCell) {
    if (
      this.activeGoblin &&
      this.activeGoblin.shown &&
      clickedCell === this.activeGoblin.cell
    ) {
      this.score++;
      this.activeGoblin.hide();
      clearTimeout(this.timer);
      this.updateScore();
      setTimeout(() => this.spawnGoblin(), 800);
    } else if (this.activeGoblin && this.activeGoblin.shown) {
      this.misses++;
      this.updateScore();

      if (this.misses >= 5) {
        this.gameOver();
      }
    }
  }

  spawnGoblin() {
    if (this.misses >= 5) {
      this.gameOver();
      return;
    }

    if (this.activeGoblin) {
      this.activeGoblin.hide();
    }

    const cell = this.gameField.getRandomCell();
    this.activeGoblin = new Goblin(cell, this.goblinImagePath);
    this.activeGoblin.show();

    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      if (this.activeGoblin && this.activeGoblin.shown) {
        this.activeGoblin.hide();
        this.misses++;
        this.updateScore();

        if (this.misses >= 5) {
          this.gameOver();
        } else {
          this.spawnGoblin();
        }
      }
    }, 1000);
  }

  start() {
    this.spawnGoblin();
  }

  reset() {
    clearTimeout(this.timer);
    if (this.activeGoblin) {
      this.activeGoblin.hide();
    }
    this.score = 0;
    this.misses = 0;
    this.activeGoblin = null;
    this.timer = null;
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.textContent = `Счёт: ${this.score} | Промахи: ${this.misses}/5`;
  }

  gameOver() {
    clearTimeout(this.timer);
    alert(`Игра окончена! Ваш счёт: ${this.score}`);
    this.reset();
    this.start();
  }
}

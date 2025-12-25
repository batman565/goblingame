export class GameField {
  constructor(container, rows = 4, cols = 4) {
    this.container = container;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.init();
  }

  init() {
    this.field = document.createElement("div");
    this.field.id = "game-field";

    for (let i = 0; i < this.rows * this.cols; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      this.field.appendChild(cell);
      this.cells.push(cell);
    }

    this.container.appendChild(this.field);
  }

  getRandomCell() {
    const index = Math.floor(Math.random() * this.cells.length);
    return this.cells[index];
  }

  clearAll() {
    this.cells.forEach((cell) => cell.classList.remove("goblin"));
  }
}

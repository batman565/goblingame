export class Goblin {
  constructor(cell, imagePath) {
    this.cell = cell;
    this.imagePath = imagePath;
    this.img = null;
    this.shown = false;
  }

  show() {
    if (this.shown) return;
    this.img = document.createElement("img");
    this.img.src = this.imagePath;
    this.img.alt = "Goblin";
    this.img.style.width = "100%";
    this.img.style.height = "100%";
    this.img.style.objectFit = "cover";
    this.cell.appendChild(this.img);
    this.shown = true;
  }

  hide() {
    if (this.img && this.cell.contains(this.img)) {
      this.cell.removeChild(this.img);
    }
    this.shown = false;
    this.img = null;
  }
}

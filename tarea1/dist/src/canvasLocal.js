export class CanvasLocal {
  constructor(g, canvas) {
      this.graphics = g;
      this.rWidth = 6;
      this.rHeight = 4;
      this.maxX = canvas.width - 1;
      this.maxY = canvas.height - 1;
      this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
      this.centerX = this.maxX / 2;
      this.centerY = this.maxY / 2;
  }
  iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
  iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
  drawLine(x1, y1, x2, y2) {
      this.graphics.beginPath();
      this.graphics.moveTo(x1, y1);
      this.graphics.lineTo(x2, y2);
      this.graphics.closePath();
      this.graphics.stroke();
  }
  paint() {
     
      let largo = 500; 
      let ancho = 300; 
      let xCenter = 320;
      let yCenter = 240;
      let xA, yA, xB, yB, xC, yC, xD, yD;
      xA = xCenter - largo / 2;
      yA = yCenter - ancho / 2;
      xB = xCenter + largo / 2;
      yB = yCenter - ancho / 2;
      xC = xCenter + largo / 2;
      yC = yCenter + ancho / 2;
      xD = xCenter - largo / 2;
      yD = yCenter + ancho / 2;
      let q = 0.05;
      let p = 1 - q;
      for (let i = 0; i < 100; i++) {
          this.drawLine(xA, yA, xB, yB);
          this.drawLine(xB, yB, xC, yC);
          this.drawLine(xC, yC, xD, yD);
          this.drawLine(xD, yD, xA, yA);
          let xA1 = p * xA + q * xB;
          let yA1 = p * yA + q * yB;
          let xB1 = p * xB + q * xC;
          let yB1 = p * yB + q * yC;
          let xC1 = p * xC + q * xD;
          let yC1 = p * yC + q * yD;
          let xD1 = p * xD + q * xA;
          let yD1 = p * yD + q * yA;
          xA = xA1;
          xB = xB1;
          xC = xC1;
          xD = xD1;
          yA = yA1;
          yB = yB1;
          yC = yC1;
          yD = yD1;
      }
  }
}

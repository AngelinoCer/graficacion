// Archivo: CanvasLocal.ts
export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
  protected rWidth: number;
  protected rHeight: number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  private heights: number[];

  constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight = 8;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX / 12;
    this.centerY = this.maxY / 8 * 7;
    this.heights = [27, 10, 16, 90, 50, 75];
    this.createControls();
  }


  iX(x: number): number {
  return Math.round(this.centerX + x / this.pixelSize);
}

iY(y: number): number {
  return Math.round(this.centerY - y / this.pixelSize);
}

drawLine(x1: number, y1: number, x2: number, y2: number) {
  this.graphics.beginPath();
  this.graphics.moveTo(x1, y1);
  this.graphics.lineTo(x2, y2);
  this.graphics.closePath();
  this.graphics.stroke();
}

maxH(h: number[]): number {
  let max = h[0];
  for (let i = 1; i < h.length; i++) {
    if (max < h[i]) max = h[i];
  }
  let pot: number = 10;
  while (pot < max) pot *= 10;
  pot /= 10;
  return Math.ceil(max / pot) * pot;
}

barra(x: number, y: number, alt: number): void {
  this.drawLine(this.iX(x), this.iY(0), this.iX(x - 0.5), this.iY(0.5));
  this.drawLine(this.iX(x - 0.5), this.iY(0.5), this.iX(x - 0.5), this.iY(y + alt));
  this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x), this.iY(y + alt - 0.5));
  this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x + 0.5), this.iY(y + alt));
  this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(0.5));
  this.drawLine(this.iX(x + 0.5), this.iY(0.5), this.iX(x), this.iY(0));
  this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(y + alt - 0.5));
  this.graphics.strokeStyle = 'gray';
  this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x - 0.5), this.iY(this.rHeight - 2));
  this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x), this.iY(this.rHeight - 2.5));
  this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(this.rHeight - 2));
  this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
  this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
  this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
  this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
  this.graphics.strokeStyle = 'black';
}


  private createControls(): void {
  const sliderContainer = document.createElement('div');
  sliderContainer.style.position = 'absolute';
  sliderContainer.style.left = '20px';
  sliderContainer.style.top = '50%';
  sliderContainer.style.transform = 'translateY(-50%)';
  sliderContainer.style.display = 'flex';
  sliderContainer.style.flexDirection = 'column';
  sliderContainer.style.gap = '10px';
  sliderContainer.style.padding = '10px';
  sliderContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  sliderContainer.style.borderRadius = '10px';
  sliderContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
  sliderContainer.style.fontFamily = 'Arial, sans-serif';

  this.heights.forEach((value, index) => {
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.flexDirection = 'column';
    label.style.fontSize = '12px';
    label.innerText = `Barra ${index + 1}`;

    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '100';
    input.value = value.toString();
    input.style.width = '100px';

    const span = document.createElement('span');
    span.innerText = value.toString();
    span.style.fontSize = '11px';
    span.style.textAlign = 'right';

    input.addEventListener('input', () => {
      this.heights[index] = parseInt(input.value);
      span.innerText = input.value;
      this.paint();
    });

    label.appendChild(input);
    label.appendChild(span);
    sliderContainer.appendChild(label);
  });

  document.body.appendChild(sliderContainer);
}


  // Métodos iX, iY, drawLine, drawRmboide, fx, maxH, barra (sin cambios)
  // ... copiar los mismos que tenías

  paint() {
    this.graphics.clearRect(0, 0, this.maxX, this.maxY);
    const h = this.heights;
    const maxEsc = this.maxH(h);
    const colors = ['magenta', 'red', 'green', 'yellow'];
    let i = 0;
    for (let x = 0; x < 8; x += 8 / h.length) {
      this.graphics.strokeStyle = colors[i % colors.length];
      if (i < h.length) {
        this.barra(x, 0, h[i++] * (this.rHeight - 2) / maxEsc);
      }
    }
    i = 0;
    for (let x = 0; x < 8; x += 8 / h.length) {
      this.graphics.strokeStyle = colors[i % colors.length];
      if (i < h.length) {
        this.graphics.strokeText(h[i++] + "", this.iX(x), this.iY(-0.5));
      }
    }
  }

  // Asegúrate de incluir los métodos auxiliares (iX, iY, drawLine, etc.) aquí
}

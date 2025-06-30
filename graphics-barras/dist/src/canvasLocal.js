// Archivo: CanvasLocal.ts
export class CanvasLocal {
    constructor(g, canvas) {
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
    iX(x) {
        return Math.round(this.centerX + x / this.pixelSize);
    }
    iY(y) {
        return Math.round(this.centerY - y / this.pixelSize);
    }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    maxH(h) {
        let max = h[0];
        for (let i = 1; i < h.length; i++) {
            if (max < h[i])
                max = h[i];
        }
        let pot = 10;
        while (pot < max)
            pot *= 10;
        pot /= 10;
        return Math.ceil(max / pot) * pot;
    }
    barra(x, y, alt) {
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
    createControls() {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '10px';
        container.style.background = 'rgba(255, 255, 255, 0.8)';
        container.style.padding = '10px';
        container.style.borderRadius = '10px';
        this.heights.forEach((value, index) => {
            const label = document.createElement('label');
            label.innerText = `Barra ${index + 1}: `;
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '100';
            input.value = value.toString();
            input.oninput = () => {
                this.heights[index] = parseInt(input.value);
                this.paint();
            };
            const span = document.createElement('span');
            span.innerText = value.toString();
            input.addEventListener('input', () => {
                span.innerText = input.value;
            });
            const lineBreak = document.createElement('br');
            container.appendChild(label);
            container.appendChild(input);
            container.appendChild(span);
            container.appendChild(lineBreak);
        });
        document.body.appendChild(container);
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
}

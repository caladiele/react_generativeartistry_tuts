import {
  useRef,
  useEffect
} from 'react';
import {
  randomColor
} from '../Utils/GetColors';

// --> OG Tutorial at https://generativeartistry.com/tutorials/triangular-mesh/


const TriangularMesh = () => {

  const canvasRef = useRef(null);

  const draw = (ctx, pointA, pointB, pointC) => {
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.closePath();

    let color = randomColor();
    ctx.fillStyle = '#' + color;
    ctx.fill();
    ctx.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const size = context.canvas.width;
    const canvasSize = size;
    const dpr = window.devicePixelRatio;

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    context.scale(dpr, dpr);
    context.lineJoin = "bevel";

    let line, dot,
      odd = false,
      lines = [],
      gap = size / 8;

    for (let y = gap / 2; y <= size; y += gap) {
      odd = !odd;
      line = [];
      for (let x = gap / 4; x <= size; x += gap) {
        dot = {
          x: x + (odd ? gap / 2 : 0),
          y: y
        };
        line.push({
          x: x + (Math.random() * .8 - .4) * gap + (odd ? gap / 2 : 0),
          y: y + (Math.random() * .8 - .4) * gap
        });
        context.fill();
      }
      lines.push(line);
    }

    let dotLine;
    odd = true;

    for (let y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      dotLine = [];
      for (let i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (let i = 0; i < dotLine.length - 2; i++) {
        draw(context, dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }


  });

  return <canvas ref = {
    canvasRef
  }
  width = "600"
  height = "600" / >
}

export default TriangularMesh
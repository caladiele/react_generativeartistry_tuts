import {
    useRef,
    useEffect
} from 'react';
import {
    randomColor
} from '../Utils/GetColors';

// --> OG Tutorial at https://generativeartistry.com/tutorials/joy-division/

const JoyDivision = () => {

    const canvasRef = useRef(null);
    let j = Math.floor(Math.random() * 100);

    const draw = (ctx, lines) => {
        for (let i = 10; i < lines.length; i++) {
            ctx.beginPath();
            ctx.moveTo(lines[i][0].x, lines[i][0].y);

            for (j = 0; j < lines[i].length - 2; j++) {
                let xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
                let yc = (lines[i][j].y + lines[i][j + 1].y) / 2;

                ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
            }

            ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fill();
            ctx.restore();

            ctx.strokeStyle = '#' + randomColor();
            ctx.stroke();
            ctx.closePath();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = window.innerWidth;
        const canvasSize = context.canvas.width;
        const dpr = window.devicePixelRatio;

        canvas.width = canvasSize * dpr;
        canvas.height = canvasSize * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 2;

        let steps = 16,
            lines = [];

        for (let i = steps; i <= size - steps; i += steps) {
            let line = [];

            for (j = steps; j <= size - steps; j += steps) {
                let distanceToCenter = Math.abs(j - canvasSize / 2);
                let variance = Math.max(canvasSize / 2 - 50 - distanceToCenter, 0);
                let random = Math.random() * variance / 2 * -1;
                let point = {
                    x: j,
                    y: i + random
                };
                line.push(point);
            }

            lines.push(line);
            draw(context, lines);
        }
    });

    return <canvas ref = {
        canvasRef
    }
    width = "600"
    height = "600" / >
}

export default JoyDivision
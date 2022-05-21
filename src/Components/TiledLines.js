import {
    useRef,
    useEffect
} from 'react';
import {
    randomColor
} from '../Utils/GetColors';

// --> OG Tutorial at https://generativeartistry.com/tutorials/tiled-lines/

const TiledLines = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, x, y, width, height) => {
        
        ctx.beginPath();

        let leftToRight = Math.random() >= 0.5;
        if (leftToRight) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y + height);
        } else {
            ctx.moveTo(x + width, y);
            ctx.lineTo(x, y + height);
        }

        ctx.strokeStyle = '#' + randomColor();
        // Draw;
        ctx.stroke();
        ctx.closePath();
    }

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = window.innerWidth;
        const canvasSize = context.canvas.width;
        const dpr = window.devicePixelRatio;

        canvas.width = canvasSize * dpr;
        canvas.height = canvasSize * dpr;

        let steps = 10;

        for (let i = 0; i < size; i += steps) {
            for (let j = 0; j < size; j += steps) {
                draw(context, i, j, steps, steps);
            }
        }
    });

    return <canvas ref = {
        canvasRef
    }
    width = "600"
    height = "600" / >
}

export default TiledLines
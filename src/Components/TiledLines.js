import {useRef, useEffect} from 'react';
import { randomColor } from '../Utils/GetColors';


const TiledLines = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, x, y, width, height) => { 
        // Generate a new context with beginPath() (if not, all the strokes will be filled with one color only)
        ctx.beginPath();
        
        // If leftToRight, draw from left to right, otherwise draw from right to left
        let leftToRight = Math.random() >= 0.5;
        if( leftToRight ) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y + height);
        } else {
            ctx.moveTo(x + width, y);
            ctx.lineTo(x, y + height);
        }
        // Generate random Hex color;
        let color = () => {
           return "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        // Set the stroke's color to color() result;
        ctx.strokeStyle = color();
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
        
        for(let i = 0; i < size; i += steps) {
            for(let j = 0; j < size; j += steps) {
                draw(context, i, j, steps, steps);
            }
        }
    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default TiledLines
import {useRef, useEffect} from 'react';
import { floorRandom } from '../Utils/MathFunction';

const HypnoticSquares = () => {

    const canvasRef = useRef(null);
    
    const draw = (ctx, x, y, width, height, xMov, yMov, startSize, startSteps, finalSize, steps) => { 
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        
        ctx.closePath();
        if (steps >= 0) {
            let newSize = (startSize) * (steps / startSteps) + finalSize;
            let newX = x + (width - newSize) / 2;
            let newY = y + (height - newSize) / 2;
            newX = newX - ((x - newX) / (steps + 2)) * yMov;
            newY = newY - ((y - newY) / (steps + 2)) * yMov; 
            draw(ctx, newX, newY, newSize, newSize, xMov, yMov, startSize, startSteps, finalSize, steps - 1);
        }

    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = context.canvas.width;
        const canvasSize = context.canvas.width;        
        const dpr = window.devicePixelRatio;
        
        let finalSize = 3,
            startSteps,
            offset = 2,
            tileStep = (size - offset * 2) / 7,
            startSize = tileStep,
            directions = [-1, 0, 1];

        canvas.width = canvasSize * dpr;
        canvas.height = canvasSize * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 2;

        for (let x = offset; x < size - offset; x += tileStep) {
            for (let y = offset; y < size - offset; y += tileStep) {
                startSteps = 2 + Math.ceil(Math.random() * 3);
                let xDir = directions[floorRandom(directions.length)];
                let yDir = directions[floorRandom(directions.length)];
                draw(context, x, y, startSize, startSize, xDir, yDir, startSize, startSteps, finalSize, startSteps);
            }
        }

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default HypnoticSquares
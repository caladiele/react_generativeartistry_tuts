import {useRef, useEffect} from 'react';
import { getPastelColor } from '../Utils/GetColors';

const UnDeuxTrois = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, x, y, width, height, positions, color) => { 
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(Math.random() * 5);
        ctx.translate(-width / 2, -height / 2);

        for (let i = 0; i <= positions.length; i++) {
            ctx.beginPath();
            ctx.moveTo(positions[i] * width, 0);
            ctx.lineTo(positions[i] * width, height);
            ctx.strokeStyle = getPastelColor();
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = context.canvas.width;
        const canvasSize = context.canvas.width;        
        const dpr = window.devicePixelRatio;

        canvas.width = canvasSize * dpr;
        canvas.height = canvasSize * dpr;
        
        context.lineWidth = 4;
        context.lineCap = 'round';
        const step = 20;
        const aThirdOfHeight = size / 3;

        let color;

        for (let y = step; y < size - step; y += step) {
            for (let x = step; x <= size - step; x += step) {
               if (y < aThirdOfHeight) {
                draw(context, x, y, step, step, [0.5]);
               } else if (y < aThirdOfHeight * 2) {
                draw(context, x, y, step, step, [0.2, 0.8]);
               } else {
                draw(context, x, y, step, step, [0.1, 0.5, 0.9]);
               }
            }
        }

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default UnDeuxTrois
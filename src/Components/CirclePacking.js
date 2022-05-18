import {useRef, useEffect} from 'react';
import { floorRandom } from '../Utils/MathFunction';

const CirclePacking = () => {

    const canvasRef = useRef(null);
    let circles = [];

    const draw = (ctx, size, radius, maxRadius, maxAttemps) => { 
        let newCircle;
        let circleSafeToDraw = false;
        for (let tries = 0; tries < maxAttemps; tries++) {
            newCircle = {
                x: floorRandom(size),
                y: floorRandom(size),
                radius: radius
            }

            if (doesCircleCollide(newCircle, size)) {
                continue;
            } else {
                circleSafeToDraw = true;
                break;
            }
        }

        if (!circleSafeToDraw) {
            return;
        }

        for (let radiusSize = radius; radiusSize < maxRadius; radiusSize++) {
            newCircle.radius = radiusSize;
            if (doesCircleCollide(newCircle)) {
                newCircle.radius--;
                break;
            }
        }

        circles.push(newCircle);

        ctx.beginPath();
        // --> Canvas Arc() Method arg 
        // --> x coord · y coord · radius · starting angle in radians · ending angle in radians
        ctx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.closePath();
    }

    function doesCircleCollide(circle, size) {
        for (let i = 0; i < circles.length; i++) {
            let otherCircle = circles[i];
            let a = circle.radius + otherCircle.radius;
            let x = circle.x - otherCircle.x;
            let y = circle.y - otherCircle.y;

            if (a >= Math.sqrt((x*x) + (y*y))) {
                return true;
            }
        }

        if (circle.x + circle.radius >= size || circle.x - circle.radius <= 0 ){
            return true;
        }
        if (circle.y + circle.radius >= size || circle.y - circle.radius <= 0 ){
            return true;
        }
        return false;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = context.canvas.width;
        const canvasSize = context.canvas.width;        
        const dpr = window.devicePixelRatio;

        canvas.width = canvasSize * dpr;
        canvas.height = canvasSize * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 2;

        const minRadius = 2;
        const maxRadius = 100;
        const totalCircles = 500;
        const createCircleAttemps = 500;
       
        for (let i = 0; i < totalCircles; i++) {
            draw(context, size, minRadius, maxRadius, createCircleAttemps);
        }

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default CirclePacking
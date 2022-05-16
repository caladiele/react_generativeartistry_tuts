import {useRef, useEffect} from 'react';

const TriangularMesh = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, pointA, pointB, pointC) => { 
        console.log("A:" + pointA.x + ', B: ' + pointB.x + ', C:' + pointC.x);
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.lineTo(pointC.x, pointC.y);
        ctx.lineTo(pointA.x, pointA.y);
        ctx.closePath();
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

        let line,
            dot,
            odd = false, 
            lines = [],
            gap = size / 8;

        for (let i = gap /2; i <= size; i += gap) {
            odd = !odd;
            line = [];
            for(let j = gap / 4; j <= size; j += gap) {
                dot = {x: j + (odd ? gap/2 : 0), y: i};
                line.push(dot);
                context.beginPath();
                context.arc(j, i, 1, 0, 2 * Math.PI, true);
                context.fill();
            }
            lines.push(line);
        }

        let dotLine;
        odd = true;

        for (let i = 0 ; i <= lines.length - 1; i++) {
            odd = !odd;
            dotLine = [];
            for (let j = 0; j <= lines[i].length; j++) {
                dotLine.push(odd ? lines[i][j] : lines[i +1][j]);
                dotLine.push(odd ? lines[i + 1][j] : lines[i][j])
            }
            for (let i = 0; i < dotLine.length - 2; i++) {
                draw(context, dotLine[i], dotLine[i + 1], dotLine[i + 2]);
            }
        }


    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default TriangularMesh
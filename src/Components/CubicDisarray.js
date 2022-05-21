import {
    useRef,
    useEffect
} from 'react';

// --> OG Tutorial at https://generativeartistry.com/tutorials/cubic-disarray/

const CubicDisarray = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, width, height, fillColor) => {
        ctx.beginPath();
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();

        ctx.closePath();
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

        const squareSize = 30;
        const randomDisplacement = 15;
        const rotateMultiplier = 20;
        const offset = 10;


        for (let i = squareSize; i <= size - squareSize; i += squareSize) {

            for (let j = squareSize; j <= size - squareSize; j += squareSize) {
                let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                let rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

                plusOrMinus = Math.random() < 0.5 ? -1 : 1;

                let translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

                context.save();
                context.translate(i + translateAmt + offset, j + offset);
                context.rotate(rotateAmt);

                let fillColor = Math.random() < 0.5 ? "#FFFFFF" : "#000000";

                draw(context, squareSize, squareSize, fillColor);
                context.restore();
            }

        }

    });

    return <canvas ref = {
        canvasRef
    }
    width = "600"
    height = "600" / >
}

export default CubicDisarray
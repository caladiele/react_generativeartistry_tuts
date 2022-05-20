import {useRef, useEffect} from 'react';
import { floorRandom } from '../Utils/MathFunction';
import { getPastelColor } from '../Utils/GetColors';

const PietMondrian = () => {

    const canvasRef = useRef(null);
    let squares = [];
    let numOfColoredSquares = 5;
    
    const draw = (ctx, squares) => {
        
        for (let i = 0; i < numOfColoredSquares; i++) {
            squares[Math.floor(Math.random() * squares.length)].colors = getPastelColor();
        } 

        for (let i = 0; i < squares.length; i++) {
            ctx.beginPath();
            ctx.rect(
                squares[i].x,
                squares[i].y,
                squares[i].width,
                squares[i].height
            );
            if(squares[i].colors) {
                ctx.fillStyle = squares[i].colors;
            } else {
                ctx.fillStyle = '#FFFFFF';
            }
            console.log(ctx.fillStyle);
            ctx.fill();
            ctx.stroke();    
            ctx.closePath();
        }
    }

    function slitSquaresWith(coords) {
        const { x, y } = coords;
        for (let i = squares.length - 1; i >= 0; i--) {
            const square = squares[i];
            if (x && x > square.x && x < square.x + square.width) {
                if (Math.random() > 0.5) {
                    squares.splice(i, 1);
                    splitOnX(square, x);
                }
            }
            
            if (y && y > square.y && y < square.y + square.height) {
                if (Math.random() > 0.5) {
                    squares.splice(i, 1);
                    splitOnY(square, y);
                }
            }

        }
    }

    function splitOnX(square, splitAt) {
        let squareA = {
            x: square.x,
            y: square.y,
            width: square.width - (square.width -splitAt + square.x),
            height: square.height
        }
        let squareB = {
            x: splitAt,
            y: square.y,
            width: square.width - splitAt + square.x,
            height: square.height
        }
        squares.push(squareA);
        squares.push(squareB);

    }

    function splitOnY(square, splitAt) {
        let squareA = {
            x: square.x,
            y: square.y,
            width: square.width,
            height: square.height - (square.height - splitAt + square.y)
        }
        let squareB = {
            x: square.x,
            y: splitAt,
            width: square.width,
            height: square.height - splitAt + square.y
        }
        squares.push(squareA);
        squares.push(squareB);
    }
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const size = context.canvas.width;
        const canvasSize = context.canvas.width;        
        const dpr = window.devicePixelRatio;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);
        context.lineWidth = 8;

        let step = size / 7;
        
        squares.push({
            x: 0,
            y: 0,
            width: size,
            height: size
        });

        for (let i = 0; i < size; i += step) {
            slitSquaresWith({ y: i });
            slitSquaresWith({ x: i })
        }


        draw(context, squares)
        

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default PietMondrian
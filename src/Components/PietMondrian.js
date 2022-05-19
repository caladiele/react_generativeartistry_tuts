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
            console.log(true);

        } 

        for (let i = 0; i < squares.length; i++) {
            const square = squares[i];
            ctx.beginPath();
            ctx.rect(
                square.x,
                square.y,
                square.width,
                square.height
            );
            if(squares[i].color) {
                ctx.fillStyle = "#000000";
            } else {
                ctx.fillStyle = '#FFFFFF';
            }
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
                squares.splice(i, 1);
                splitOnX(square, x);
            }
            
            if (y && y > square.y && y < square.y + square.height) {
                squares.splice(i, 1);
                splitOnY(square, y);
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

        let step = size / 6;

        for (let i = 0; i < size; i += step) {
            slitSquaresWith({ y: i });
            slitSquaresWith({ x: i })
        }

        squares.push({
            x: 0,
            y: 0,
            width: size,
            height: size
        });

        draw(context, squares)
        

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default PietMondrian
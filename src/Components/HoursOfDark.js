import {useRef, useEffect} from 'react';

const HoursOfDarks = () => {

    const canvasRef = useRef(null);

    const draw = (ctx, rows, days, cellw, cellh, margx, margy) => { 
        for (let i = 0; i < days; i++) {
            const col = Math.floor(i / rows);
            const row = i % rows;
          
            const x = margx + col * cellw;
            const y = margy + row * cellh;
            const w = 2;
            const h = 30;
  
            ctx.save();
            ctx.translate(x, y);
             
            ctx.beginPath();
            ctx.rect(0, 0, cellw, cellh);
            ctx.clip();
             
            ctx.translate(cellw * 0.5, cellh * 0.5);
          
            const phi = (i / days) * Math.PI;
            const theta = Math.sin(phi) * Math.PI * 0.45 + 0.85;
          
            ctx.rotate(theta);
             
            const scale = Math.abs(Math.cos(phi)) * 2 + 1;
          
            ctx.scale(scale, 1);
             
            ctx.beginPath();
            ctx.rect(w * -0.5, h * -0.5, w, h);
            ctx.fill();
          
            ctx.restore();
            
          }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        
        const size =  context.canvas.width;
        const dpr = window.devicePixelRatio;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        context.scale(dpr, dpr);
        
        const cols = 23;
        const rows = 16;
        const days = 365;
        
        const gridw = size * 0.9;
        const gridh = size * 0.7;
        const cellw = gridw / cols;
        const cellh = gridh / rows;
        const margx = (size - gridw) * 0.5;
        const margy = (size - gridh) * 0.5;
        
        draw(context, rows, days, cellw, cellh, margx, margy)

    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600"/>
}

export default HoursOfDarks





  


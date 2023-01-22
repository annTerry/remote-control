import { Point, Button, mouse } from "@nut-tree/nut-js";

export const drawAction = async function (command: string, arg:number[]):Promise<string> {
    console.log(arg);
switch (command) {
    case 'circle' : await drawCircle(arg[0]);
                    return `draw_circle_${arg[0]}`;                    
    case 'rectangle' : await drawRectangle(arg[0], arg[1]);
                    return `draw_rectangle_${arg[0]}_${arg[1]}`;                                           
    case 'square' : await drawRectangle(arg[0]);
                    return `draw_square_${arg[0]}`;                    
    default: return'wrong_data';
   }
}

const drawRectangle = async function(width: number, height = width) {
    console.log(width);
    console.log(height);
    const position:Point = await mouse.getPosition();
    await someDelay();
    const rectanglePoints:Point[] = [];
    rectanglePoints.push(new Point(position.x, position.y));
    rectanglePoints.push(new Point(position.x + width, position.y));
    rectanglePoints.push(new Point(position.x + width, position.y + height));
    rectanglePoints.push(new Point(position.x, position.y + height));
    rectanglePoints.push(new Point(position.x, position.y));
    await someDelay().then(()=>{drawFigure(rectanglePoints)});
}

const drawCircle = async function(radius: number) {
    const circlePoints:Point[] = [];
    const position:Point = await mouse.getPosition();                
    const maxPoints = radius * 2;
    for (let i=0; i < maxPoints; i++) circlePoints.push(setCirclePoint(position, radius, i));
    for (let i=maxPoints - 1; i>=0; i--) circlePoints.push(setCirclePoint(position, radius, i , 1)); 
    await someDelay().then(()=>{drawFigure(circlePoints, true)});
}

const setCirclePoint = function(position:Point, radius:number, index:number, sign = -1):Point {
    const x = - radius + index;
    const y = Math.round(Math.sqrt(radius ** 2 - x **2));
    const point = new Point(position.x + x, position.y + sign * y);    
    return point;
}

const drawFigure = async function(figurePoints:Point[], changePosition=false) {
    console.log(figurePoints.length);
    if (figurePoints.length > 1) {
      if (changePosition) {
        const firstPoint = figurePoints[0];
        await someDelay().then(()=>{mouse.setPosition(firstPoint)});
      }
      await mouse.pressButton(Button.LEFT); 
      for(const onePoint of figurePoints)       
       await someDelay().then(()=>{mouse.setPosition(onePoint)});
      await mouse.releaseButton(Button.LEFT);      
   }
}

const someDelay =async function(time = 10):Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
}
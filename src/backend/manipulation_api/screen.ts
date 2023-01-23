import { mouse, Point, screen, Region} from '@nut-tree/nut-js'; 
import Jimp from 'jimp';

export const getScreen = async function() {
    const position:Point = await mouse.getPosition();
    let [x,y,maxX,maxY]  = [position.x - 100, position.y - 100, 
                                                   position.x + 100, position.y + 100];
   const maxWidth = await screen.width();
   const maxHeight = await screen.height();
    x = x > 0 ? x : 1;                                                                                                      
    y = y > 0 ? y : 1;
    x = maxX > maxWidth ? maxWidth - 201 : x;
    y = maxY > maxHeight ? maxHeight - 201 : x;
    try {
    const screenRegion =  new Region(x, y, 200, 200); 
    const screenShot = await screen.grabRegion(screenRegion);
    const pngScreen = new Jimp(screenShot);
    if (pngScreen) {
      const buffer = await pngScreen.getBufferAsync(Jimp.MIME_PNG);
      return buffer.toString('base64');
    }
    else {
        return null;
    }
 }
 catch(e) {
    if (e instanceof Error) {
        console.log(e.message);
      }
    else {
        console.log('undefined error');
    }  
    return null;
 }
}
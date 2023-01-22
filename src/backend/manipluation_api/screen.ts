import { mouse, Point, screen, Region} from '@nut-tree/nut-js'; 
import Jimp from 'jimp';

export const getScreen = async function() {
    const position:Point = await mouse.getPosition();  
    const screenRegion =  new Region(position.x - 100, position.y - 100, 200, 200); 
    const screenShot = await screen.grabRegion(screenRegion);
    const pngScreen = new Jimp(screenShot);
    if (pngScreen) {
      const buffer = await pngScreen.getBufferAsync(Jimp.MIME_PNG);
      return buffer;
    }
    else {
        return null;
    }
}
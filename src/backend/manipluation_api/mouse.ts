import { mouse, left, right, up, down, Point} from '@nut-tree/nut-js'; 

export const mouseActions = async function(command:string, len:number):Promise<string> {
  switch (command) {
    case 'up' : await mouse.move(up(len));
                return `mouse_up to ${len}`
    case 'left' : await mouse.move(left(len));
                return `mouse_left to ${len}`
    case 'right' : await mouse.move(right(len));
                 return `mouse_right to ${len}` 
    case 'down' : await mouse.move(down(len));
                 return `mouse_down to ${len}` 
    case 'position': {
                      const position:Point = await mouse.getPosition();
                      return `mouse_position ${position.x},${position.y}`;
                      }                                                                       
    default: 
      return `wrong_data`;
   }

}
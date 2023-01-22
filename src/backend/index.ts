import { WebSocketServer } from 'ws';
import {mouseActions} from './manipluation_api/mouse'
import { drawAction } from './manipluation_api/draw';
import { getScreen } from './manipluation_api/screen';
import {parseCommandString} from './common/commandstring'
import {typeCommandString} from './common/constants'



export const webSocketServer = function(){

const wss = new WebSocketServer({ port: 8080 });
console.log("ws server on port 8080");

wss.on('connection', function connection(ws) {
  
  ws.on('message', function message(data) {
    console.log(`received:  ${data}`);
    const dataParsed:typeCommandString = parseCommandString(data.toString());
    if (dataParsed.action === 'prnt') {
      (async () => {
        const pngBuffer = await getScreen();
    if (pngBuffer != null) {
      console.log(`prnt_scrn ${pngBuffer}`);
      ws.send (`prnt_scrn ${pngBuffer}`);
    }
    else {
      console.log(`no_data`);
      ws.send (`no_data`);
    }    
  }
)();
    }
    
    if (dataParsed.action === 'mouse') {
        (async () => {
         const message = await mouseActions(dataParsed.command, dataParsed.args[0]);
         ws.send(message);
         console.log(message);
      })();
    }
    if (dataParsed.action === 'draw') {
      (async () => {
        const message = await drawAction(dataParsed.command, dataParsed.args);
        ws.send(message);
        console.log(message); 
    }  
    )();
    }
  });
  ws.send('connected');
});
}
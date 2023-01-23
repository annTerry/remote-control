import { WebSocketServer, createWebSocketStream } from 'ws';
import { EOL } from 'node:os';
import { mouseActions } from './manipulation_api/mouse'
import { drawAction } from './manipulation_api/draw';
import { getScreen } from './manipulation_api/screen';
import { parseCommandString } from './common/cs'
import { typeCommandString } from './common/constants'
import internal from 'node:stream';

export const webSocketServer = function () {

  let duplex: internal.Duplex | null;

  const wss = new WebSocketServer({ port: 8080 });
  console.log("ws server on port 8080");

  wss.on('connection', (ws) => {

    duplex = createWebSocketStream(ws, { defaultEncoding: 'utf-8', decodeStrings: false });

    duplex.on('data', (chunk) => {
      const data = chunk.toString('utf-8');
      if (data) {
        console.log(`received:  ${data}${EOL}`);
        const dataParsed: typeCommandString = parseCommandString(data.toString());
        if (dataParsed.action === 'prnt') {
          (async () => {
            const pngBuffer = await getScreen();
            if (pngBuffer != null) {
              console.log(`send: prnt_scrn data`);
              duplex?.write(`prnt_scrn ${pngBuffer}`);

            }
            else {
              console.log(`no_data`);
              duplex?.write(`send: no_data`);
            }
          }
          )();
        }

        if (dataParsed.action === 'mouse') {
          (async () => {
            const message = await mouseActions(dataParsed.command, dataParsed.args[0]);
            duplex?.write(message);
            console.log('send: ', message);
          })();
        }
        if (dataParsed.action === 'draw') {
          (async () => {
            const message = await drawAction(dataParsed.command, dataParsed.args);
            duplex?.write(message);
            console.log('send: ', message);
          }
          )();
        }
      }
    });

    ws.send('connected');
  });

  wss.on('close', () => {
    if (duplex !== null) duplex.destroy();
  })
} 
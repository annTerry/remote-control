import {httpServer} from "./http_server/index";
import {webSocketServer} from "./backend/index";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocketServer();

export const STATIC_PORT = 8181;
export const SOCKET_PORT = 8080;

export type typeCommandString = {action:string, command:string, args:number[]};
export type typeCommandStringFunction = (string:string) => typeCommandString;

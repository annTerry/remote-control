import { typeCommandStringFunction } from './constants';

export const parseCommandString: typeCommandStringFunction = function (data: string) {
  const result = { action: '', command: '', args: [0, 0] };
  const dataStr = data.toString().replace('_', ' ');
  let args:string[];
  [result.action, result.command, ...args] = dataStr.split(' ');
  result.args = args.map(e => isNaN(+e) ? 0 : +e );
  return result;
}
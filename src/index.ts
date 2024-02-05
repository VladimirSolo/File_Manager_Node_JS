import * as readline from 'readline';
import { inavidCommandMsg, username, welcomeMsg } from './utils';
import { changeDirectory, goUp } from './nwd';
import { listDirectoryContents } from './nwd/listDirectoryContents';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const startProgram = (): void => {
  welcomeMsg();

  rl.on('line', (input: string) => {
    const command: string[] = input.trim().split(' ');

    switch (command[0]) {
      case 'up':
        goUp();
        break;
      case 'cd':
        changeDirectory(command[1]);
        break;
      case 'ls':
        listDirectoryContents();
        break;
      case '.exit':
        rl.close();
      default:
        inavidCommandMsg();
        break;
    }
  }).on('close', (): void => {
    console.log(`\x1b[2m\x1b[31m\x1b[44mThank you for using File Manager, ${username ? username : 'No Name'}, goodbye!\x1b[0m`);
    process.exit();
  });
};

startProgram();

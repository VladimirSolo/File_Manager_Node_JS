import * as readline from 'readline';
import { invavidCommandMsg, username, welcomeMsg } from './utils';
import { changeDirectory, goUp , listDirectoryContents} from './nwd';
import { add, cat, copy, move, remove, rename } from './basic';

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
      case 'cat':
        cat(command[1]);
        break;
      case 'add':
        add(command[1]);
        break;
      case 'rm':
        if (command.length >= 3) {
          rename(command[1], command[2]);
        } else {
          invavidCommandMsg();
        }
        break;
      case 'cp':
        copy(command[1], command[2]);
        break;
      case 'mv':
        move(command[1], command[2]);
        break;
      case 'rm':
        remove(command[1]);
        break;
      case '.exit':
        rl.close();
      default:
        invavidCommandMsg();
        break;
    }
  }).on('close', (): void => {
    console.log(`\x1b[2m\x1b[31m\x1b[44mThank you for using File Manager, ${username ? username : 'No Name'}, goodbye!\x1b[0m`);
    process.exit();
  });
};

startProgram();

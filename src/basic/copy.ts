import * as fs from 'fs';
import * as path from 'path';
import { currentDirectory, invavidCommandMsg } from '../utils';

export const copy = async (sourcePath: string, destinationPath: string): Promise<void> => {
  try {
    // Check if the source file exists
    await fs.promises.access(sourcePath);

    // Check if the destination path is a directory
    const destinationStats = await fs.promises.stat(destinationPath);
    if (destinationStats.isDirectory()) {
      // If destination is a directory, append source file name to the destination path
      const fileName = path.basename(sourcePath);
      destinationPath = path.join(destinationPath, fileName);
    }

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);

      writeStream.on('close', resolve);
      writeStream.on('error', reject);
    });

    console.log('\x1b[32m%s\x1b[0m', 'File copied successfully.');
    currentDirectory();
  } catch (error: any) {
    console.log('\x1b[31m%s\x1b[0m', `Error copying file: ${error.message}`);
    invavidCommandMsg();
  }
};

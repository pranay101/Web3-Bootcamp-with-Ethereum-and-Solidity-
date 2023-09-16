import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for async file operations
import solc from 'solc';

const currentDir = process.cwd(); // Get the current working directory
const inboxPath = path.resolve(currentDir, 'contracts', 'Inbox.sol');

async function compileContract() {
  try {
    const source = await fs.readFile(inboxPath, 'utf-8');
    const compiled = solc.compile(source, 1);
    const contract = compiled.contracts[':Inbox'];
    return {
      abi: JSON.parse(contract.interface),
      bytecode: contract.bytecode,
    };
  } catch (error) {
    console.error('Error compiling contract:', error);
    throw error;
  }
}

export default compileContract;

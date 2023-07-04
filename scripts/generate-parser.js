import { promisify } from 'util';
import { exec } from 'child_process';

import packageInfo from '../package.json' assert { type: 'json'};

async function generateParser() {
  const execPromise = promisify(exec);
  
  process.chdir('./src/parser');

  // check antlr4 version
  let output
  try {
    output = await execPromise('antlr4', {shell: '/bin/bash'});
  } catch(e) {
    console.error('Missing antlr4 executable');
    process.exit(1);
  }

  const requiredVersion = packageInfo.dependencies.antlr4.match(/(\d+\.\d+\.\d+)/)[0]
  const installedVersion = output.stdout.match(/Version (\d+\.\d+\.\d+)/)[1];

  if (requiredVersion !== installedVersion) {
    console.error(`Error: antlr4 version mismatch, required: ${requiredVersion}, installed: ${installedVersion}`);
    process.exit(1);
  }

  // generate lexer
  try {
    await execPromise('antlr4 -Dlanguage=TypeScript LatexLexer.g4', {shell: '/bin/bash'});
  } catch(e) {
    console.error(`Error generating lexer: ${e}`);
    process.exit(1);
  }

  // generate parser
  try {
    await execPromise('antlr4 -Dlanguage=TypeScript -visitor -no-listener LatexParser.g4', {shell: '/bin/bash'});
    await execPromise("sed -i '1i// @ts-nocheck' LatexParserVisitor.ts", {shell: '/bin/bash'});
    await execPromise("sed -i '1i// @ts-nocheck' LatexParser.ts", {shell: '/bin/bash'});
  } catch(e) {
    console.error(`Error generating parser visitor: ${e}`);
    process.exit(1);
  }
}

generateParser();
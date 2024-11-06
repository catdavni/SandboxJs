import { spawn } from 'child_process';
import { patchMainToWebpack } from './packageJsonPatcher';
const env = { ...process.env, RUN_CONFIG: 'bare_webpack' };

const startWithRedirectedOutput = async (name: string, command: string): Promise<void> => {
  const splitCommands = command.split(' ');
  const process = spawn(splitCommands[0], splitCommands.slice(1), {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    env,
  });

  process.stdout.on('data', (data) => {
    console.log(`[${name}]`,`[INFO]`, data.toString());
  });

  process.stderr.on('data', (data) => {
    console.error(`[${name}]`,`[ERROR]`, data.toString());
  });

  return new Promise((resolve, reject) => {
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`[${name}] Process exited with code ${code}`));
      }
    });
  });
};

async function build() {
  console.log('Building the project...');
  await startWithRedirectedOutput('PRELOAD', 'npx webpack --config webpack.preload.config.ts');
  await startWithRedirectedOutput('RENDERER', 'npx webpack --config webpack.renderer.config.ts');
  await startWithRedirectedOutput('MAIN', 'npx webpack --config webpack.main.config.ts');
  console.log('Project built successfully');
}

(async function main() {
  // 0: node
  // 1: path to the script
  // 2: command
  // 3: rest of the arguments that are not handled by the script yet
  const command = process.argv.slice(2)[0];

  switch (command) {
    case 'build':
      await build();
      break;
    case 'watchMode':
      patchMainToWebpack();
      // we can use hot reload for renderer process
      void startWithRedirectedOutput('RENDERER', 'npx webpack serve --config webpack.renderer.config.ts');
      // we need to reload application on preload or main script changes as electron does not support hot reload for them
      void startWithRedirectedOutput('PRELOAD', 'npx webpack --config webpack.preload.config.ts --watch');
      void startWithRedirectedOutput('MAIN', 'npx webpack --config webpack.main.config.ts --watch');

      // wait for renderer process to start and port to be available
      await startWithRedirectedOutput('WAIT RENDERER', 'npx wait-on http://localhost:3333/');
      await startWithRedirectedOutput('FORGE', 'npx electron-forge start -- --remote-debugging-port=9223');
      break;

    default:
      console.log('Unknown command', command);
      break;
  }
})().catch(console.error);

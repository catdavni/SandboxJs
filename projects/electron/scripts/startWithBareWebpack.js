const { spawn } = require('node:child_process');
const env = { ...process.env, RUN_CONFIG: 'bare_webpack' };

const startWithRedirectedOutput = async (command, pipeStdIn) => {
  const splitCommands = command.split(' ');
  const process = spawn(splitCommands[0], splitCommands.slice(1), {
    stdio: [pipeStdIn ? 'pipe' : 'inherit', 'inherit', 'inherit'],
    shell: true,
    env,
  });
  return new Promise((resolve, reject) => {
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process ${command} exited with code ${code}`));
      }
    });
  });
};

(async function main() {
  // 0: node
  // 1: path to the script
  // 2: command
  // 3: rest of the arguments that are not handled by the script yet
  const command = process.argv.slice(2)[0];

  switch (command) {
    case 'build':
      console.log('Building the project...');
      await startWithRedirectedOutput('npx webpack --config webpack.preload.config.js');
      await startWithRedirectedOutput('npx webpack --config webpack.renderer.config.js');
      await startWithRedirectedOutput('npx webpack --config webpack.main.config.js');
      break;
    case 'serve':
      // we need to reload application on preload or main script changes as electron does not support hot reload for them
      void startWithRedirectedOutput('npx webpack --config webpack.preload.config.js --watch');
      void startWithRedirectedOutput('npx webpack --config webpack.main.config.js --watch');
      // we can use hot reload for renderer process
      void startWithRedirectedOutput('npx webpack serve --config webpack.renderer.config.js');
      // wait for renderer process to start and port to be available
      await startWithRedirectedOutput('npx wait-on http://localhost:3333/');
      await startWithRedirectedOutput('npx electron-forge start -- --remote-debugging-port=9223');
      break;

    default:
      console.log('Unknown command', command);
      break;
  }
})().catch(console.error);

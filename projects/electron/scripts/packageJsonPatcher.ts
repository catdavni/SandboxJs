import fs from 'fs';

export const patchMainToForge = () => {
  patchPackageJsonMain('.webpack/main/index.js');
};

export const patchMainToWebpack = () => {
  patchPackageJsonMain('dist/main/index.js');
}

const patchPackageJsonMain = (pathToEntryPoint: string) => {
  const filePath = './package.json';
  const content = fs.readFileSync(filePath, 'utf-8');
  const packageJson = JSON.parse(content);
  packageJson.main = pathToEntryPoint;
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
};

if(process.argv[2] === 'forge') {
  patchMainToForge();
}else {
  console.error('Unknown command', process.argv[2]);
}
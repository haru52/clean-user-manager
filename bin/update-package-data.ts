import fs from 'fs';
import path from 'path';
import PackageData from 'data/package-data.json';
import PackageJson from '../package.json';

const packageData: typeof PackageData = {
  name: PackageJson.name.split('/')[1], // Remove the @haru52/ scope
  description: PackageJson.description,
  version: PackageJson.version,
};

const packageDataPath = path.resolve(
  __dirname,
  '../src/data/package-data.json'
);
const packageDataStr = JSON.stringify(packageData);
fs.writeFileSync(packageDataPath, packageDataStr);

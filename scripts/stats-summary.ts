/* eslint-disable no-console */
import fs from 'fs/promises';
import { StatsFile } from './stats-types';

async function main() {
  const stats: StatsFile = JSON.parse(await fs.readFile('stats.json', 'utf-8'));
  const summary = stats.assets.reduce((acc, asset) => {
    acc[asset.name] = asset.size;
    return acc;
  }, {} as Record<string, number>);
  await fs.writeFile('stats-summary.json', JSON.stringify(summary));
}

main().catch((e) => {
  console.error('Error occurred on summary proccess: ', e);
  process.exit(1);
});

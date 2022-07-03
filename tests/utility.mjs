import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

import pixelmatch from 'pixelmatch';

const screenshotDir = "./tests/images";

export function compareImages(file1, file2) {
  const img1 = PNG.sync.read(fs.readFileSync(path.join(screenshotDir, file1)));
  const img2 = PNG.sync.read(fs.readFileSync(path.join(screenshotDir, file2)));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  const diffOutBuffer = PNG.sync.write(diff);
  const file1Path = path.parse(file1);
  fs.writeFileSync(path.join(screenshotDir, `${file1Path.name}_diff.png`), diffOutBuffer);

  return numDiffPixels;
}

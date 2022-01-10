const { loadImage } = require('canvas');
const { openCV } = require('../openCV');
const path = require('path');
const { moravec } = require('../lab6/moravec');
const { harris } = require('../lab6/harris');
const { fast } = require('../lab6/fast');

(async () => {
  await openCV();
  const image = await loadImage(path.join(__dirname, '/tetra.png'));
  const src = cv.imread(image);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

  moravec(src);
  harris(src);
  fast(src);
})();

const { outputImg } = require('../openCV');
const { FAST_THRESHOLD } = require('../lab6/models');

function fast(src) {
    let fast = new cv.FastFeatureDetector(FAST_THRESHOLD);
    let keyPoints = new cv.KeyPointVector();
    fast.detect(src, keyPoints);
    let img = new cv.Mat();
    cv.drawKeypoints(src, keyPoints, img, [255, 0, 0, 0]);
    
    outputImg(img, 'fast');
}

module.exports = { fast };
const { outputImg } = require('../openCV');
const { getScrPxl } = require('../lab6/extentions');

function harris(src) {
    let harris = new cv.Mat();
    cv.cornerHarris(src, harris, 2, 3, 0.04);
    cv.normalize(harris, harris, 0, 255, cv.NORM_MINMAX);
    cv.dilate(harris, harris, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(10, 10)));
    harris.convertTo(harris, 0);
    const maxHarris = cv.minMaxLoc(harris).maxVal;

    let harrisOutput = src.clone();
    for (let i = 0; i < harris.rows; i++) {
        for (let j = 0; j < harris.cols; j++) {
            if (getScrPxl(harris, i, j) > 0.45 * maxHarris) {
                cv.circle(harrisOutput, new cv.Point(j, i), 1, [0, 0, 0, 0], 1);
            }
        }
    }
    outputImg(harrisOutput, 'harris');
}

module.exports = { harris };
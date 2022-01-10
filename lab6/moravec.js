const { getTopMinForCurrentPxl, getLocalPxls } = require('../lab6/extentions');
const { MORAVEC_THRESHOLD } = require('../lab6/models');
const { outputImg } = require('../openCV');

function moravec(src){
    let detectorArr = [];
    const topSize = 5;
    for (let i = 0; i < src.rows; i++) {
    let row = [];
    for (let j = 0; j < src.cols; j++) {
        const currentPixelMinimum = getTopMinForCurrentPxl(src, i, j, topSize);
        row.push(currentPixelMinimum > MORAVEC_THRESHOLD ? currentPixelMinimum : 0);
    }

    detectorArr.push(row);
    }

    let moravec = src.clone();

    detectorArr.forEach((row, i) =>
        row.forEach((pxl, j) => {
            if (pxl !== 0) {
            const max = Math.max.apply(null, getLocalPxls(detectorArr, i, j, 31));
            if (pxl === max)
                cv.circle(moravec, new cv.Point(j, i), 5, [0, 0, 0, 0], 1);
            }
        })
    );

    outputImg(moravec, 'moravec');
}

module.exports = { moravec };
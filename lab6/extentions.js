function getScrPxl(matrix, i, j) {
    const isArray = Array.isArray(matrix);
    return i < 0 || j < 0 || (!isArray && (i >= matrix.rows || j >= matrix.cols)) || (isArray && (i >= matrix.length || j >= matrix[0].length)) 
            ? 255 : isArray 
            ? matrix[i][j] 
            : matrix.ucharPtr(i, j)[0];
  }
  
  function getTopMinForCurrentPxl(matrix, i, j, topSize) {
    const coeff = (topSize - 1) / 2;
    const shifts = [
        [0, -1]
      , [0, 1]
      , [-1, 0]
      , [1, 0]
      , [-1, -1]
      , [1, -1]
      , [1, 1]
      , [-1, 1]
    ];
    const min = Math.min.apply(null, shifts.map((shift) => {
      let sum = 0;
      for (let is = i - coeff + shift[1]; is <= i + coeff + shift[1]; is++)
        for (let js = j - coeff + shift[0]; js <= j + coeff + shift[0]; js++)
          sum += Math.pow(getScrPxl(matrix, is, js) - getScrPxl(matrix, i, j), 2);
      
      return sum;
    }));
    
    return min;
  }
  
  function getLocalPxls(matrix, i, j, topSize) {
    const coeff = (topSize - 1) / 2;
    let array = [];
    for (let is = i - coeff; is <= i + coeff; is++)
      for (let js = j - coeff; js <= j + coeff; js++)
        array.push(getScrPxl(matrix, is, js));
  
    return array;
  }

module.exports = { getScrPxl, getTopMinForCurrentPxl, getLocalPxls };
const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const getMines = (row, index, element) => {
    let mineCount = 0;
    if(row){
      if(row[index - 1]) { mineCount++; }
      if(row[index] && element !== undefined) { mineCount++; }
      if(row[index + 1]) { mineCount++; }
    }
    return mineCount;
  }

  return matrix.reduce((accumulator, currentRow, index, arr) => {
    const prevRow = arr[index - 1];
    const nextRow = arr[index + 1];
    const minesInRow = [];
    
    currentRow.forEach((element, index) => {
      let mineCount = 0;
      mineCount += getMines(prevRow, index, element);
      mineCount += getMines(currentRow, index);
      mineCount += getMines(nextRow, index, element);
      minesInRow.push(mineCount);
    });

    accumulator.push(minesInRow);
    return accumulator;
  }, []);
}

module.exports = {
  minesweeper
};

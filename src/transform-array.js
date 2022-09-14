const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if(!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const DISCARD_NEXT = "--discard-next";
  const DISCARD_PREV = "--discard-prev";
  const DOUBLE_NEXT = "--double-next";
  const DOUBLE_PREV = "--double-prev";

  let result = [];

  for(let i = 0; i < arr.length; i++) {
    switch(arr[i]) {
      case DISCARD_NEXT:
        i++;
        break;
      case DISCARD_PREV:
        if(arr[i - 2] !== DISCARD_NEXT) {
          result.pop();
        }
        break;
      case DOUBLE_NEXT:
        if(arr[i + 1] !== undefined) {
          result.push(arr[i + 1]);
        }
        break;
      case DOUBLE_PREV:
        if(arr[i - 1] !== undefined && arr[i - 2] !== DISCARD_NEXT) {
          result.push(arr[i - 1]);
        }
        break;
      default: 
        result.push(arr[i]);
    }
  }
  
  return result;
}

module.exports = {
  transform
};

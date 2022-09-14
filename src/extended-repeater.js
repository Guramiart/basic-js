const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const separator = options.separator ?? '+';
  let addition = '';
  if(options.addition === null) {
    addition = 'null';
  } else {
    addition = options.addition ?? '';
  }
  const additionSeparator = options.additionSeparator ?? '|';
  const repeat = options.repeatTimes ?? 1;
  const additionRepeat = options.additionRepeatTimes ?? 1;

  let adds = [];
  for(let i = 0; i < additionRepeat; i++) {
    adds.push(addition);
  }
  let addsStr = adds.join(additionSeparator);

  let args = [];
  for(let i = 0; i < repeat; i++) {
    args.push(str + addsStr);
  }
  return args.join(separator);
}

module.exports = {
  repeater
};

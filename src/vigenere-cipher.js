const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
 
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.square = this.initSquare();
  }

  initSquare() {
    const alphabet = this.alphabet;
    let resultSquare = [];
    for(let i = 0; i < alphabet.length; i++) {
      resultSquare.push(alphabet.slice(i).concat(alphabet.slice(0, i))); 
    }
    return resultSquare;
  }

  encrypt(message, key) {
    return this.cryptAction(message, key, true);
  }

  decrypt(message, key) {
    return this.cryptAction(message, key, false);
  }

  cryptAction(message, key, action) {
    if(!message || !key) {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    while (key.length < message.length) {
      key += key;
    }

    let cryptResult = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (message[i] !== ' ' && this.alphabet.includes(message[i])) {
        if (action) {
          cryptResult += this.square[this.alphabet.indexOf(message[i])][this.alphabet.indexOf(key[keyIndex])];
        } else {
          cryptResult += this.alphabet[this.square[this.alphabet.indexOf(key[keyIndex])].indexOf(message[i])];
        }
        keyIndex++;
      } else {
        cryptResult += message[i];
      }
    }
   
    if (!this.isDirect) {
      return cryptResult.split('').reverse().join('');
    }

    return cryptResult;
  }
}

module.exports = {
  VigenereCipheringMachine
};

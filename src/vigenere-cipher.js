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
    this.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.ASCII_LETTER_NUM = 65;
    this.ALPHABET_CHAR_COUNT = 26;
  }

  encrypt(message, key) {
    this.checkArgs(message, key);
    return this.cryptAction(message, key, true);
  }

  decrypt(message, key) {
    this.checkArgs(message, key);
    return this.cryptAction(message, key, false);
  }

  checkArgs(message, key) {
    if(!message || !key) {
      throw new Error("Incorrect arguments!");
    }
  }

  cryptAction(message, key, isEncrypt) {
  
    while (key.length < message.length) {
      key += key;
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    message.split('').forEach((el, i) => {
      if(el !== ' ' && this.ALPHABET.includes(el)) {
        if(isEncrypt) {
          result += String.fromCharCode(
            (((message.charCodeAt(i) + key.charCodeAt(keyIndex)) - 2 * this.ASCII_LETTER_NUM) % this.ALPHABET_CHAR_COUNT) + this.ASCII_LETTER_NUM);
        } else {
          result += String.fromCharCode(
            (((message.charCodeAt(i) - key.charCodeAt(keyIndex)) + this.ALPHABET_CHAR_COUNT) % this.ALPHABET_CHAR_COUNT) + this.ASCII_LETTER_NUM);
        }
        keyIndex++;
      } else {
        result += el;
      }
    });

    if (!this.isDirect) {
      return result.split('').reverse().join('');
    }
    return result;
  }
}

module.exports = {
  VigenereCipheringMachine
};

const { createReadStream } = require('fs');
const readline = require('readline');

/**
 * Tests the password.
 * @param {String} password The tested password.
 * @param {String} policy The password policy.
 * @returns {boolean}
 */
const test = (password, policy) => {
  const [range, symbol] = policy.split(' ');
  const [min, max] = range.split('-').map(Number);

  let counter = 0;

  for (const c of password) {
    if (c === symbol) counter++;
    if (counter > max) return false;
  }

  return counter >= min;
};

const rl = readline.createInterface({
  input: createReadStream('input.txt'),
  crlfDelay: Infinity,
});

let validPasswordsAmount = 0;

rl
  .on('line', (line) => {
    const [policy, password] = line.split(':').map(s => s.trim());
    if (test(password, policy)) {
      validPasswordsAmount++;
    }
  })
  .once('close', () => {
    console.log('Answer:', validPasswordsAmount);
  });

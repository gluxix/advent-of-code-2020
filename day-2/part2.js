const { createReadStream } = require('fs');
const readline = require('readline');

/**
 * Tests the password.
 * @param {String} password The tested password.
 * @param {String} policy The password policy.
 * @returns {boolean}
 */
const test = (password, policy) => {
  const [positions, symbol] = policy.split(' ');
  const [first, second] = positions.split('-').map(n => Number(n) - 1);

  return (password.charAt(first) === symbol ? 1 : 0) + (password.charAt(second) === symbol ? 1 : 0) === 1;
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

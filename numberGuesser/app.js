/**
 * game function
 * -player must guess a number between a min and max
 * - player gets a certain amount of guesses
 * - Notify player of guesses remaining
 * - Notify Player of the correct answer if loose
 * - Let Player choose to play again
 */

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

//ui element

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})
//listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(NaN) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN !!!`);

  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //game over lost
      gameOver(false, `Game Over, YOU LOST !!!!, the correct number was ${winningNum}`);
    } else {
      //GAME continues - answer wrong
      guessInput.style.borderColor = 'red'
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
})

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color = won ? 'green' : 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color
  setMessage(msg, color);

  //play again 
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
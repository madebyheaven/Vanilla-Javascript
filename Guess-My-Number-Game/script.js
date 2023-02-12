'use strict';

//get score through dom will cause error as it will fetch the score before the game starts and will not update the score
// let getScore = document.querySelector('.score').textContent;
let getScore = 20; //can assign value here also
let highscore = 0;

//generate random number between 1 to 20 using Math.random() and Math trunc removes decimal
let number = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = number;

//display message function
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//check button logic
console.log(number);
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //!guess means when guess is 0, it will be false as 0 is falsy value

  //when there is no number
  if (!guess) {
    displayMessage('⛔ No number!');

    //when player wins
  } else if (guess === number) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = number;
    if (getScore > highscore) {
      highscore = getScore;
      document.querySelector('.highscore').textContent = highscore;
    }

    //when guess !== number
  } else if (guess !== number) {
    if (getScore > 1) {
      displayMessage(guess > number ? '📈 Too high!' : '📉 Too low!');

      if (
        (guess > number - 3 && guess <= number - 1) ||
        (guess > number && guess <= number + 3)
      ) {
        displayMessage('👀 you are close to the number');
      } else {
        getScore--;
      }
      document.querySelector('.score').textContent = getScore;
    } else {
      displayMessage('👎 You lost the game');
      document.querySelector('.score').textContent = 0;
    }
  }
});

//again button

document.querySelector('.again').addEventListener('click', function () {
  // const fetchscore = getScore;
  // let getScore = document.querySelector('.score').textContent;
  getScore = 20;
  console.log(getScore);
  number = Math.trunc(Math.random() * 20) + 1;
  console.log(number);
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  //reset highscore
  if (getScore === highscore) {
    console.log(`${getScore} is equal to ${highscore}`);
    document.querySelector('.highscore').textContent = 0;
  }
});

'use strict';
// Selecting elements
const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');

const score0E = document.getElementById('score--0');
const score1E = document.getElementById('score--1');

const current0E = document.getElementById('current--0');
const current1E = document.getElementById('current--1');

const diceE = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

///////////////// Starting conditions

//global variables
let playing, currentScore, totalScore, activePlayer, scores;

//initalizing game
const init = function () {
  score0E.textContent = 0;
  score1E.textContent = 0;

  current0E.textContent = 0;
  current1E.textContent = 0;

  diceE.classList.add('hidden');
  player0E.classList.add('player--active');
  player1E.classList.remove('player--active');

  playing = true;
  currentScore = 0;
  totalScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  //added at end
  player0E.classList.remove('player--winner');
  player1E.classList.remove('player--winner');
  // party.classList.add('hidden');

  //remove the emojis
  const emojis = document.querySelectorAll('.display-emoji');
  for (let i = 0; i < emojis.length; i++) {
    emojis[i].remove();
  }
};

init();

///////// Switching players
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(`active player: ${activePlayer}`);

  // toggle active player
  player0E.classList.toggle('player--active');
  player1E.classList.toggle('player--active');
}
/////////

///////// Show the status
const showthestatus = function (message) {
  const scoretracker = document.getElementById(`score--${activePlayer}`);
  const div = document.createElement('div');
  div.classList.add('name');
  div.textContent = message;
  scoretracker.append(div);
};

////////// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const diceroll = Math.trunc(Math.random() * 6 + 1);
    console.log(diceroll);

    //2. Display dice

    diceE.classList.remove('hidden');
    diceE.src = `dice-${diceroll}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (diceroll != 1) {
      currentScore += diceroll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//////////

///////// Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      diceE.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //add party emoji
      emojimaker();
      // show the win message
      showthestatus('Winner');

      switchPlayer();

      //show the lose message
      showthestatus('Loser');

      //Finish the game
      playing = false;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});
/////////

//////reset game functionality

btnNew.addEventListener('click', init);

//creating a div element

//this is the function that creates the emojis by dynamically creating divs and appending them to the player div
const emojimaker = function () {
  //generate 10 emojis
  const numEmojis = 10;
  const container = document.querySelector(`.player--${activePlayer}`);
  //create the divs
  for (let i = 0; i < numEmojis; i++) {
    const emoji = document.createElement('div');
    emoji.classList.add('display-emoji');
    emoji.textContent = '🎉';
    container.appendChild(emoji);
  }

  //move the emojis
  const emojis = document.querySelectorAll('.display-emoji');
  const containerRect = container.getBoundingClientRect();
  for (let i = 0; i < emojis.length; i++) {
    const emojicoor = emojis[i];
    let x = 0; //this is the x coordinate
    if (activePlayer === 0) {
      //if the active player is 0, then the x coordinate is between 0 and the width of the container
      x = Math.random() * containerRect.width; //this is the width of the container
    } else if (activePlayer === 1) {
      //if the active player is 1, then the x coordinate is between the width of the container and the width of the container plus 400
      x =
        Math.random() * (containerRect.width / 2) +
        containerRect.width / 2 +
        400;
    }

    //this is the y coordinate
    const y = Math.random() * containerRect.height;

    //set the coordinates of the emoji
    emojicoor.style.left = x + 'px';
    emojicoor.style.top = y + 'px';
  }
};

'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialization();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayers();
    }
  }
});

//Holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayers();
    }
  }
});

//New game functionality
btnNew.addEventListener('click', initialization);

// The following code exists so parcel doesn't delete the images because they arent beign used initially
const hiddenImageMarkup = `
<div class="hidden">
<img src="./dice-1.png"/>
<img src="./dice-2.png"/>
<img src="./dice-3.png"/>
<img src="./dice-4.png"/>
<img src="./dice-5.png"/>
<img src="./dice-6.png"/>
</div>
`
btnHold.insertAdjacentHTML("afterend", hiddenImageMarkup)
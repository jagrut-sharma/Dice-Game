'use strict';

const diceImage = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const currScore = document.querySelectorAll('.current-score');
const player = document.querySelectorAll('.player');
const mainScore = document.querySelectorAll('.score');

const diceGenerator = function () {
  return Math.floor(Math.random() * 6) + 1;
};

let score = 0,
  currPlayer = 0,
  totalScore = [0, 0];

const toggleActivePlayer = function () {
  for (let currentPlayer of player) {
    currentPlayer.classList.toggle('player--active');
  }
  score = 0;
  currScore[currPlayer].innerText = score;
  currPlayer = currPlayer === 0 ? 1 : 0;
};

const checkScore = function () {
  if (totalScore[currPlayer] < 100) {
    return true;
  }
  return false;
};
const declareWinner = function () {
  player[currPlayer].classList.add('player--winner');
  holdBtn.disabled = true;
  rollBtn.disabled = true;
  diceImage.classList.add('hidden');
};

rollBtn.addEventListener('click', function () {
  const numberRolled = diceGenerator();
  diceImage.src = `./dice-${numberRolled}.png`;
  diceImage.classList.remove('hidden');

  console.log(
    `currPlayer: ${currPlayer}, totalScore: ${totalScore[currPlayer]}, score: ${
      numberRolled === 1 ? score : score + numberRolled
    }`
  );

  // Adding the if-else logic for 1
  if (numberRolled === 1) {
    toggleActivePlayer();
  } else {
    score += numberRolled;
    currScore[currPlayer].innerText = score;
  }
});

holdBtn.addEventListener('click', function () {
  totalScore[currPlayer] += score;
  mainScore[currPlayer].innerText = totalScore[currPlayer];
  if (!checkScore()) {
    declareWinner();
  } else {
    toggleActivePlayer();
  }
});

newBtn.addEventListener('click', function () {
  // location.reload();
  holdBtn.disabled = false;
  rollBtn.disabled = false;
  player[currPlayer].classList.remove('player--winner');
  for (let index = 0; index < mainScore.length; index++) {
    mainScore[index].innerText = 0;
    currScore[index].innerText = 0;
  }
  player[0].classList.add('player--active');
  player[1].classList.remove('player--active');
  score = 0;
  currPlayer = 0;
  totalScore = [0, 0];
});

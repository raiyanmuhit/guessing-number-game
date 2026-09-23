let num;
let count;
const maxTries = 5;
let gameOver;

function validateInput(input) {
  if (parseInt(input.value) > 100) {
    input.value = 100;
  } else if (parseInt(input.value) < 1) {
    input.value = 1;
  }
}

function updateTriesDisplay() {
  const triesLeft = maxTries - count + 1;
  const triesEl = document.getElementById('triesCounter');
  triesEl.innerText = gameOver ? `Tries Left: 0` : `Tries Left: ${triesLeft}`;
}

function initGame() {
  num = Math.floor(Math.random() * 100) + 1;
  count = 1;
  gameOver = false;
  
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('message').innerText = '';
  document.getElementById('restartBtn').style.display = 'none';
  
  updateTriesDisplay();
}

function checkGuess() {
  if (gameOver) return;

  const inputEl = document.getElementById('guessInput');
  const messageEl = document.getElementById('message');
  const guess = parseInt(inputEl.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    messageEl.innerText = "Please enter a valid number between 1 and 100!";
    return;
  }

  if (guess === num && count <= maxTries) {
    messageEl.innerHTML = `Yaaaaaaaaay! You won!!!<br>You Tried ${count} times to WIN!`;
    endGame();
  } else if (guess < num) {
    if (count >= maxTries) {
      messageEl.innerText = "U R a Dumbass than a S##T!";
      endGame();
    } else {
      messageEl.innerText = "WTF, Bro!? It's too low...";
      count++;
    }
  } else if (guess > num) {
    if (count >= maxTries) {
      messageEl.innerText = "U R a Dumbass than a S##T!";
      endGame();
    } else {
      messageEl.innerText = "Ugh, It's Too High!";
      count++;
    }
  }

  updateTriesDisplay();
}

function endGame() {
  gameOver = true;
  document.getElementById('guessInput').disabled = true;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('restartBtn').style.display = 'block';
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    toggleBtn.innerText = '🌙 Dark Mode';
  } else {
    toggleBtn.innerText = '☀️ Light Mode';
  }
}

document.getElementById('guessInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

initGame();
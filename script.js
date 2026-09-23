let num;
let count;
let gameOver;

function initGame() {
  num = Math.floor(Math.random() * 100) + 1;
  count = 1;
  gameOver = false;
  
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('message').innerText = '';
  document.getElementById('restartBtn').style.display = 'none';
}

function checkGuess() {
  if (gameOver) return;

  const inputEl = document.getElementById('guessInput');
  const messageEl = document.getElementById('message');
  const guess = parseInt(inputEl.value);

  if (isNaN(guess)) {
    messageEl.innerText = "Please enter a valid number!";
    return;
  }

  if (guess === num && count <= 5) {
    messageEl.innerHTML = `Yaaaaaaaaay! You won!!!<br>You Tried ${count} times to WIN!`;
    endGame();
  } else if (guess < num) {
    if (count >= 5) {
      messageEl.innerText = "U R a Dumbass than a S##T!";
      endGame();
    } else {
      messageEl.innerText = "WTF, Bro!? It's too low...";
      count++;
    }
  } else if (guess > num) {
    if (count >= 5) {
      messageEl.innerText = "U R a Dumbass than a S##T!";
      endGame();
    } else {
      messageEl.innerText = "Ugh, It's Too High!";
      count++;
    }
  }
}

function endGame() {
  gameOver = true;
  document.getElementById('guessInput').disabled = true;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('restartBtn').style.display = 'block';
}

document.getElementById('guessInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

initGame();
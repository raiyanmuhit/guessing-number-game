let num;
let count;
const maxTries = 5;
let gameOver;
let currentLang = 'en';

// Translations Dictionary
const translations = {
  en: {
    title: "WELCOME TO GUESSING NUMBER GAME",
    subtitle: "Guess a Number Between 1 - 100",
    tries: "Tries Left:",
    placeholder: "Please, Enter your number:",
    submit: "Submit",
    playAgain: "Play Again",
    footer: "Made By R3, Do not copy this project",
    invalidInput: "Please enter a valid number between 1 and 100!",
    win: (tries) => `Yaaaaaaaaay! You won!!!<br>You Tried ${tries} times to WIN!`,
    tooLow: "WTF, Bro!? It's too low...",
    tooHigh: "Ugh, It's Too High!",
    loss: "U R a Dumbass than a S##T!"
  },
  bn: {
    title: "সংখ্যা অনুমানের খেলায় স্বাগতম",
    subtitle: "১ থেকে ১০০ এর মধ্যে একটি সংখ্যা অনুমান করুন",
    tries: "অবশিষ্ট চেষ্টা:",
    placeholder: "অনুগ্রহ করে আপনার সংখ্যাটি লিখুন:",
    submit: "জমা দিন",
    playAgain: "আবার খেলুন",
    footer: "R3 দ্বারা নির্মিত, এই প্রজেক্ট কপি করবেন না",
    invalidInput: "অনুগ্রহ করে ১ থেকে ১০০ এর মধ্যে একটি বৈধ সংখ্যা লিখুন!",
    win: (tries) => `ইয়াহাহাহায়! আপনি জিতেছেন!!!<br>আপনি জেতার জন্য ${tries} বার চেষ্টা করেছেন!`,
    tooLow: "আরে ভাই! এটা অনেক কম...",
    tooHigh: "উফ, এটা অনেক বেশি!",
    loss: "আপনি হার মেনেছেন! আবার চেষ্টা করুন!"
  }
};

function validateInput(input) {
  if (parseInt(input.value) > 100) {
    input.value = 100;
  } else if (parseInt(input.value) < 1) {
    input.value = 1;
  }
}

function updateTriesDisplay() {
  const triesLeft = maxTries - count + 1;
  const currentTries = gameOver ? 0 : triesLeft;
  const triesEl = document.getElementById('triesCounter');
  
  const langText = translations[currentLang].tries;
  triesEl.innerText = `${langText} ${currentTries}`;

  // Update Color based on Tries Count
  triesEl.className = 'tries-counter';
  triesEl.classList.add(`tries-${currentTries}`);
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

function triggerShake() {
  const card = document.getElementById('gameCard');
  card.classList.remove('shake');
  void card.offsetWidth; // Trigger reflow to restart CSS animation
  card.classList.add('shake');
}

function checkGuess() {
  if (gameOver) return;

  const inputEl = document.getElementById('guessInput');
  const messageEl = document.getElementById('message');
  const guess = parseInt(inputEl.value);
  const t = translations[currentLang];

  if (isNaN(guess) || guess < 1 || guess > 100) {
    messageEl.innerText = t.invalidInput;
    triggerShake();
    return;
  }

  if (guess === num && count <= maxTries) {
    messageEl.innerHTML = t.win(count);
    endGame();
  } else {
    // Wrong answer behavior
    triggerShake();

    if (guess < num) {
      if (count >= maxTries) {
        messageEl.innerText = t.loss;
        endGame();
      } else {
        messageEl.innerText = t.tooLow;
        count++;
      }
    } else if (guess > num) {
      if (count >= maxTries) {
        messageEl.innerText = t.loss;
        endGame();
      } else {
        messageEl.innerText = t.tooHigh;
        count++;
      }
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

/* Theme Handling with Persistence & OS Preferences */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // If saved preference exists, use it. Otherwise, follow system preference.
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-theme');
    themeToggle.checked = false;
  }
}

function toggleTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle.checked) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
}

/* Language Toggle Handling */
function toggleLanguage() {
  const langToggle = document.getElementById('langToggle');
  currentLang = langToggle.checked ? 'bn' : 'en';
  applyLanguage();
}

function applyLanguage() {
  const t = translations[currentLang];
  document.getElementById('titleText').innerText = t.title;
  document.getElementById('subtitleText').innerText = t.subtitle;
  document.getElementById('guessInput').placeholder = t.placeholder;
  document.getElementById('submitBtn').innerText = t.submit;
  document.getElementById('restartBtn').innerText = t.playAgain;
  document.getElementById('footerText').innerText = t.footer;
  updateTriesDisplay();
}

document.getElementById('guessInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

// Initialize on load
initTheme();
initGame();
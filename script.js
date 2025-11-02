const startBtn = document.getElementById("start-btn");
const storySection = document.getElementById("story-section");
const gameSection = document.getElementById("game-section");
const chooseSection = document.getElementById("choose-section");
const timeDisplay = document.getElementById("time-remaining");
const flipsDisplay = document.getElementById("flips");
const hintLog = document.getElementById("hint-log");
const restartBtn = document.getElementById("restart-btn");
const suspectButtons = document.querySelectorAll(".suspect-btn");
const cardContainer = document.getElementById("card-container");
const correctMurderer = "👧 The Orphan";

let candies = 0;
let time = 45;
let flips = 0;
let timer;
let matchedCards = [];
let firstCard = null;
let lockBoard = false;

// 🎲 Fisher-Yates shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start game
startBtn.addEventListener("click", () => {
  storySection.classList.add("hidden");
  gameSection.classList.remove("hidden");

  // 🎃 Shuffle cards before starting
  shuffleCards();

  // Start timer
  startTimer();
});

// ⏰ Timer logic
function startTimer() {
  timeDisplay.textContent = time;
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// 🧠 Shuffle the cards inside the container
function shuffleCards() {
  const cards = Array.from(cardContainer.children);
  shuffle(cards);
  cards.forEach((card) => {
    // Reset card states
    card.classList.remove("visible");
    cardContainer.appendChild(card);
  });
}

// 🃏 Flip logic
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("visible")) return;
    card.classList.add("visible");
    flips++;
    flipsDisplay.textContent = flips;

    if (!firstCard) {
      firstCard = card;
    } else {
      checkMatch(firstCard, card);
      firstCard = null;
    }
  });
});

// ✅ Check if two cards match
function checkMatch(card1, card2) {
  if (
    card1.querySelector(".card-value").src ===
    card2.querySelector(".card-value").src
  ) {
    matchedCards.push(card1, card2);
    addHint(card1.dataset.hint, card1.querySelector(".card-value").src);
    if (matchedCards.length === document.querySelectorAll(".card").length) {
      endGame(true);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      lockBoard = false;
    }, 800);
  }
}

// 🕵️ Add hint to Detective Log
function addHint(hint, imageSrc) {
  const li = document.createElement("li");
  li.classList.add("clue-item");

  // Create the image
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Clue Image";
  img.classList.add("clue-image");

  // Create the text
  const text = document.createElement("span");
  text.textContent = `🕵️ You found a clue: ${hint}`;

  // Append image first, then text
  li.appendChild(img);
  li.appendChild(text);

  hintLog.appendChild(li);
}

// 🔚 End game
function endGame(victory = false) {
  clearInterval(timer);
  gameSection.classList.add("hidden");
  chooseSection.classList.remove("hidden");

  const li = document.createElement("li");
  li.textContent = victory
    ? "All clues found! Time to make your final deduction..."
    : "Time’s up! Use what you found to guess.";
  hintLog.appendChild(li);
}

suspectButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const accused = btn.textContent.trim();
    const li = document.createElement("li");
    li.classList.add("accuse-item");

    // Accusation text
    const text = document.createElement("span");
    text.textContent = `⚖️ You accused ${accused}!`;

    // Result check
    const result = document.createElement("strong");
    if (accused === correctMurderer) {
      result.textContent = " ✅ Correct! You solved the mystery!";
      li.classList.add("correct");
      candies++;
    } else {
      result.textContent = " ❌ Wrong! The real murderer escaped...";
      li.classList.add("wrong");
    }
    candies += Math.floor(matchedCards.length / 4);
    const candyHtml = document.createElement("span");
    candyHtml.textContent = "You get " + candies + " candies. Congratulations!";

    // Append both
    li.appendChild(text);
    li.appendChild(result);
    li.appendChild(candyHtml);

    hintLog.appendChild(li);
  });
});

// 🔁 Restart button
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

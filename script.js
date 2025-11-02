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
    restartBtn.style.display = "block";

    const explanation = document.createElement("span");
    if (accused == "👧 The Orphan") {
      explanation.textContent =
        "Lily worked at the clinic with Dr. Winky, who secretly knew she was the daughter of a wealthy woman who abandoned her as a baby. He hid the truth to “protect her from pain,” but really feared the mother’s power and the scandal it would bring. One day Lily overheard the mother’s name mentioned in old patient files and realized the truth — she wasn’t an orphan by fate, but by rejection. Hurt and furious, she confronted her mother, who coldly denied her. Devastated and terrified of being abandoned again, Lily used the clinic’s rare floral poison to slowly kill her, paying the grave keeper to prepare a burial early so her mother could never leave her again. The dried tears on the victim, the “DONT LEAVE ME” carved on the tree, the cash with the grave digger, and the locket holding the doctor’s image reveal a broken girl who killed not out of hatred, but out of desperate, painful longing for the love she was never given.";
    } else if (accused == "💀 The Grave Keeper") {
      explanation.textContent =
        "The grave digger, Mr. Frank, was not part of the murder — he simply dug a grave early because the fortune teller paid him, believing in a dark prediction that she herself was going to die soon. She wanted her grave ready in advance, and that is why a large stack of cash was found on the grave digger. This detail makes the scene look suspicious at first, but in reality it has nothing to do with the killing. His only role was preparing a grave for someone who feared her own fate, unknowingly creating a coincidence that confused the investigation.";
    } else if (accused == "🧙‍♂️ Dr. Winky") {
      explanation.textContent =
        "Although the clues seem to point to the doctor because he identified the rare floral poison, and only him worked at the clinic, and quietly looked after Lily, he is not the murderer. The doctor kept Lily's true parentage secret only to protect her from the pain of knowing her wealthy mother had willingly abandoned her, not to hide a crime. Lily also worked at the clinic and had the same access to herbs and medical knowledge, giving her the ability to obtain the poison herself. The locket with the doctor’s image reflects her dependency on him, not his guilt. In the end, the doctor’s secret was one of protection, while Lily, overwhelmed by discovering her mother rejected her, carried out the act.";
    } else {
      explanation.textContent =
        "The fortune teller, Ms. Zachel, wasn’t involved in the murder at all — she was simply a frightened woman who believed her own reading that she would die soon. Convinced of her fate, she secretly paid the grave digger to prepare a grave for herself in advance, which explains the cash he had and the grave dug before anyone actually died. She also told others she witnessed Lily and the victim arguing, which unintentionally pointed suspicion toward the doctor and others, but she had no role in the crime. In the end, her actions came from fear and superstition, not guilt.";
    }
    li.appendChild(document.createElement("br"));
    li.appendChild(explanation);

    hintLog.appendChild(li);
  });
});

// 🔁 Restart button
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

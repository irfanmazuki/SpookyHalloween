let totalQuestions = 12;
let currentScene = "intro";

const scenes = {
  intro: {
    text: "Jack Lantern walks toward the eerie palace where he was invited to perform under the glow of a blood-orange moon.",
    image: "images/jack_palace.png",
    options: [{ text: "Continue", next: "murderScene" }],
  },
  murderScene: {
    text: "A sudden thud echoes through the hall. The sound of hay falling... the pumpkin head of Jack Lantern flickers weakly in the darkness.",
    image: "images/murder_scene.png",
    options: [{ text: "Begin Investigation", next: "investigationHub" }],
  },
  investigationHub: {
    text: "Four figures linger in the shadows of the palace courtyard. Each carries secrets. Who will you question first?",
    image: "images/palace_courtyard.png",
    options: [
      { text: "Gravekeeper", next: "gravekeeper" },
      { text: "Fortune Teller", next: "fortuneTeller" },
      { text: "Doctor", next: "doctor" },
      { text: "Orphan", next: "orphan" },
    ],
  },
  gravekeeper: {
    text: "The Gravekeeper tightens his grip on his shovel. His breath fogs the air as he mutters.",
    image: "images/gravekeeper.png",
    questions: [
      [
        "What did you do today?",
        "Buried what’s left of the past... as always.",
      ],
      [
        "Have you seen Jack Lantern tonight?",
        "Aye, I saw his light fade near the great hall.",
      ],
      [
        "Why were you invited here?",
        "The palace asked me to tend the forgotten graves behind it.",
      ],
    ],
  },
  fortuneTeller: {
    text: "The Fortune Teller’s eyes glimmer behind her crystal ball, reflecting the candlelight.",
    image: "images/fortune_teller.png",
    questions: [
      ["What do your visions show?", "Only smoke... and betrayal."],
      [
        "Do you know who killed Jack?",
        "The cards whisper of a man with blood on his hands.",
      ],
      [
        "Why are you here tonight?",
        "To warn them — but my words came too late.",
      ],
    ],
  },
  doctor: {
    text: "The Doctor adjusts his gloves nervously, avoiding your gaze.",
    image: "images/doctor.png",
    questions: [
      [
        "What were you doing before the murder?",
        "Tending to a... patient. Yes, that’s it.",
      ],
      ["Do you recognize Jack’s remains?", "No! I mean... I barely looked."],
      [
        "Why are your gloves stained?",
        "A nosebleed. Mine. Old habit to overprepare.",
      ],
    ],
  },
  orphan: {
    text: "The Orphan clutches a small toy lantern, eyes wide and scared.",
    image: "images/orphan.png",
    questions: [
      ["Did you see anything strange?", "Just the shadows moving fast..."],
      ["Who do you trust here?", "Not the man with the tools..."],
      [
        "Why are you here?",
        "The palace feeds us sometimes... I just wanted soup.",
      ],
    ],
  },
  accusation: {
    text: "The night is quiet. You’ve heard enough. Who killed Jack Lantern?",
    image: "images/palace_dark.png",
    options: [
      { text: "The Gravekeeper", next: "wrongEnding" },
      { text: "The Fortune Teller", next: "wrongEnding" },
      { text: "The Doctor", next: "correctEnding" },
      { text: "The Orphan", next: "wrongEnding" },
    ],
  },
  correctEnding: {
    text: "You confront the Doctor. He stumbles, confessing that jealousy burned brighter than Jack’s light. Justice is served.",
    image: "images/ending_correct.png",
    options: [{ text: "Restart", next: "intro" }],
  },
  wrongEnding: {
    text: "You accuse the wrong suspect. A soft laugh echoes — the real killer fades into the fog. Jack’s light dies forever.",
    image: "images/ending_wrong.png",
    options: [{ text: "Restart", next: "intro" }],
  },
};

function showScene(scene) {
  const storyText = document.getElementById("story-text");
  const optionsDiv = document.getElementById("options");
  const imageEl = document.getElementById("scene-image");

  storyText.innerHTML = scene.text;
  optionsDiv.innerHTML = "";

  if (scene.image) imageEl.src = scene.image;

  if (scene.questions) {
    if (totalQuestions <= 0) return goToScene("accusation");
    scene.questions.forEach(([q, a]) => {
      const btn = document.createElement("button");
      btn.textContent = q;
      btn.onclick = () => {
        totalQuestions--;
        logDialogue("Jack", q);
        logDialogue("Suspect", a);
        updateQuestionCount();
        if (totalQuestions <= 0) goToScene("accusation");
      };
      optionsDiv.appendChild(btn);
    });
  } else if (scene.options) {
    scene.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.onclick = () => {
        // if restarting, clear log + reset counters
        if (opt.next === "intro") {
          totalQuestions = 12;
          document.getElementById("log").innerHTML = "";
          updateQuestionCount();
        }
        goToScene(opt.next);
      };
      optionsDiv.appendChild(btn);
    });
  }
}

function logDialogue(speaker, text) {
  const log = document.getElementById("log");
  const p = document.createElement("p");
  p.className = speaker === "Jack" ? "jack" : "suspect";
  p.textContent = `[${speaker}]: ${text}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function updateQuestionCount() {
  document.getElementById(
    "question-count"
  ).textContent = `Questions left: ${totalQuestions} (max 6 each)`;
}

function goToScene(name) {
  currentScene = name;
  showScene(scenes[name]);
}

// LEFT PANEL BUTTONS
document.getElementById("clear-log").onclick = () => {
  document.getElementById("log").innerHTML = "";
};

// 🔙 BACK BUTTON — goes back to suspect choice screen
document.getElementById("back").onclick = () => {
  if (
    ["gravekeeper", "fortuneTeller", "doctor", "orphan"].includes(currentScene)
  ) {
    goToScene("investigationHub");
  }
};

// Start game automatically
window.addEventListener("DOMContentLoaded", () => {
  updateQuestionCount();
  showScene(scenes[currentScene]);
});

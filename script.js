const scenes = {
  start: {
    image:
      "https://media.istockphoto.com/id/1256169229/vector/people-in-court-vector-illustration-cartoon-flat-advocate-barrister-and-accused-character.jpg?s=612x612&w=0&k=20&c=pV7SeSolSMXakDpZUxXwpGWVptsAIbsLmV_0GIGc2TI=",
    text: "You stand at the edge of the known world. Four paths stretch before you — each one a different fate.",
    options: [
      { text: "Enter the forest", nextScene: "forest" },
      { text: "Climb the mountain", nextScene: "mountain" },
      { text: "Swim across the river", nextScene: "river" },
      { text: "Return to village", nextScene: "village" },
    ],
  },
  forest: {
    image: "https://i.imgur.com/AZ8DPzP.jpg",
    text: "The forest is dense and quiet. Birds scatter as you step beneath the ancient canopy.",
    options: [
      { text: "Follow the glowing path", nextScene: "glowPath" },
      { text: "Climb a tree to scout", nextScene: "treeScout" },
    ],
  },
  mountain: {
    image: "https://i.imgur.com/z9d0DAe.jpg",
    text: "The mountain wind bites cold. A narrow trail leads upward, while shadows dance near a cave.",
    options: [
      { text: "Enter cave", nextScene: "cave" },
      { text: "Set up camp", nextScene: "camp" },
      { text: "Return", nextScene: "start" },
    ],
  },
  river: {
    image: "https://i.imgur.com/gkLgI1U.jpg",
    text: "The river roars with life. Crossing it will require ingenuity—or luck.",
    options: [
      { text: "Build a raft", nextScene: "raft" },
      { text: "Search for a bridge", nextScene: "bridge" },
    ],
  },
  village: {
    image: "https://i.imgur.com/1VbY5Ru.jpg",
    text: "The village is quiet, but familiar. Children play in the distance, and the smell of bread fills the air.",
    options: [
      { text: "Talk to the elder", nextScene: "elder" },
      { text: "Visit the market", nextScene: "market" },
      { text: "Leave again", nextScene: "start" },
    ],
  },
  glowPath: {
    image: "https://i.imgur.com/1VbY5Ru.jpg",
    text: "Glow Path",
    options: [
      { text: "Talk to the elder", nextScene: "start" },
      { text: "Visit the market", nextScene: "market" },
      { text: "Leave again", nextScene: "start" },
    ],
  },
  // Add other scenes as needed
};
// Load initial scene
let currentScene = "start";

function loadScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) return;

  currentScene = sceneKey;

  // Update scene image
  document.getElementById("scene-image").src = scene.image;

  // Update moderator text
  const modBox = document.getElementById("moderator-box");
  modBox.textContent = scene.text;

  // Clear and recreate option buttons
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  scene.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = option.text;
    button.onclick = () => loadScene(option.nextScene);
    optionsContainer.appendChild(button);
  });
}

// Start game
loadScene(currentScene);

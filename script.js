// Define game scenes
const scenes = {
  start: {
    image:
      "https://media.istockphoto.com/id/1256169229/vector/people-in-court-vector-illustration-cartoon-flat-advocate-barrister-and-accused-character.jpg?s=612x612&w=0&k=20&c=pV7SeSolSMXakDpZUxXwpGWVptsAIbsLmV_0GIGc2TI=", // Replace with your image URL
    options: [
      { text: "Enter the forest", nextScene: "forest" },
      { text: "Climb the mountain", nextScene: "mountain" },
      { text: "Swim across the river", nextScene: "river" },
      { text: "Return to village", nextScene: "village" },
    ],
  },
  forest: {
    image: "https://i.imgur.com/AZ8DPzP.jpg",
    options: [
      { text: "Follow the glowing path", nextScene: "glowPath" },
      { text: "Climb a tree to scout", nextScene: "treeScout" },
    ],
  },
  mountain: {
    image: "https://i.imgur.com/z9d0DAe.jpg",
    options: [
      { text: "Enter cave", nextScene: "cave" },
      { text: "Set up camp", nextScene: "camp" },
      { text: "Return", nextScene: "start" },
    ],
  },
  river: {
    image: "https://i.imgur.com/gkLgI1U.jpg",
    options: [
      { text: "Build a raft", nextScene: "raft" },
      { text: "Search for a bridge", nextScene: "bridge" },
    ],
  },
  village: {
    image: "https://i.imgur.com/1VbY5Ru.jpg",
    options: [
      { text: "Talk to the elder", nextScene: "elder" },
      { text: "Visit the market", nextScene: "market" },
      { text: "Leave again", nextScene: "start" },
    ],
  },
  // Add more scenes as needed...
};

// Load initial scene
let currentScene = "start";

function loadScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) return;

  currentScene = sceneKey;

  // Update scene image
  document.getElementById("scene-image").src = scene.image;

  // Clear and create new option buttons
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

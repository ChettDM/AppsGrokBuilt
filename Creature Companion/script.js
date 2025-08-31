let hunger = 50;
let happiness = 50;
let energy = 50;

const fluffelJelly = document.getElementById('fluffel-jelly');
const hungerDisplay = document.getElementById('hunger');
const happinessDisplay = document.getElementById('happiness');
const energyDisplay = document.getElementById('energy');
const messageDisplay = document.getElementById('message');

function updateStats() {
    hunger = Math.max(0, Math.min(100, hunger));
    happiness = Math.max(0, Math.min(100, happiness));
    energy = Math.max(0, Math.min(100, energy));

    hungerDisplay.textContent = hunger;
    happinessDisplay.textContent = happiness;
    energyDisplay.textContent = energy;

    // Update creature appearance and message based on stats
    if (happiness > 70) {
        fluffelJelly.classList.remove('sad');
        fluffelJelly.classList.add('happy');
        messageDisplay.textContent = "I'm so happy!";
    } else if (hunger > 80 || energy < 20) {
        fluffelJelly.classList.remove('happy');
        fluffelJelly.classList.add('sad');
        messageDisplay.textContent = hunger > 80 ? "I'm starving!" : "I'm so tired!";
    } else {
        fluffelJelly.classList.remove('happy', 'sad');
        messageDisplay.textContent = "Hi! I'm your Fluffel Jelly!";
    }
}

function feed() {
    hunger -= 20;
    happiness += 10;
    energy -= 5;
    updateStats();
}

function play() {
    if (energy > 10) {
        happiness += 20;
        energy -= 15;
        hunger += 10;
        updateStats();
    } else {
        messageDisplay.textContent = "Too tired to play!";
    }
}

function rest() {
    energy += 20;
    hunger += 10;
    happiness -= 5;
    updateStats();
}

// Simulate time passing
setInterval(() => {
    hunger += 5;
    energy -= 5;
    happiness -= 5;
    updateStats();
}, 10000); // Every 10 seconds

// Initial update
updateStats();

// Generate a GUID (simplified UUID v4)
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Simple hash function to convert GUID to a number
function hashGUID(guid) {
    let hash = 0;
    for (let i = 0; i < guid.length; i++) {
        hash = ((hash << 5) - hash) + guid.charCodeAt(i);
        hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Define creature features based on GUID hash
function getCreatureFeatures(guid) {
    const hash = hashGUID(guid);
    return {
        wings: (hash % 3 === 0) ? 'Feathered' : (hash % 3 === 1) ? 'Bat-like' : 'None',
        fangs: (hash % 2 === 0) ? 'Sharp' : 'None',
        claws: (hash % 4 < 2) ? 'Long' : 'Short',
        tail: (hash % 5 === 0) ? 'Spiked' : (hash % 5 === 1) ? 'Fluffy' : (hash % 5 === 2) ? 'Scaly' : 'None',
        color: ['Blue', 'Red', 'Green', 'Purple', 'Yellow'][hash % 5]
    };
}

// Create creature HTML element
function createCreatureElement(guid, index) {
    const features = getCreatureFeatures(guid);
    const creatureDiv = document.createElement('div');
    creatureDiv.className = 'creature';
    creatureDiv.innerHTML = `
        <p><strong>Creature ${index}</strong></p>
        <p>Wings: ${features.wings}</p>
        <p>Fangs: ${features.fangs}</p>
        <p>Claws: ${features.claws}</p>
        <p>Tail: ${features.tail}</p>
        <p>Color: ${features.color}</p>
        <p style="font-size: 10px;">GUID: ${guid}</p>
    `;
    return creatureDiv;
}

// Combine two GUIDs to create a new one
function combineGUIDs(guid1, guid2) {
    const combined = guid1.slice(0, 18) + guid2.slice(18);
    return combined;
}

// Initialize the app
let creatures = [];

function initializeApp() {
    creatures = [generateGUID(), generateGUID()];
    const container = document.getElementById('creature-container');
    container.innerHTML = '';
    creatures.forEach((guid, index) => {
        container.appendChild(createCreatureElement(guid, index + 1));
    });
    updateBreedButton();
}

// Breed creatures
function breedCreatures() {
    if (creatures.length < 2) return;
    const newGUID = combineGUIDs(creatures[0], creatures[1]);
    creatures = [creatures[0], creatures[1], newGUID];
    const container = document.getElementById('creature-container');
    container.appendChild(createCreatureElement(newGUID, creatures.length));
    updateBreedButton();
}

// Update breed button state
function updateBreedButton() {
    const breedButton = document.getElementById('breed-button');
    breedButton.disabled = creatures.length < 2;
}

// Load initial creatures
window.onload = initializeApp;

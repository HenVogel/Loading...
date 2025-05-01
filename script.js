const loadingMessages = [
    "Loading shaders... done. Reloading shaders... done. Deleting shaders.",
    "Verifying existence of reality...",
    "Almost there. Just kidding.",
    "Contacting server... no response. Contacting hell... connected.",
    "Initializing existential dread...",
    "Calculating meaning of life...",
    "Loading your patience...",
    "Preparing disappointment...",
    "Generating random excuses...",
    "Downloading more RAM...",
    "Defragmenting your soul...",
    "Compressing your hopes and dreams...",
    "Reticulating splines...",
    "Calibrating reality distortion field...",
    "Synchronizing with parallel universes...",
    "Loading loading screen...",
    "Please wait while we pretend to load...",
    "Time is an illusion. Loading doubly so.",
    "The cake is a lie. The loading is eternal.",
    "Your computer is not broken. This is intentional."
];

let progress = 0;
let cancelClicks = 0;
let startTime = Date.now();
let lastMessageTime = Date.now();
let messages = [];
let lastProgressUpdate = Date.now();

function updateProgress() {
    const now = Date.now();
    // Only update progress every 2 seconds
    if (now - lastProgressUpdate < 2000) return;
    lastProgressUpdate = now;

    if (progress === 99) {
        messages.unshift("Close enough but actually not close enough");
        if (messages.length > 5) messages.pop();
        progress = Math.floor(Math.random() * 89) + 10; // Random number between 10 and 98
    } else if (Math.random() < 0.25) {
        progress = Math.max(0, progress - Math.floor(Math.random() * 3) + 1);
    } else {
        // 75% chance of no progress, 25% chance of +1
        progress = Math.min(99, progress + (Math.random() < 0.75 ? 0 : 1));
    }
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.percentage').textContent = `${progress}%`;
}

function addRandomMessage() {
    const now = Date.now();
    if (now - lastMessageTime > (Math.random() * 45000 + 15000)) {
        const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        messages.unshift(message); // Add new message to the beginning
        if (messages.length > 5) messages.pop(); // Remove oldest message if we have too many
        
        const messagesDiv = document.querySelector('.messages');
        messagesDiv.innerHTML = messages.map(msg => 
            `<div class="message" style="opacity: 1;">${msg}</div>`
        ).join('');
        
        lastMessageTime = now;
    }
}

function applyGlitch() {
    const glitchDiv = document.querySelector('.glitch');
    const timeElapsed = (Date.now() - startTime) / 60000;
    const glitchLevel = Math.min(100, timeElapsed);
    
    if (Math.random() < glitchLevel * 0.01) {
        glitchDiv.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        glitchDiv.style.opacity = '0.1';
        setTimeout(() => {
            glitchDiv.style.backgroundColor = 'transparent';
        }, 500); // Increased from 100ms to 500ms
    }
}

function handleCancel() {
    cancelClicks++;
    if (cancelClicks >= 1000) {
        document.body.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px;">
                REBOOTING...
            </div>
        `;
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } else {
        // 50/50 chance to add or subtract 1%
        progress = Math.random() < 0.5 ? 
            Math.min(99, progress + 1) : 
            Math.max(0, progress - 1);
        document.querySelector('.progress').style.width = `${progress}%`;
        document.querySelector('.percentage').textContent = `${progress}%`;
    }
}

// Initialize
document.querySelector('.cancel-button').addEventListener('click', handleCancel);

// Main loop
setInterval(() => {
    updateProgress();
    addRandomMessage();
    applyGlitch();
}, 1000); 
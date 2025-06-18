

function ensureVoiceReady() {
    if (!voiceInitialized) {
        initVoice().then(() => {
            voiceInitialized = true;
            console.log("✅ Voix initialisée après interaction.");
        });
    }
}


function initVoice() {
    return new Promise(resolve => {
        const synth = window.speechSynthesis;
        const checkVoices = () => {
            const voices = synth.getVoices();
            if (voices.length > 0) {
                selectedVoice = voices.find(v => v.name.includes("Microsoft Paul")) || voices.find(v => v.lang === "fr-FR");
                console.log("✅ Voix chargée :", selectedVoice?.name || "aucune trouvée");
                resolve();
            } else {
                setTimeout(checkVoices, 100);
            }
        };
        checkVoices();
    });
}



let botResponses = {};
let selectedVoice = null;
let voiceInitialized = false;

fetch('bot_responses.json')
    .then(response => response.json())
    .then(data => {
        botResponses = data;
        console.log("✅ Réponses chargées :", botResponses);
    })
    .catch(err => console.error("❌ Erreur de chargement des réponses :", err));

window.speechSynthesis.onvoiceschanged = () => {
    console.log("✅ Voix disponibles :", window.speechSynthesis.getVoices().map(v => v.name));
};

// Toggle chat visibility
function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'flex' : 'none';
}

// Handle user input
function handleChat(event) {
  ensureVoiceReady();
    if (event.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            const messages = document.getElementById('chat-messages');
            const userMsg = document.createElement('div');
            userMsg.textContent = "👤 " + message;
            messages.appendChild(userMsg);
            input.value = '';

            setTimeout(() => {
                const botReply = generateBotReply(message.toLowerCase());
                const botMsg = document.createElement('div');
                botMsg.textContent = "🤖 " + botReply;
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
                speak(botReply);
            }, 800);
        }
    }
}

// Generate bot reply
function generateBotReply(msg) {
    for (const key in botResponses) {
        if (key !== "default" && msg.includes(key)) {
            return botResponses[key];
        }
    }

    const defaults = botResponses["default"] || ["Je suis un bot, mais j'apprends !"];
    const reply = defaults[Math.floor(Math.random() * defaults.length)];

    saveUnknownQuestionLocally(msg);
    logUnknownToServer(msg);

    return reply;
}

// Sauvegarde locale avec localStorage
function saveUnknownQuestionLocally(question) {
    let unknowns = JSON.parse(localStorage.getItem('unknown_questions')) || [];
    if (!unknowns.includes(question)) {
        unknowns.push(question);
        localStorage.setItem('unknown_questions', JSON.stringify(unknowns));
        console.log("❓ Question inconnue sauvegardée localement :", question);
    }
}

// Envoi vers serveur Node.js
function logUnknownToServer(question) {
    fetch('http://localhost:8000/log-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
    }).then(res => {
        if (res.ok) {
            console.log("📝 Question inconnue envoyée au serveur :", question);
        }
    }).catch(err => {
        console.error("❌ Erreur lors de l'envoi au serveur :", err);
    });
}

// Parole synthétique avec voix masculine "Microsoft Paul"
function speak(text) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => v.name.includes("Microsoft Paul")) || voices.find(v => v.lang === "fr-FR");

    if (!selectedVoice) {
        console.warn("⚠️ Voix Microsoft Paul non trouvée.");
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = selectedVoice;
    synth.speak(utter);
    console.log("🗣️ Voix utilisée :", selectedVoice.name);
}


function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    input.value = "";

    if (!msg) return;

    const messages = document.getElementById('chat-messages');
    const userMsg = document.createElement('div');
    userMsg.innerHTML = `<strong>👤 Vous :</strong> ${msg}`;
    messages.appendChild(userMsg);

    // Vérifie localement si la réponse est connue
    fetch('bot_responses.json')
        .then(res => res.json())
        .then(data => {
            botResponses = data;
            if (botResponses[msg]) {
                const botMsg = document.createElement('div');
                botMsg.innerHTML = `<strong>🤖 Bot :</strong> ${botResponses[msg]}`;
                messages.appendChild(botMsg);
            } else {
                const botMsg = document.createElement('div');
                botMsg.innerHTML = `<strong>🤖 Bot :</strong> Je ne connais pas encore cette réponse.`;
                messages.appendChild(botMsg);

                // Enregistrer dans les questions inconnues
                fetch('http://localhost:8000/log-question', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: msg })
                });

                const addButton = document.createElement('button');
                addButton.textContent = "Ajouter une réponse";
                addButton.onclick = () => showAddResponseForm(msg);
                messages.appendChild(addButton);
            }
        });
}

function showAddResponseForm(question) {
    const form = document.createElement('div');
    form.innerHTML = `
        <strong>Ajouter une réponse :</strong><br>
        <em>Question :</em> ${question}<br>
        <input type="text" id="new-response" placeholder="Nouvelle réponse"><br>
        <button onclick="saveNewResponse('${question}')">Sauvegarder</button>
    `;
    document.getElementById('chat-messages').appendChild(form);
}

function saveNewResponse(question) {
    const response = document.getElementById('new-response').value.trim();
    if (!response) return;

    fetch('http://localhost:8000/add-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, response })
    })
    .then(res => {
        if (res.ok) alert("✅ Réponse ajoutée !");
        else alert("❌ Erreur lors de la sauvegarde.");
    })
    .catch(err => console.error("Erreur : ", err));
}




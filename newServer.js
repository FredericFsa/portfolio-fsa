const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// 📁 Sert tous les fichiers statiques (HTML, CSS, JS, images...)
app.use(express.static(path.join(__dirname)));

// 📌 Fichiers de stockage JSON
const fileBotResponses = path.join(__dirname, 'bot_responses.json');
const fileUnknownQuestions = path.join(__dirname, 'unknown_questions.json');


// ==========================
//        ROUTES API
// ==========================

// POST: Log question inconnue
app.post('/log-question', (req, res) => {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'question invalide' });
    }

    // 1. Ajout dans bot_responses.json
    let responses = {};
    if (fs.existsSync(fileBotResponses)) {
        try {
            responses = JSON.parse(fs.readFileSync(fileBotResponses, 'utf8'));
        } catch (err) {
            console.error("❌ Erreur parsing bot_responses.json :", err);
        }
    }

    if (!responses[question]) {
        responses[question] = "Réponse à définir...";
        fs.writeFileSync(fileBotResponses, JSON.stringify(responses, null, 2));
        console.log("✅ Ajout dans bot_responses :", question);
    }

    // 2. Ajout dans unknown_questions.json
    let questions = [];
    if (fs.existsSync(fileUnknownQuestions)) {
        try {
            questions = JSON.parse(fs.readFileSync(fileUnknownQuestions, 'utf8'));
        } catch (err) {
            console.warn("⚠️ Fichier unknown_questions.json invalide");
        }
    }

    if (!questions.includes(question)) {
        questions.push(question);
        fs.writeFileSync(fileUnknownQuestions, JSON.stringify(questions, null, 2));
        console.log("➕ Ajout dans unknown_questions :", question);
    }

    res.json({ success: true });
});

// GET: Toutes les questions inconnues
app.get('/questions', (req, res) => {
    try {
        const content = fs.existsSync(fileUnknownQuestions)
            ? fs.readFileSync(fileUnknownQuestions, 'utf8')
            : '[]';
        res.json(JSON.parse(content));
    } catch (err) {
        res.status(500).json({ error: 'Erreur lecture unknown_questions', details: err.message });
    }
});

// GET: Toutes les réponses connues
app.get('/bot-responses', (req, res) => {
    try {
        const content = fs.existsSync(fileBotResponses)
            ? fs.readFileSync(fileBotResponses, 'utf8')
            : '{}';
        res.json(JSON.parse(content));
    } catch (err) {
        res.status(500).json({ error: 'Erreur lecture bot_responses', details: err.message });
    }
});

// PUT: Met à jour une réponse
app.put('/update-response', (req, res) => {
    const { question, response } = req.body;
    if (!question || !response) {
        return res.status(400).json({ error: 'question ou réponse manquante' });
    }

    try {
        const data = fs.existsSync(fileBotResponses)
            ? JSON.parse(fs.readFileSync(fileBotResponses, 'utf8'))
            : {};
        data[question] = response;
        fs.writeFileSync(fileBotResponses, JSON.stringify(data, null, 2));
        console.log("💾 Réponse mise à jour :", question);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Erreur écriture bot_responses' });
    }
});

// DELETE: Supprime une question inconnue
app.delete('/delete-question', (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'question manquante' });

    try {
        let questions = fs.existsSync(fileUnknownQuestions)
            ? JSON.parse(fs.readFileSync(fileUnknownQuestions, 'utf8'))
            : [];

        questions = questions.filter(q => q !== question);
        fs.writeFileSync(fileUnknownQuestions, JSON.stringify(questions, null, 2));
        console.log("🗑️ Question supprimée :", question);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Erreur suppression' });
    }
});

// ==========================
//        LANCEMENT
// ==========================
app.listen(PORT, () => {
    console.log(`🚀 Serveur unifié actif sur : http://localhost:${PORT}`);
});

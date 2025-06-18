
// ✅ human_check.js
// Script de vérification humaine pour formulaire de contact

const questions = [
    { question: "Combien font 3 + 4 ?", answer: "7" },
    { question: "Écris le mot 'chat'", answer: "chat" },
    { question: "Combien font 2 x 5 ?", answer: "10" },
    { question: "Quel est le premier mois de l'année ?", answer: "janvier" },
    { question: "Combien de lettres dans le mot 'oiseau' ?", answer: "6" }
];

let selectedAnswer = "";

window.onload = () => {
    const random = Math.floor(Math.random() * questions.length);
    const question = questions[random];
    selectedAnswer = question.answer.toLowerCase().trim();
    document.getElementById("human-question-label").textContent = question.question;
};

function checkHumanAnswer() {
    const answer = document.getElementById("human-check").value.toLowerCase().trim();
    if (answer !== selectedAnswer) {
        alert("❌ Mauvaise réponse. Veuillez réessayer.");
        return false;
    }
    return true;
}

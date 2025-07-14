
function saveUnknownQuestionLocally(question) {
    let unknowns = JSON.parse(localStorage.getItem('unknown_questions')) || [];
    if (!unknowns.includes(question)) {
        unknowns.push(question);
        localStorage.setItem('unknown_questions', JSON.stringify(unknowns));
        console.log("❓ Question inconnue sauvegardée localement :", question);
    }
}

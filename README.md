
# 🧠 Portfolio IA – README

Ce projet est un **portfolio interactif intelligent**, combinant un chatbot vocal, une section d'actualités techniques, un espace personnel, et une interface d’administration.

---

## 🌐 Structure globale du projet

```
.
├── index.html                 → Page principale (Portfolio)
├── header.html               → Barre de navigation commune à toutes les pages
├── style.css                 → Feuille de styles du site
├── script.js                 → Smooth scroll et comportements de navigation

├── blog.html                 → Section blog
├── actualites_completes.html→ Page générée dynamiquement avec des flux RSS

├── chat_local_tts_male.js    → Chatbot avec synthèse vocale Web Speech API
├── save_unknown_local.js     → Sauvegarde locale des questions inconnues
├── human_check.js            → Vérification utilisateur (captcha simple)
├── fetch_news.js             → Récupération des flux RSS + génération HTML

├── admin.html                → Interface d’ajout de réponses manuelles
├── admin_questions.html      → Interface de modération des questions non reconnues

├── service-worker.js         → Mise en cache (fonction PWA)
├── manifest.json             → Définition de l’application PWA (nom, icône, thème, etc.)

├── newServer.js              → Serveur Node.js principal (API REST + fichiers)
├── server_openAI.js          → Proxy pour envoyer des requêtes à OpenAI (optionnel)
├── hash.js                   → Générateur de mot de passe hashé (bcrypt)

├── bot_responses.json        → Base de données locale des réponses connues
├── unknown_questions.json    → Historique des questions inconnues

├── package.json              → Dépendances Node.js (Express, bcrypt, RSS parser…)
├── package-lock.json         → Détails versions NPM
├── start.bat                 → Script Windows pour lancer automatiquement le serveur
```

---

## 🔊 Fonctionnalités du chatbot

- **Reconnaissance de texte** (saisie utilisateur)
- **Synthèse vocale (TTS)** via Web Speech API
- **Voix préchargée dynamiquement** à la première interaction
- **Ajout manuel de réponses** via `admin.html`
- **Historique des questions inconnues** sauvegardé dans `unknown_questions.json`

---

## 📰 Actualités Techniques

Générées via `fetch_news.js` :
- Flux RSS analysés et résumés
- Images réduites et affichées avec bordure
- Résumé optionnel (filtrage si contenu non pertinent)

---

## 🔐 Sécurité Admin

- Authentification simple via `/auth`
- Mot de passe **hashé avec bcrypt**
- Utilisation de `hash.js` pour générer les empreintes

---

## 🚀 Exécution

### En local :
```bash
npm install
node newServer.js
```

### Docker (optionnel) :
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node", "newServer.js"]
```

---

## ✅ Astuces

- 🔄 Appuyer sur `Ctrl + F5` pour forcer le rechargement sans cache
- 📂 Modifier le header commun dans `header.html` pour affecter toutes les pages
- ✏️ Les fichiers `.json` sont modifiables manuellement ou via l'interface admin

---

## 📱 PWA (Progressive Web App)

- Fonctionne offline après première visite
- Installable sur mobile/desktop via manifest.json + service-worker.js

---

## 📌 Notes

- `bot_responses.json` contient les réponses du bot (clé = question, valeur = réponse)
- `unknown_questions.json` contient toutes les phrases que le bot n’a pas comprises
- `manifest.json` permet l’ajout à l’écran d’accueil comme une app mobile

---

👨‍💻 **Auteur** : Frédéric Salerno  
📅 **Mise à jour** : Juin 2025

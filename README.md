# 💼 Portfolio Interactif – Frédéric SALERNO

Bienvenue dans le **portfolio personnel** de _Frédéric SALERNO_, ingénieur industriel, combinant design moderne, présentation interactive, chatbot et fonctionnalités PWA.

🔗 Démo en ligne : [https://fredericfsa.github.io/portfolio-fsa](https://fredericfsa.github.io/portfolio-fsa)

---

## 📁 Structure des fichiers

```
.
├── index.html            → Page principale contenant le contenu du portfolio
├── header.html           → Menu de navigation injecté dynamiquement
├── style.css             → Feuille de styles principale (animations, responsive)
├── script.js             → Effets de scroll, animation des sections, gestion du header
├── human_check.js        → Système anti-bot simple pour le formulaire (captcha quiz)
├── service-worker.js     → Mise en cache du site pour PWA
├── manifest.json         → Configuration pour l'installation en tant qu'application
├── README.md             → Ce fichier
```

---

### 🎨 Portfolio personnel
- Présentation claire et moderne de ton profil, compétences, expériences et diplômes
- Sections dynamiques : compétences, langues, expériences, contact
- Utilisation d’icônes Font Awesome pour chaque domaine

### 📜 Navigation fluide
- Scroll doux entre sections (ancre)
- Background adaptatif de la barre de navigation
- Responsive design : s’adapte aux mobiles et tablettes

### 🧠 Protection anti-bot
- `human_check.js` génère des questions simples pour protéger le formulaire de contact contre les bots

### 📲 Progressive Web App (PWA)
- Fichier `manifest.json` et `service-worker.js` permettant :
  - Installation comme application mobile
  - Fonctionnement hors ligne après première visite

---


## 📦 Détails techniques

- Langage principal : HTML / CSS / JavaScript Vanilla
- Design : Responsive, thème sombre, grid CSS
- Animations :
  - Entrées des sections via `IntersectionObserver`
  - Scroll fluide vers les ancres internes
- Système PWA :
  - `service-worker.js` pour cache offline
  - `manifest.json` pour installation mobile

---


## 👨‍💻 Auteur

**Frédéric Salerno**  
📍 Belgique (Liège) / Télétravail  
🔗 [LinkedIn](https://linkedin.com/in/frédéric-salerno-94018848)  
🔗 [GitHub](https://github.com/FredericFsa)

---

📅 **Dernière mise à jour** : Juin 2025

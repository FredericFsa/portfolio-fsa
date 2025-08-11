@'
# 🌐 Portfolio – Frédéric Salerno

Bienvenue sur mon **portfolio en ligne**, présentant mes compétences, certifications, projets techniques et articles de blog.
Ce site a été conçu en HTML/CSS/JS, avec un design responsive et un thème moderne.

---

## 📄 Contenu du portfolio

### 🏠 Page d’accueil
- Présentation rapide de mon profil
- Accès direct : **Certifications**, **Conceptions**, **Blog**

### 📜 Certifications & Formations
- BA5 – Travailler en sécurité sur des installations électriques (Technifutur, 2025)
- Cisco **CCNA** (ICND1 & ICND2)
- Fibre optique : conception, épissurage, mesure, maintenance
- **SMPTE ST 2110 (IP Live)** : essences vidéo/audio/datas, PTP (ST 2059), NMOS (IS-04/05)

### 🛠 Projets / Conceptions
- **Application Sudoku Été** : génération, vérification et impression (4×4 à 25×25)
- **PDF Compressor (Flask + Ghostscript + Docker)**
- **Secure WiFi QR** : générateur de QR code Wi-Fi sécurisé
- Autres conceptions (électronique, automatisation, scripts)

### 📝 Blog
- **Mesurer l’impédance d’un câble coaxial** (schéma SVG pro)
- **SMPTE ST 2110 – Guide pratique** (flux séparés, PTP, NMOS, QoS)

---

## 🚀 Fonctionnalités
- Design responsive
- Styles unifiés (nav/footer) sur toutes les pages
- Schémas **SVG** vectoriels
- Compatible **GitHub Pages**

---

## 📂 Structure
.
├── index.html
├── conceptions.html
├── blog.html
├── posts/
├── assets/
├── style.css
├── script.js
├── manifest.json
├── service-worker.js
└── README.md

---

## 🔗 En ligne
https://fredericfsa.github.io/portfolio-fsa/

## 📬 Contact
LinkedIn : https://www.linkedin.com/in/fredericsalerno

## ⚖️ Licence
MIT
'@ | Set-Content -Encoding UTF8 README.md

git add README.md
git commit -m "docs: mise à jour du README du portfolio"
git push origin main

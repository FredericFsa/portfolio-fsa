@echo off
echo 🚀 Lancement des serveurs...

start "Static Web Server" cmd /k "node newserver.js"
start "Static Fetch news" cmd /k "node fetch_news.js"

echo ✅ Le serveur est lancé.
pause
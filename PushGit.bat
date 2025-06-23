@echo off
REM Description : Ajoute, commit et pousse les fichiers SAUF ceux exclus dans .gitignore

echo.
echo === Étape 1 : Ajout des fichiers (sauf ceux exclus dans .gitignore) ===
git add .

echo.
set /p message="Message du commit : "
git commit -m "%message%"

echo.
echo === Étape 3 : Push vers la branche principale (main) ===
git push origin main

echo.
echo ✅ Push terminé avec succès !
pause

@echo off
REM Fichier : push_to_github.bat
REM Description : Ajoute, commit et pousse tous les fichiers vers la branche principale GitHub

echo.
echo === Étape 1 : Ajout de tous les fichiers modifiés ===
git add -A

echo.
set /p message="Message du commit : "
git commit -m "%message%"

echo.
echo === Étape 3 : Push vers la branche principale (main) ===
git push origin main

echo.
echo ✅ Push terminé avec succès !
pause

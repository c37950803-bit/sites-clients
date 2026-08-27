@echo off
chcp 65001 >nul 2>&1
title Sites Clients — Gestion
color 0A

:MENU
cls
echo.
echo  ═══════════════════════════════════════════════════════════════
echo   SITES CLIENTS — Gestion Vercel + Firebase
echo  ═══════════════════════════════════════════════════════════════
echo.
echo   [1] Afficher le statut des sites (Firestore)
echo   [2] Generer les 3 liens dans un fichier TXT
echo   [3] Ouvrir les 3 sites dans le navigateur
echo   [4] Ouvrir le panel admin
echo   [5] Activer / Desactiver un site
echo   [6] Quitter
echo.
echo  ═══════════════════════════════════════════════════════════════
echo.

set /p choice="  Choix : "

if "%choice%"=="1" goto STATUS
if "%choice%"=="2" goto LINKS
if "%choice%"=="3" goto OPEN
if "%choice%"=="4" goto ADMIN
if "%choice%"=="5" goto TOGGLE
if "%choice%"=="6" goto END

echo  [!] Choix invalide
pause
goto MENU

:STATUS
cls
echo.
echo  ── STATUT DES SITES (Firestore) ──
echo.
python firebase\firebase_setup.py --status
echo.
pause
goto MENU

:LINKS
cls
echo.
echo  ── Generation des liens... ──
echo.
(
echo  ══════════════════════════════════════════
echo   LIENS SITES CLIENTS
echo   Genere le %date% a %time%
echo  ══════════════════════════════════════════
echo.
echo  Panel Admin :  https://sites-clients.vercel.app
echo  Green Innovators :  https://sites-clients-jt9w.vercel.app
echo  LE GETUP :  https://sites-clients-6pfh.vercel.app
echo  PGC Cleaners :  https://sites-clients-bbl5.vercel.app
echo.
echo  ══════════════════════════════════════════
) > liens-sites.txt
echo  [OK] Fichier liens-sites.txt cree !
echo.
type liens-sites.txt
echo.
pause
goto MENU

:OPEN
cls
echo.
echo  ── Ouverture des 3 sites... ──
echo.
start https://sites-clients-jt9w.vercel.app
start https://sites-clients-6pfh.vercel.app
start https://sites-clients-bbl5.vercel.app
echo  [OK] 3 sites ouverts dans le navigateur
echo.
pause
goto MENU

:ADMIN
cls
echo.
echo  ── Ouverture du panel admin... ──
echo.
start https://sites-clients.vercel.app
echo  [OK] Panel admin ouvert
echo.
pause
goto MENU

:TOGGLE
cls
echo.
echo  ── Activer / Desactiver un site ──
echo.
echo   [1] green-innovators
echo   [2] legetup
echo   [3] pgc-cleaners
echo.
set /p site_id="  Site : "

if "%site_id%"=="1" set "site_id=green-innovators"
if "%site_id%"=="2" set "site_id=legetup"
if "%site_id%"=="3" set "site_id=pgc-cleaners"

echo.
echo   [A] Activer
echo   [D] Desactiver
echo.
set /p action="  Action : "

if /i "%action%"=="A" (
    set "actif=true"
    echo.
    echo  Activation de %site_id%...
) else if /i "%action%"=="D" (
    set "actif=false"
    echo.
    echo  Desactivation de %site_id%...
) else (
    echo  [!] Action invalide
    pause
    goto MENU
)

python firebase\firebase_setup.py --site %site_id% --actif %actif%
echo.
pause
goto MENU

:END
exit

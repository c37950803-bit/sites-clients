@echo off
title Sites Clients
color 0A

:MENU
cls
echo.
echo  ==========================================
echo   SITES CLIENTS - Gestion
echo  ==========================================
echo.
echo   [1] Verifier l'etat des sites
echo   [2] Generer le fichier TXT avec les liens
echo   [3] Ouvrir les 3 sites
echo   [4] Ouvrir le panel admin
echo   [5] Activer / Desactiver un site
echo   [6] Quitter
echo.
echo  ==========================================
echo.

set /p choice="  Choix : "

if "%choice%"=="1" goto CHECK
if "%choice%"=="2" goto LINKS
if "%choice%"=="3" goto OPEN
if "%choice%"=="4" goto ADMIN
if "%choice%"=="5" goto TOGGLE
if "%choice%"=="6" goto END

echo  Choix invalide
timeout /t 2 >nul
goto MENU

:CHECK
cls
echo.
echo  ==========================================
echo   ETAT DES SITES
echo  ==========================================
echo.
echo  [1/4] Panel Admin...
echo        https://sites-clients.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.
echo  [2/4] Green Innovators...
echo        https://sites-clients-jt9w.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-jt9w.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.
echo  [3/4] LE GETUP...
echo        https://sites-clients-6pfh.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-6pfh.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.
echo  [4/4] PGC Cleaners...
echo        https://sites-clients-bbl5.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-bbl5.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.
echo  ==========================================
echo.
pause
goto MENU

:LINKS
cls
echo.
echo  ==========================================
echo   GENERATION DU FICHIER TXT
echo  ==========================================
echo.
echo  Panel Admin :      https://sites-clients.vercel.app > liens-sites.txt
echo  Green Innovators : https://sites-clients-jt9w.vercel.app >> liens-sites.txt
echo  LE GETUP :         https://sites-clients-6pfh.vercel.app >> liens-sites.txt
echo  PGC Cleaners :     https://sites-clients-bbl5.vercel.app >> liens-sites.txt
echo.
echo  [OK] Fichier liens-sites.txt cree !
echo.
type liens-sites.txt
echo.
pause
goto MENU

:OPEN
cls
echo.
echo  Ouverture des 3 sites...
echo.
start https://sites-clients-jt9w.vercel.app
start https://sites-clients-6pfh.vercel.app
start https://sites-clients-bbl5.vercel.app
echo  [OK] 3 sites ouverts
echo.
pause
goto MENU

:ADMIN
cls
echo.
echo  Ouverture du panel admin...
echo.
start https://sites-clients.vercel.app
echo  [OK] Panel admin ouvert
echo.
pause
goto MENU

:TOGGLE
cls
echo.
echo  ==========================================
echo   ACTIVER / DESACTIVER UN SITE
echo  ==========================================
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
    echo  Action invalide
    pause
    goto MENU
)

python firebase\firebase_setup.py --site %site_id% --actif %actif%
echo.
pause
goto MENU

:END
exit

@echo off
chcp 65001 >nul 2>&1
title Sites Clients — Etat en temps reel
color 0A

:MENU
cls
echo.
echo  ═══════════════════════════════════════════════════════════════
echo   SITES CLIENTS — Etat en temps reel
echo  ═══════════════════════════════════════════════════════════════
echo.
echo   [1] Verifier l'etat des sites (en temps reel)
echo   [2] Generer le fichier TXT avec les 3 liens
echo   [3] Ouvrir les 3 sites dans le navigateur
echo   [4] Ouvrir le panel admin
echo   [5] Quitter
echo.
echo  ═══════════════════════════════════════════════════════════════
echo.

set /p choice="  Choix : "

if "%choice%"=="1" goto CHECK
if "%choice%"=="2" goto LINKS
if "%choice%"=="3" goto OPEN
if "%choice%"=="4" goto ADMIN
if "%choice%"=="5" goto END

echo  [!] Choix invalide
timeout /t 2 >nul
goto MENU

:CHECK
cls
echo.
echo  ═══════════════════════════════════════════════════════════════
echo   ETAT DES SITES — %date% %time%
echo  ═══════════════════════════════════════════════════════════════
echo.

echo  [1/4] Panel Admin...
echo        https://sites-clients.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE (' $r.StatusCode ')' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.

echo  [2/4] Green Innovators...
echo        https://sites-clients-jt9w.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-jt9w.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE (' $r.StatusCode ')' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.

echo  [3/4] LE GETUP...
echo        https://sites-clients-6pfh.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-6pfh.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE (' $r.StatusCode ')' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.

echo  [4/4] PGC Cleaners...
echo        https://sites-clients-bbl5.vercel.app
powershell -Command "try { $r = Invoke-WebRequest -Uri 'https://sites-clients-bbl5.vercel.app' -UseBasicParsing -TimeoutSec 10; Write-Host '        Status: EN LIGNE (' $r.StatusCode ')' -ForegroundColor Green } catch { Write-Host '        Status: HORS LIGNE' -ForegroundColor Red }"
echo.

echo  ═══════════════════════════════════════════════════════════════
echo.
pause
goto MENU

:LINKS
cls
echo.
echo  ═══════════════════════════════════════════════════════════════
echo   GENERATION DU FICHIER TXT...
echo  ═══════════════════════════════════════════════════════════════
echo.

(
echo  ══════════════════════════════════════════════════════════════
echo   LIENS SITES CLIENTS
echo   Genere le %date% a %time%
echo  ══════════════════════════════════════════════════════════════
echo.
echo  Panel Admin :      https://sites-clients.vercel.app
echo  Green Innovators : https://sites-clients-jt9w.vercel.app
echo  LE GETUP :         https://sites-clients-6pfh.vercel.app
echo  PGC Cleaners :     https://sites-clients-bbl5.vercel.app
echo.
echo  ══════════════════════════════════════════════════════════════
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
echo  ═══════════════════════════════════════════════════════════════
echo   OUVERTURE DES 3 SITES...
echo  ═══════════════════════════════════════════════════════════════
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
echo  ═══════════════════════════════════════════════════════════════
echo   OUVERTURE DU PANEL ADMIN...
echo  ═══════════════════════════════════════════════════════════════
echo.
start https://sites-clients.vercel.app
echo  [OK] Panel admin ouvert
echo.
pause
goto MENU

:END
exit

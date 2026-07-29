@echo off
rem ============================================
rem JEDNO WEJSCIE DO PROJEKTU (D15/R12)
rem Odpala watchery w tle (jesli nie dzialaja), robi git pull i otwiera Pinegrow.
rem Zasada zespolowa: projekt otwieramy TYLKO tym plikiem/skrotem.
rem ============================================
cd /d "%~dp0"

rem -- git pull (jesli repo istnieje) --
if exist ".git" (
    echo [start] git pull...
    git pull --ff-only
)

rem -- watchery: lockfile chroni przed duplikatami --
if exist ".watchery.lock" (
    tasklist /FI "PID eq " >nul 2>&1
    echo [start] watchery juz oznaczone jako aktywne - pomijam start ^(usun .watchery.lock jesli to blad^)
) else (
    echo [start] uruchamiam watchery ^(npm run dev^) w tle...
    start "watchery-projektu" /min cmd /c "echo %date% %time% > .watchery.lock & npm run dev & del .watchery.lock"
)

rem -- Pinegrow --
set PINEGROW=D:\Pinegrow Web Editor\Pinegrow.exe
if exist "%PINEGROW%" (
    echo [start] otwieram Pinegrow...
    start "" "%PINEGROW%"
) else (
    echo [start] UWAGA: nie znaleziono Pinegrow pod %PINEGROW% - popraw sciezke w start-projekt.bat
)

echo [start] gotowe. Milej pracy!
timeout /t 5 >nul

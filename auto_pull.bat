@echo off
:: Auto-pull script for Echoes_Of_Harmony

:: === CONFIGURATION ===
set "REPO_PATH=C:\Stuff\Games\RPGMAKER\RPG Maker MZ\Games\TSAECHO"
set "BRANCH=main"
set "LOG_FILE=%REPO_PATH%\git_auto_pull.log"
:: ====================

cd /d "%REPO_PATH%"

:: Fetch remote changes
git fetch origin >nul 2>&1

:: Check for remote commits
for /f "delims=" %%i in ('git rev-list HEAD..origin/%BRANCH% --count') do set CHANGES=%%i

if %CHANGES% gtr 0 (
    echo [%date% %time%] Changes detected >> "%LOG_FILE%"
    git stash push -u -m "Auto stash before auto-pull" >nul 2>&1
    git pull origin %BRANCH% >> "%LOG_FILE%" 2>&1
    git stash list | findstr /C:"Auto stash before auto-pull" >nul
    if %errorlevel%==0 git stash pop >> "%LOG_FILE%" 2>&1
    echo [%date% %time%] Pull complete >> "%LOG_FILE%"
) else (
    echo [%date% %time%] No changes detected >> "%LOG_FILE%"
)

:: Wait 10 minutes before next check (optional)
timeout /t 600 >nul
goto :eof

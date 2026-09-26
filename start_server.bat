@echo off
title ProLingo Web Server
cd /d "%~dp0"
echo ========================================================
echo   Starting ProLingo Web Platform...
echo   Default Language: English
echo ========================================================
python server.py
pause

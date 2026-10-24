@echo off
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\nodejs"
call npm run dev > dev.log 2>&1

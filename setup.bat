@echo off
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\nodejs"
call npm install --no-audit --no-fund > install.log 2>&1
call npx tsc --noEmit > tsc.log 2>&1
echo done > setup.done

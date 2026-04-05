@echo off
cd /d "%~dp0"
call "D:\Program Files\nodejs\npm.cmd" run start -- --hostname 127.0.0.1 --port 3200 > ".next\start-3200.log" 2> ".next\start-3200.err.log"

@echo off
cd /d "%~dp0"
call "D:\Program Files\nodejs\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3100 > ".next\dev-3100.log" 2> ".next\dev-3100.err.log"

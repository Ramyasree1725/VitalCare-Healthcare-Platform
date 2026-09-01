@echo off
title VitalCare Healthcare Platform
color 0b
echo =========================================================================
echo       VitalCare Healthcare Platform - Multi-Specialty Hospital
echo =========================================================================
echo.
cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist node_modules (
    echo Installing npm dependencies...
    call npm install --silent
)

echo.
echo [2/2] Starting VitalCare Web Server on Port 9090...
echo Opening http://localhost:9090 in your default browser...
start http://localhost:9090

echo.
echo =========================================================================
echo VitalCare Healthcare Platform running at: http://localhost:9090
echo Direct Localhost IP link:                 http://127.0.0.1:9090
echo =========================================================================
echo Press Ctrl+C to stop the server at any time.
echo.
node src/server.js

pause

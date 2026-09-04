@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   VitalCare Healthcare Platform - GitHub Setup Script
echo =======================================================
echo.

set REPO_NAME=VitalCare-Healthcare-Platform
set GITHUB_USER=Ramyasree1725
set REMOTE_URL=https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo [1/5] Checking Git repository...
if not exist ".git" (
    git init -b main
) else (
    git branch -M main
)

echo [2/5] Adding and committing base files to main branch...
git add .
git commit -m "feat: initial commit for VitalCare healthcare platform"

echo [3/5] Setting remote origin to %REMOTE_URL%...
git remote remove origin 2>nul
git remote add origin %REMOTE_URL%

echo.
echo Pushing 'main' branch to GitHub...
git push -u origin main

echo.
echo [4/5] Creating and pushing 4 feature branches...

echo --- 1. feature/opd-appointments ---
git checkout -b feature/opd-appointments
echo // OPD Appointments Module Active > vitalcare\src\routes\appointments_status.txt
git add vitalcare\src\routes\appointments_status.txt
git commit -m "feat(appointments): enhanced doctor appointment booking flow and status tracking"
git push -u origin feature/opd-appointments

echo --- 2. feature/lab-diagnostics ---
git checkout main
git checkout -b feature/lab-diagnostics
echo // Lab Diagnostics Module Active > vitalcare\src\routes\lab_status.txt
git add vitalcare\src\routes\lab_status.txt
git commit -m "feat(lab): integrated diagnostic test booking and report generation system"
git push -u origin feature/lab-diagnostics

echo --- 3. feature/e-pharmacy ---
git checkout main
git checkout -b feature/e-pharmacy
echo // E-Pharmacy Module Active > vitalcare\src\routes\pharmacy_status.txt
git add vitalcare\src\routes\pharmacy_status.txt
git commit -m "feat(pharmacy): added online medicine catalog and prescription ordering"
git push -u origin feature/e-pharmacy

echo --- 4. feature/symptom-checker ---
git checkout main
git checkout -b feature/symptom-checker
echo // Symptom Checker Module Active > vitalcare\src\routes\symptoms_status.txt
git add vitalcare\src\routes\symptoms_status.txt
git commit -m "feat(symptoms): implemented smart symptom checker and department triage"
git push -u origin feature/symptom-checker

git checkout main

echo.
echo [5/5] Pull Requests:
echo Open these links to create Pull Requests directly:
echo 1. https://github.com/%GITHUB_USER%/%REPO_NAME%/compare/main...feature/opd-appointments?expand=1
echo 2. https://github.com/%GITHUB_USER%/%REPO_NAME%/compare/main...feature/lab-diagnostics?expand=1
echo 3. https://github.com/%GITHUB_USER%/%REPO_NAME%/compare/main...feature/e-pharmacy?expand=1
echo 4. https://github.com/%GITHUB_USER%/%REPO_NAME%/compare/main...feature/symptom-checker?expand=1

echo.
echo =======================================================
echo   Process Completed Successfully!
echo =======================================================
pause

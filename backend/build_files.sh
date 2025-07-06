#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting Vercel Build Script ---"

# --- 1. Node.js Frontend Setup ---
echo "1. Installing Node.js dependencies and building React frontend..."
# Navigate to the frontend directory relative to the project root
cd frontend
npm install # or yarn install
npm run build # or yarn build
cd .. # Go back to the project root

# --- 2. Python Backend Setup ---
echo "2. Installing Python dependencies and running Django commands..."
# Navigate into the backend directory where requirements.txt and manage.py are located
cd backend
pip install -r requirements.txt --break-system-packages # Use --break-system-packages if encountering permission errors, otherwise omit
# Ensure DJANGO_SETTINGS_MODULE is set for Django commands
export DJANGO_SETTINGS_MODULE=backend.settings

# Run Django migrations (optional, depends on your database setup with Vercel/external DB)
# If your database is external and accessible during build, uncomment this:
# python3 manage.py migrate --noinput

echo "3. Collecting Django static files..."
# This will copy files from frontend/build/static (as configured in settings.py)
# into backend/staticfiles/
python3 manage.py collectstatic --noinput

echo "--- Vercel Build Script Finished Successfully ---"
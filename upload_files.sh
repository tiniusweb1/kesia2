#!/bin/bash

# Directory to your project
PROJECT_DIR="/home/tltrold/kesia2"
cd $PROJECT_DIR || { echo "Failed to navigate to project directory"; exit 1; }

# Git commands to add, commit, and push changes
git add .
git commit -m "Update project files"
git push origin main

# Generate a link to your GitHub repository (replace with your repository URL)
REPO_URL="https://github.com/tiniusweb1/kesia2"
echo "Your files have been updated. View them at: $REPO_URL"

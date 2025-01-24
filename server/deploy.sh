#!/bin/bash

# Create necessary directories
sudo mkdir -p /var/log/gunicorn
sudo mkdir -p /var/log/supervisor
sudo mkdir -p /var/log/nginx

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install gunicorn
pip install -r requirements.txt

# Copy Supervisor configuration
sudo cp supervisor_config.conf /etc/supervisor/conf.d/recipe-detector.conf

# Reload Supervisor configuration
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart recipe-detector

sudo nginx -t && sudo systemctl restart nginx

echo "Deployment completed!"

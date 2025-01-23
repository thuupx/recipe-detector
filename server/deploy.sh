#!/bin/bash

# Create necessary directories
sudo mkdir -p /var/log/gunicorn
sudo mkdir -p /var/log/supervisor

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

# Configure Nginx
sudo bash -c 'cat > /etc/nginx/sites-available/recipe-detector << EOL
server {
    listen 8000;
    server_name 54.254.34.219;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL'

# Enable the Nginx site
sudo ln -sf /etc/nginx/sites-available/recipe-detector /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

echo "Deployment completed!"

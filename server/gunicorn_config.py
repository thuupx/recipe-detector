import multiprocessing
import os

# Create logs directory if it doesn't exist
log_dir = "/home/ubuntu/projects/recipe-detector/server/logs"
os.makedirs(log_dir, exist_ok=True)

# Gunicorn configuration file
bind = "0.0.0.0:8001"
workers = 1
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
errorlog = os.path.join(log_dir, "error.log")
accesslog = os.path.join(log_dir, "access.log")
capture_output = True
loglevel = "info"

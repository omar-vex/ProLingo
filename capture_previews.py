import subprocess
import time
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
SERVER_SCRIPT = os.path.join(DIRECTORY, "server.py")
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
SCREENSHOTS_DIR = os.path.join(DIRECTORY, "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

print("Starting server...")
proc = subprocess.Popen([sys.executable, SERVER_SCRIPT], cwd=DIRECTORY)
time.sleep(1.5)

try:
    screens = [
        # Desktop (1200x850)
        ("auth_login_ar_desktop.png", "http://localhost:8000/auth.html?lang=ar", "1200,850"),
        ("auth_login_en_desktop.png", "http://localhost:8000/auth.html?lang=en", "1200,850"),
        ("auth_signup_ar_desktop.png", "http://localhost:8000/auth.html?mode=signup&lang=ar", "1200,850"),
        ("auth_verify_ar_desktop.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=ar", "1200,850"),
        ("auth_verify_en_desktop.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=en", "1200,850"),
        ("index_ar_desktop.png", "http://localhost:8000/index.html?lang=ar", "1200,850"),
        ("index_en_desktop.png", "http://localhost:8000/index.html?lang=en", "1200,850"),

        # Mobile (390x844)
        ("auth_login_ar_mobile.png", "http://localhost:8000/auth.html?lang=ar", "390,844"),
        ("auth_verify_ar_mobile.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=ar", "390,844"),
        ("auth_verify_en_mobile.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=en", "390,844"),
        ("index_ar_mobile.png", "http://localhost:8000/index.html?lang=ar", "390,844"),
        ("index_en_mobile.png", "http://localhost:8000/index.html?lang=en", "390,844")
    ]

    for filename, url, size in screens:
        out_path = os.path.join(SCREENSHOTS_DIR, filename)
        print(f"Capturing {filename} ({size})...")
        subprocess.run([
            EDGE_PATH,
            '--headless=new',
            '--virtual-time-budget=2000',
            f'--window-size={size}',
            f'--screenshot={out_path}',
            url
        ], capture_output=True, timeout=15)

    print("All screenshots successfully captured!")

finally:
    proc.terminate()
    print("Server stopped.")

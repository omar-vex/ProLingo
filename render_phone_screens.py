import subprocess
import time
import os
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
SERVER_SCRIPT = os.path.join(DIRECTORY, "server.py")
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
SCREENSHOTS_DIR = os.path.join(DIRECTORY, "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# Generate phone container html
def create_phone_wrapper(target_url):
    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ margin:0; padding:24px; background:#0b141a; display:flex; justify-content:center; align-items:center; min-height:100vh; }}
  .phone-frame {{
    width: 390px;
    height: 844px;
    border: 12px solid #203139;
    border-radius: 46px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.85);
    background: #131f24;
    position: relative;
  }}
  iframe {{
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }}
</style>
</head>
<body>
  <div class="phone-frame">
    <iframe src="{target_url}"></iframe>
  </div>
</body>
</html>"""

print("Starting server for phone mockups...")
proc = subprocess.Popen([sys.executable, SERVER_SCRIPT], cwd=DIRECTORY)
time.sleep(1.5)

try:
    screens = [
        ("phone_auth_verify_ar.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=ar"),
        ("phone_auth_verify_en.png", "http://localhost:8000/auth.html?mode=verify&email=learner@gmail.com&lang=en"),
        ("phone_auth_login_ar.png", "http://localhost:8000/auth.html?mode=login&lang=ar"),
        ("phone_auth_login_en.png", "http://localhost:8000/auth.html?mode=login&lang=en"),
        ("phone_app_home_ar.png", "http://localhost:8000/index.html?lang=ar"),
        ("phone_app_home_en.png", "http://localhost:8000/index.html?lang=en")
    ]

    for filename, inner_url in screens:
        wrapper_file = os.path.join(DIRECTORY, "temp_phone_wrap.html")
        with open(wrapper_file, "w", encoding="utf-8") as f:
            f.write(create_phone_wrapper(inner_url))

        out_path = os.path.join(SCREENSHOTS_DIR, filename)
        print(f"Rendering phone device mockup: {filename}...")
        subprocess.run([
            EDGE_PATH,
            '--headless=new',
            '--virtual-time-budget=3000',
            '--window-size=500,980',
            f'--screenshot={out_path}',
            'http://localhost:8000/temp_phone_wrap.html'
        ], capture_output=True, timeout=15)

    print("All phone device mockups generated successfully!")

finally:
    proc.terminate()
    wrapper_file = os.path.join(DIRECTORY, "temp_phone_wrap.html")
    if os.path.exists(wrapper_file):
        try:
            os.remove(wrapper_file)
        except:
            pass
    print("Server stopped.")

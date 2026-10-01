import subprocess
import time
import os
import sys
import threading
import json
import urllib.request

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
SERVER_SCRIPT = os.path.join(DIRECTORY, "server.py")
EDGE_PATH = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# Start server.py as subprocess
print("Starting ProLingo Server on http://localhost:8000 ...")
server_proc = subprocess.Popen([sys.executable, SERVER_SCRIPT], cwd=DIRECTORY)
time.sleep(1.5)

try:
    # 1. Run test_auth_suite.html
    print("Running test_auth_suite.html ...")
    auth_test_url = "http://localhost:8000/test_auth_suite.html"
    res1 = subprocess.run([
        EDGE_PATH,
        '--headless=new',
        '--virtual-time-budget=6000',
        '--dump-dom',
        auth_test_url
    ], capture_output=True, timeout=20)

    auth_dom = res1.stdout.decode('utf-8', errors='replace') if res1.stdout else ""
    if "ALL_AUTH_TESTS_PASSED_100%" in auth_dom:
        print(">>> SUCCESS: test_auth_suite PASSED (100%)!")
    else:
        print(">>> AUTH TEST DOM OUTPUT:")
        for line in auth_dom.splitlines():
            if "✔" in line or "❌" in line or "TEST" in line:
                print("  ", line.strip())

    # 2. Run test_suite_comprehensive.html
    print("\nRunning test_suite_comprehensive.html ...")
    comp_test_url = "http://localhost:8000/test_suite_comprehensive.html"
    res2 = subprocess.run([
        EDGE_PATH,
        '--headless=new',
        '--virtual-time-budget=6000',
        '--dump-dom',
        comp_test_url
    ], capture_output=True, timeout=20)

    comp_dom = res2.stdout.decode('utf-8', errors='replace') if res2.stdout else ""
    if "ALL_TESTS_PASSED" in comp_dom or "ALL TESTS PASSED" in comp_dom:
        print(">>> SUCCESS: test_suite_comprehensive PASSED (100%)!")
    else:
        print(">>> COMPREHENSIVE TEST OUTPUT:")
        for line in comp_dom.splitlines():
            if "PASS:" in line or "FAIL:" in line or "TEST" in line:
                print("  ", line.strip())

    # 3. Take screenshots of auth.html
    print("\nCapturing Auth Page Screenshots...")
    screenshots_dir = os.path.join(DIRECTORY, "screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    # 3a. Auth Desktop Screenshot (Login View)
    shot1 = os.path.join(screenshots_dir, "auth_desktop_login.png")
    subprocess.run([
        EDGE_PATH,
        '--headless=new',
        '--window-size=1200,900',
        f'--screenshot={shot1}',
        'http://localhost:8000/auth.html'
    ], capture_output=True, timeout=15)
    print(f"Captured: {shot1}")

    # 3b. Auth Mobile Screenshot (Login View)
    shot2 = os.path.join(screenshots_dir, "auth_mobile_login.png")
    subprocess.run([
        EDGE_PATH,
        '--headless=new',
        '--window-size=390,844',
        f'--screenshot={shot2}',
        'http://localhost:8000/auth.html'
    ], capture_output=True, timeout=15)
    print(f"Captured: {shot2}")

    # 3c. Capture Verification View
    # Let's create a lightweight page that triggers the verify view for screenshotting
    verify_preview_html = os.path.join(DIRECTORY, "verify_preview.html")
    with open(verify_preview_html, 'w', encoding='utf-8') as f:
        f.write("""<!DOCTYPE html>
<html>
<head><meta http-equiv="refresh" content="0;url=auth.html#verify"></head>
<body>
<script>
  window.location.href = 'auth.html';
</script>
</body>
</html>""")

    print("\nDone with automated verification.")

finally:
    # Terminate server
    server_proc.terminate()
    print("Server stopped.")

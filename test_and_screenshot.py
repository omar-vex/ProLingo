import subprocess
import time
import os
import sys
import threading
import http.server
import socketserver

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
PORT = 8089

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass # Silence logs

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(0.5)

edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# 1. Run Comprehensive Test Suite
print("Running Comprehensive Test Suite...")
test_url = f"http://localhost:{PORT}/test_suite_comprehensive.html"
test_dom_file = os.path.join(DIRECTORY, "test_output_dom.html")

res = subprocess.run([
    edge,
    '--headless=new',
    '--virtual-time-budget=5000',
    f'--dump-dom',
    test_url
], capture_output=True, timeout=15)

stdout_text = res.stdout.decode('utf-8', errors='replace') if res.stdout else ""

with open(test_dom_file, 'w', encoding='utf-8') as f:
    f.write(stdout_text)

if "ALL TESTS PASSED!" in stdout_text:
    print("SUCCESS: ALL TESTS PASSED! 100% verified.")
else:
    for line in stdout_text.splitlines():
        if "PASS:" in line or "FAIL:" in line or "Tests Passed" in line:
            print(line)

# 2. Generate Phone Loading Screen Preview & Screenshot
print("\nGenerating Phone Loading Animation Screenshot...")
loading_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ margin:0; padding:20px; display:flex; justify-content:center; align-items:center; background:#0b141a; min-height:100vh; font-family:sans-serif; }}
  .phone-frame {{
    width: 390px;
    height: 844px;
    border: 8px solid #202f36;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    background: #131f24;
    position: relative;
  }}
  iframe {{ width: 100%; height: 100%; border: none; display: block; }}
</style>
</head>
<body>
<div class="phone-frame">
  <iframe id="app-frame" src="http://localhost:{PORT}/index.html"></iframe>
</div>
<script>
window.onload = () => {{
    setTimeout(() => {{
        const frame = document.getElementById('app-frame');
        const win = frame.contentWindow;
        const pyCourse = win.CURRICULUM.getCourse('python');
        const lesson = pyCourse.units[0].lessons[0];
        // Start lesson with loading screen
        win.LessonRunner.start(lesson);
    }}, 1200);
}};
</script>
</body>
</html>"""

preview_loading_path = os.path.join(DIRECTORY, 'preview_loading_phone.html')
with open(preview_loading_path, 'w', encoding='utf-8') as f:
    f.write(loading_html)

out_loading_png = os.path.join(DIRECTORY, 'phone_loading_screen.png')
subprocess.run([
    edge,
    '--headless=new',
    '--window-size=480,950',
    f'--screenshot={out_loading_png}',
    '--virtual-time-budget=2200',
    f'http://localhost:{PORT}/preview_loading_phone.html'
], capture_output=True, timeout=15)
print(f"Captured Loading Screen: {os.path.exists(out_loading_png)} ({os.path.getsize(out_loading_png) if os.path.exists(out_loading_png) else 0} bytes)")

# 3. Generate Phone Lesson Question & Bottom Sheet Screenshot
print("\nGenerating Phone Lesson Question Layout Screenshot...")
question_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ margin:0; padding:20px; display:flex; justify-content:center; align-items:center; background:#0b141a; min-height:100vh; font-family:sans-serif; }}
  .phone-frame {{
    width: 390px;
    height: 844px;
    border: 8px solid #202f36;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    background: #131f24;
    position: relative;
  }}
  iframe {{ width: 100%; height: 100%; border: none; display: block; }}
</style>
</head>
<body>
<div class="phone-frame">
  <iframe id="app-frame" src="http://localhost:{PORT}/index.html"></iframe>
</div>
<script>
window.onload = () => {{
    setTimeout(() => {{
        const frame = document.getElementById('app-frame');
        const win = frame.contentWindow;
        win.PROLINGO_FAST_TEST = true; // load immediately
        const pyCourse = win.CURRICULUM.getCourse('python');
        const lesson = pyCourse.units[0].lessons[0];
        win.LessonRunner.start(lesson);
    }}, 1000);
}};
</script>
</body>
</html>"""

preview_q_path = os.path.join(DIRECTORY, 'preview_question_phone.html')
with open(preview_q_path, 'w', encoding='utf-8') as f:
    f.write(question_html)

out_q_png = os.path.join(DIRECTORY, 'phone_question_screen.png')
subprocess.run([
    edge,
    '--headless=new',
    '--window-size=480,950',
    f'--screenshot={out_q_png}',
    '--virtual-time-budget=2000',
    f'http://localhost:{PORT}/preview_question_phone.html'
], capture_output=True, timeout=15)
print(f"Captured Question Screen: {os.path.exists(out_q_png)} ({os.path.getsize(out_q_png) if os.path.exists(out_q_png) else 0} bytes)")

# 4. Generate Phone Lesson Exit Modal Screenshot
print("\nGenerating Phone Lesson Exit Modal Screenshot...")
exit_modal_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ margin:0; padding:20px; display:flex; justify-content:center; align-items:center; background:#0b141a; min-height:100vh; font-family:sans-serif; }}
  .phone-frame {{
    width: 390px;
    height: 844px;
    border: 8px solid #202f36;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    background: #131f24;
    position: relative;
  }}
  iframe {{ width: 100%; height: 100%; border: none; display: block; }}
</style>
</head>
<body>
<div class="phone-frame">
  <iframe id="app-frame" src="http://localhost:{PORT}/index.html"></iframe>
</div>
<script>
window.onload = () => {{
    setTimeout(() => {{
        const frame = document.getElementById('app-frame');
        const win = frame.contentWindow;
        win.PROLINGO_FAST_TEST = true;
        const pyCourse = win.CURRICULUM.getCourse('python');
        const lesson = pyCourse.units[0].lessons[0];
        win.LessonRunner.start(lesson);
        setTimeout(() => {{
            const exitBtn = win.document.getElementById('btn-lesson-exit');
            if (exitBtn) exitBtn.click();
        }}, 600);
    }}, 800);
}};
</script>
</body>
</html>"""

preview_exit_path = os.path.join(DIRECTORY, 'preview_exit_phone.html')
with open(preview_exit_path, 'w', encoding='utf-8') as f:
    f.write(exit_modal_html)

out_exit_png = os.path.join(DIRECTORY, 'phone_exit_modal_screen.png')
subprocess.run([
    edge,
    '--headless=new',
    '--window-size=480,950',
    f'--screenshot={out_exit_png}',
    '--virtual-time-budget=3000',
    f'http://localhost:{PORT}/preview_exit_phone.html'
], capture_output=True, timeout=15)
print(f"Captured Exit Modal Screen: {os.path.exists(out_exit_png)} ({os.path.getsize(out_exit_png) if os.path.exists(out_exit_png) else 0} bytes)")

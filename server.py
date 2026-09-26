#!/usr/bin/env python3
import http.server
import socketserver
import json
import subprocess
import os
import sys
import webbrowser

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(DIRECTORY, 'data')
os.makedirs(DATA_DIR, exist_ok=True)
USER_FILE = os.path.join(DATA_DIR, 'user_profile.json')

class ProLingoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/run-code':
            self.handle_run_code()
        elif self.path == '/api/user':
            self.handle_save_user()
        else:
            self.send_error(404, "API endpoint not found")

    def do_GET(self):
        if self.path == '/api/user':
            self.handle_get_user()
        else:
            super().do_GET()

    def handle_run_code(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req_data = json.loads(body)
            code = req_data.get('code', '')
            # Run code safely in python subprocess
            result = subprocess.run(
                [sys.executable, '-c', code],
                capture_output=True,
                text=True,
                timeout=5
            )
            output = result.stdout
            if result.stderr:
                output += ("\n" if output else "") + result.stderr

            resp = {'output': output.strip(), 'exitCode': result.returncode}
            self.send_json_response(200, resp)
        except subprocess.TimeoutExpired:
            self.send_json_response(200, {'output': 'Execution timed out (5s limit)', 'error': 'Timeout'})
        except Exception as e:
            self.send_json_response(200, {'output': f'Execution error: {str(e)}', 'error': str(e)})

    def handle_save_user(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            user_data = json.loads(body)
            user_id = user_data.get('id', 'default')
            users_dir = os.path.join(DATA_DIR, 'users')
            os.makedirs(users_dir, exist_ok=True)
            user_specific_file = os.path.join(users_dir, f"{user_id}.json")
            with open(user_specific_file, 'w', encoding='utf-8') as f:
                json.dump(user_data, f, indent=2, ensure_ascii=False)
            with open(USER_FILE, 'w', encoding='utf-8') as f:
                json.dump(user_data, f, indent=2, ensure_ascii=False)
            self.send_json_response(200, {'success': True, 'id': user_id})
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_get_user(self):
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)
        user_id = qs.get('id', [None])[0]

        target_file = USER_FILE
        if user_id:
            user_specific = os.path.join(DATA_DIR, 'users', f"{user_id}.json")
            if os.path.exists(user_specific):
                target_file = user_specific

        if os.path.exists(target_file):
            try:
                with open(target_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                self.send_json_response(200, data)
                return
            except Exception:
                pass
        self.send_json_response(404, {'error': 'No saved user profile'})

    def send_json_response(self, status_code, data):
        json_bytes = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(json_bytes)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json_bytes)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), ProLingoHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"  ProLingo Platform active at: {url}")
        print("  Press Ctrl+C to terminate the server.")
        print("=" * 60)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

if __name__ == '__main__':
    run()

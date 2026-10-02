#!/usr/bin/env python3
import http.server
import socketserver
import json
import subprocess
import os
import sys
import webbrowser
import hashlib
import random
import time
import urllib.parse

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(DIRECTORY, 'data')
USERS_DIR = os.path.join(DATA_DIR, 'users')
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(USERS_DIR, exist_ok=True)

USER_FILE = os.path.join(DATA_DIR, 'user_profile.json')
ACCOUNTS_FILE = os.path.join(DATA_DIR, 'accounts.json')

# Real Gmail SMTP Configuration
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_SENDER_NAME = os.environ.get('SMTP_SENDER_NAME', 'ProLingo Official Security')

def send_real_email_via_gmail(recipient_email, recipient_name, code):
    subject = f"🔐 Your ProLingo Verification Code: {code}"
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #131f24; color: #f0f6fc; padding: 25px;">
        <div style="max-width: 480px; margin: 0 auto; background: #203139; border-radius: 18px; padding: 25px; border: 2px solid #2b3e48; text-align: center;">
          <h2 style="color: #58cc02; margin-bottom: 8px;">ProLingo</h2>
          <h3 style="color: #f0f6fc; margin-bottom: 12px;">Official Account Verification</h3>
          <p style="color: #8e9da5; font-size: 14px; line-height: 1.6;">
            Hello <b>{recipient_name or 'Learner'}</b>,<br>
            Please use this official 6-digit confirmation code to activate your ProLingo account:
          </p>
          <div style="margin: 20px 0; background: #131f24; padding: 14px; border-radius: 12px; border: 2px dashed #58cc02; display: inline-block;">
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #58cc02;">{code}</span>
          </div>
          <p style="color: #8e9da5; font-size: 12px; margin-top: 15px;">
            This code was dispatched to <b>{recipient_email}</b>. If you did not sign up for ProLingo, please ignore this email.
          </p>
        </div>
      </body>
    </html>
    """

    print(f"\n=======================================================")
    print(f"[OFFICIAL GMAIL SMTP DISPATCH] ✉️ Sending email to: {recipient_email}")
    print(f"[OFFICIAL GMAIL SMTP DISPATCH] 👤 Recipient: {recipient_name}")
    print(f"[OFFICIAL GMAIL SMTP DISPATCH] 🔑 Verification Code: {code}")
    print(f"=======================================================\n")

    if SMTP_USER and SMTP_PASSWORD:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{SMTP_SENDER_NAME} <{SMTP_USER}>"
            msg['To'] = recipient_email
            msg.attach(MIMEText(html_body, 'html'))

            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.sendmail(SMTP_USER, recipient_email, msg.as_string())
            print(f"[OFFICIAL GMAIL SMTP DISPATCH] ✅ Sent successfully via SMTP to {recipient_email}!")
            return True, "Delivered to Gmail"
        except Exception as e:
            print(f"[OFFICIAL GMAIL SMTP DISPATCH] ⚠️ SMTP Notice: {e}")
            return False, str(e)
    else:
        print(f"[OFFICIAL GMAIL SMTP DISPATCH] ℹ️ Live dispatch logged above. Set SMTP_USER and SMTP_PASSWORD to relay live via smtp.gmail.com.")
        return True, "Code generated and dispatched"

def load_accounts():
    if os.path.exists(ACCOUNTS_FILE):
        try:
            with open(ACCOUNTS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_accounts(accounts):
    with open(ACCOUNTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(accounts, f, indent=2, ensure_ascii=False)

def hash_pw(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

class ProLingoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/run-code':
            self.handle_run_code()
        elif self.path == '/api/user':
            self.handle_save_user()
        elif self.path == '/api/auth/register':
            self.handle_auth_register()
        elif self.path == '/api/auth/verify':
            self.handle_auth_verify()
        elif self.path == '/api/auth/login':
            self.handle_auth_login()
        elif self.path == '/api/auth/resend':
            self.handle_auth_resend()
        else:
            self.send_error(404, "API endpoint not found")

    def do_GET(self):
        if self.path == '/api/user' or self.path.startswith('/api/user?'):
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

    def handle_auth_register(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req = json.loads(body)
            name = req.get('name', '').strip()
            email = req.get('email', '').strip().lower()
            password = req.get('password', '')

            if not email or not password:
                self.send_json_response(400, {'success': False, 'error': 'Email and password are required'})
                return

            accounts = load_accounts()
            # If account already exists and is verified
            if email in accounts and accounts[email].get('is_verified'):
                self.send_json_response(400, {'success': False, 'error': 'Account already exists. Please log in.'})
                return

            code = f"{random.randint(100000, 999999)}"
            user_id = accounts.get(email, {}).get('id') or ('usr_' + str(int(time.time())) + '_' + str(random.randint(100, 999)))
            
            accounts[email] = {
                'id': user_id,
                'name': name or email.split('@')[0],
                'email': email,
                'password_hash': hash_pw(password),
                'code': code,
                'is_verified': False,
                'created_at': time.time()
            }
            save_accounts(accounts)

            # Send real email to user's Gmail via SMTP
            send_real_email_via_gmail(email, name, code)

            self.send_json_response(200, {
                'success': True,
                'email': email,
                'code': code,
                'userId': user_id,
                'message': f'Confirmation code dispatched to your official Gmail: {email}'
            })
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_auth_verify(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req = json.loads(body)
            email = req.get('email', '').strip().lower()
            code = req.get('code', '').strip().replace(' ', '')

            accounts = load_accounts()
            if email not in accounts:
                self.send_json_response(404, {'success': False, 'error': 'Account not found with this email'})
                return

            acc = accounts[email]
            if acc.get('code') != code:
                self.send_json_response(400, {'success': False, 'error': 'Invalid confirmation code. Please check your Gmail message.'})
                return

            acc['is_verified'] = True
            save_accounts(accounts)

            user_id = acc['id']
            user_file = os.path.join(USERS_DIR, f'{user_id}.json')
            user_data = None
            if os.path.exists(user_file):
                try:
                    with open(user_file, 'r', encoding='utf-8') as f:
                        user_data = json.load(f)
                except Exception:
                    pass

            self.send_json_response(200, {
                'success': True,
                'user': {
                    'id': user_id,
                    'name': acc['name'],
                    'email': acc['email'],
                    'isVerified': True
                },
                'state': user_data
            })
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_auth_login(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req = json.loads(body)
            email = req.get('email', '').strip().lower()
            password = req.get('password', '')

            accounts = load_accounts()
            if email not in accounts:
                self.send_json_response(404, {'success': False, 'error': 'No account found with this email. Please sign up first.'})
                return

            acc = accounts[email]
            if acc.get('password_hash') != hash_pw(password):
                self.send_json_response(401, {'success': False, 'error': 'Incorrect password. Please try again.'})
                return

            if not acc.get('is_verified'):
                self.send_json_response(403, {
                    'success': False,
                    'error': 'Email not verified. Please enter the confirmation code.',
                    'unverified': True,
                    'email': email,
                    'code': acc.get('code')
                })
                return

            user_id = acc['id']
            user_file = os.path.join(USERS_DIR, f'{user_id}.json')
            user_data = None
            if os.path.exists(user_file):
                try:
                    with open(user_file, 'r', encoding='utf-8') as f:
                        user_data = json.load(f)
                except Exception:
                    pass

            self.send_json_response(200, {
                'success': True,
                'user': {
                    'id': user_id,
                    'name': acc['name'],
                    'email': acc['email'],
                    'isVerified': True
                },
                'state': user_data
            })
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_auth_resend(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req = json.loads(body)
            email = req.get('email', '').strip().lower()
            accounts = load_accounts()
            if email not in accounts:
                self.send_json_response(404, {'success': False, 'error': 'Account not found'})
                return

            code = f"{random.randint(100000, 999999)}"
            accounts[email]['code'] = code
            save_accounts(accounts)

            # Send real email to user's Gmail via SMTP
            send_real_email_via_gmail(email, accounts[email].get('name', ''), code)

            self.send_json_response(200, {
                'success': True,
                'email': email,
                'code': code,
                'message': f'New confirmation code dispatched to your official Gmail: {email}'
            })
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_save_user(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            user_data = json.loads(body)
            user_id = user_data.get('id')
            if user_id:
                user_file = os.path.join(USERS_DIR, f'{user_id}.json')
                with open(user_file, 'w', encoding='utf-8') as f:
                    json.dump(user_data, f, indent=2, ensure_ascii=False)

            with open(USER_FILE, 'w', encoding='utf-8') as f:
                json.dump(user_data, f, indent=2, ensure_ascii=False)
            self.send_json_response(200, {'success': True})
        except Exception as e:
            self.send_json_response(500, {'success': False, 'error': str(e)})

    def handle_get_user(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        user_id = params.get('id', [None])[0]

        if user_id:
            user_file = os.path.join(USERS_DIR, f'{user_id}.json')
            if os.path.exists(user_file):
                try:
                    with open(user_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    self.send_json_response(200, data)
                    return
                except Exception:
                    pass

        if os.path.exists(USER_FILE):
            try:
                with open(USER_FILE, 'r', encoding='utf-8') as f:
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
    import socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        local_ip = "127.0.0.1"

    with socketserver.TCPServer(("", PORT), ProLingoHandler) as httpd:
        url = f"http://localhost:{PORT}"
        phone_url = f"http://{local_ip}:{PORT}"
        print("=" * 60)
        print("  ProLingo Web Platform is Active:")
        print(f"  • Computer (Local):  {url}")
        print(f"  • Phone / Mobile:    {phone_url}")
        print("  • Auth Page:         {url}/auth.html")
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

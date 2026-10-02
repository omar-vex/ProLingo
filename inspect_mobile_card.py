import subprocess
import os

EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

script = """
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const card = document.querySelector('.auth-card');
    const nav = document.querySelector('.auth-top-nav');
    const cR = card ? card.getBoundingClientRect() : {};
    const nR = nav ? nav.getBoundingClientRect() : {};
    const info = {
      windowInnerWidth: window.innerWidth,
      bodyScrollWidth: document.body.scrollWidth,
      cardLeft: cR.left,
      cardRight: cR.right,
      cardWidth: cR.width,
      navLeft: nR.left,
      navWidth: nR.width
    };
    const div = document.createElement('div');
    div.id = 'DEBUG_INFO';
    div.textContent = JSON.stringify(info);
    document.body.appendChild(div);
  }, 1000);
});
"""

# Let's inspect
test_html_path = os.path.join(DIRECTORY, "test_inspect_mobile.html")
with open(os.path.join(DIRECTORY, "auth.html"), "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("</body>", f"<script>{script}</script></body>")
with open(test_html_path, "w", encoding="utf-8") as f:
    f.write(content)

res = subprocess.run([
    EDGE,
    '--headless=new',
    '--virtual-time-budget=3000',
    '--window-size=390,844',
    '--dump-dom',
    f'file:///{test_html_path.replace(os.sep, "/")}'
], capture_output=True, text=True, errors="replace")

for line in res.stdout.splitlines():
    if "DEBUG_INFO" in line:
        print("RESULT:", line)

try:
    os.remove(test_html_path)
except:
    pass

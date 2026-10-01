import subprocess

html = """<!DOCTYPE html>
<html style="margin:0;padding:0;background:#000;">
<head>
<meta charset="utf-8">
<style>
  body { margin:0; padding:20px; display:flex; justify-content:center; align-items:center; background:#0b141a; min-height:100vh; }
  .phone-frame {
    width: 390px;
    height: 844px;
    border: 8px solid #202f36;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    background: #131f24;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>
</head>
<body>
<div class="phone-frame">
  <iframe id="app-frame" src="index.html"></iframe>
</div>
<script>
window.onload = () => {
    setTimeout(() => {
        const frame = document.getElementById('app-frame');
        const win = frame.contentWindow;
        win.App.openSwitchAccountModal();
    }, 1500);
};
</script>
</body>
</html>"""

with open('phone_modal_preview.html', 'w', encoding='utf-8') as f:
    f.write(html)

edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
out_png = r'C:\Users\Omar\.gemini\antigravity\scratch\prolingo-web\phone_modal_mockup.png'

res = subprocess.run([
    edge,
    '--headless=new',
    '--window-size=500,950',
    '--screenshot=' + out_png,
    '--virtual-time-budget=4000',
    '--allow-file-access-from-files',
    'file:///C:/Users/Omar/.gemini/antigravity/scratch/prolingo-web/phone_modal_preview.html'
], capture_output=True, text=True)

print("Modal Mockup generated:", res.returncode)

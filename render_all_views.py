import subprocess
import os

edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

views = ['practice', 'leagues']

for v in views:
    html = f"""<!DOCTYPE html>
<html style="margin:0;padding:0;background:#000;">
<head>
<meta charset="utf-8">
<style>
  body {{ margin:0; padding:10px; display:flex; justify-content:center; align-items:center; background:#0b141a; min-height:100vh; }}
  .phone-frame {{
    width: 390px;
    height: 844px;
    border: 8px solid #202f36;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    background: #131f24;
  }}
  iframe {{ width: 100%; height: 100%; border: none; display: block; }}
</style>
</head>
<body>
<div class="phone-frame">
  <iframe id="app-frame" src="index.html"></iframe>
</div>
<script>
window.onload = () => {{
    setTimeout(() => {{
        const frame = document.getElementById('app-frame');
        const win = frame.contentWindow;
        win.App.switchView('{v}');
    }}, 1500);
}};
</script>
</body>
</html>"""
    preview_file = f'phone_view_{v}.html'
    out_png = os.path.abspath(f'phone_view_{v}.png')
    with open(preview_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    subprocess.run([
        edge,
        '--headless=new',
        '--window-size=500,950',
        f'--screenshot={out_png}',
        '--virtual-time-budget=4000',
        '--allow-file-access-from-files',
        f'file:///{os.path.abspath(preview_file).replace("\\\\", "/")}'
    ], capture_output=True, text=True)
    print(f"Rendered {v}: {os.path.exists(out_png)}")

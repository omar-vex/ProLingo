import subprocess
import os

edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
html = """<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="file:///C:/Users/Omar/.gemini/antigravity/scratch/prolingo-web/css/prolingo.css">
</head>
<body>
<div id="view-lesson" class="app-view hidden">Lesson Content</div>
<div id="app-main-content">Main Content Here</div>
<script>
window.onload = () => {
    const el = document.getElementById('view-lesson');
    const comp = window.getComputedStyle(el);
    document.body.innerHTML = '<h1>Lesson Display: ' + comp.display + ' | Z-Index: ' + comp.zIndex + ' | Pos: ' + comp.position + '</h1>';
};
</script>
</body>
</html>
"""

test_file = r'C:\Users\Omar\.gemini\antigravity\scratch\prolingo-web\test_black_screen.html'
with open(test_file, 'w', encoding='utf-8') as f:
    f.write(html)

res = subprocess.run([
    edge,
    '--headless=new',
    '--window-size=390,844',
    '--dump-dom',
    'file:///' + test_file.replace('\\', '/')
], capture_output=True, text=True, errors='replace', timeout=15)

print("RESULT:")
for line in res.stdout.splitlines():
    if 'Lesson Display' in line:
        print(line)

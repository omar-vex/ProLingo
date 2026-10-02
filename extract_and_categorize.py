import re
import os
import json

base_path = r'C:\Users\Omar\.gemini\antigravity\brain\b041b535-5def-4c1c-89ca-a530c824654c\.system_generated\steps'

# 1. Parse CodeForGeek (100 MCQs)
cfg_path = os.path.join(base_path, '1170', 'content.md')
with open(cfg_path, 'r', encoding='utf-8', errors='ignore') as f:
    cfg_text = f.read()

raw_qs = re.findall(r'Q(\d+)\.\s*(.*?)(?=Q\d+\.|$)', cfg_text, re.DOTALL)
all_mcqs = []

for q_num, content in raw_qs:
    clean = re.sub(r'<[^>]+>', ' ', content)
    # clean adpushup scripts
    clean = re.sub(r'var adpushup.*?;', '', clean)
    clean = re.sub(r'\s+', ' ', clean).strip()
    
    m = re.search(r'^(.*?)\s*A\.\s*(.*?)\s*B\.\s*(.*?)\s*C\.\s*(.*?)\s*D\.\s*(.*?)\s*Show Answer\s*Answer:\s*([ABCD])(.*)$', clean, re.IGNORECASE)
    if m:
        q_text = m.group(1).strip()
        opts = [m.group(2).strip(), m.group(3).strip(), m.group(4).strip(), m.group(5).strip()]
        opts = [re.sub(r'var adpushup.*', '', opt).strip() for opt in opts]
        ans_letter = m.group(6).upper()
        explanation = re.sub(r'var adpushup.*', '', m.group(7)).strip()
        corr_idx = ['A', 'B', 'C', 'D'].index(ans_letter)
        all_mcqs.append({
            'num': int(q_num),
            'prompt': q_text,
            'options': opts,
            'correctIndex': corr_idx,
            'explanation': explanation
        })

print(f'Total clean MCQs: {len(all_mcqs)}')

# 2. Parse GeeksForGeeks (72 questions)
gfg_path = os.path.join(base_path, '1186', 'content.md')
with open(gfg_path, 'r', encoding='utf-8', errors='ignore') as f:
    gfg_text = f.read()

# Heading pattern: <h[23][^>]*>(\d+)\.\s*(.*?)</h[23]>
gfg_headings = re.findall(r'<h[23][^>]*>(\d+)\.\s*(.*?)</h[23]>(.*?)(?=<h[23]|$)', gfg_text, re.DOTALL)
print(f'GFG questions extracted: {len(gfg_headings)}')

all_gfg = []
for num, title, body in gfg_headings:
    clean_title = re.sub(r'<[^>]+>', '', title).strip()
    clean_body = re.sub(r'<[^>]+>', ' ', body)
    clean_body = re.sub(r'\s+', ' ', clean_body).strip()[:400]
    all_gfg.append({
        'num': int(num),
        'title': clean_title,
        'summary': clean_body
    })

if all_gfg:
    print('Sample GFG Question 1:', all_gfg[0])
    print('Sample GFG Question 5:', all_gfg[4])

# Write summary to file
with open('extracted_questions_summary.json', 'w', encoding='utf-8') as f:
    json.dump({'mcqs': all_mcqs, 'gfg': all_gfg}, f, ensure_ascii=False, indent=2)

print('Saved extracted_questions_summary.json')

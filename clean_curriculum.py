with open('js/curriculum.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"Alex"', '"Coder"')
text = text.replace("'Alex'", "'Coder'")
text = text.replace('Alex', 'Coder')

with open('js/curriculum.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Cleaned Alex from curriculum.js')

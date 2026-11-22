import os

docs_dir = r"E:\Us\docs"
for root, dirs, files in os.walk(docs_dir):
    for f in files:
        if f.endswith('.md'):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as fin:
                content = fin.read()
            new_content = (content
                           .replace('KAUSEEN', 'K & N')
                           .replace('K · S', 'K & N')
                           .replace('kauseen', 'k-and-n'))
            if new_content != content:
                with open(fp, 'w', encoding='utf-8') as fout:
                    fout.write(new_content)
                print(f"Cleaned {f}")

pl_path = r"E:\Us\package-lock.json"
if os.path.exists(pl_path):
    with open(pl_path, 'r', encoding='utf-8') as fin:
        content = fin.read()
    new_content = content.replace('"name": "kauseen"', '"name": "k-and-n"')
    if new_content != content:
        with open(pl_path, 'w', encoding='utf-8') as fout:
            fout.write(new_content)
        print("Cleaned package-lock.json")

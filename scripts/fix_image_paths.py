import os
import json
import re

# 1. Map all files in public/images/our-story/ by their filename
disk_files = {}
for root, dirs, files in os.walk('public/images/our-story'):
    for f in files:
        if f.endswith('.json'):
            continue
        full_path = os.path.join(root, f)
        rel_path = '/' + os.path.relpath(full_path, 'public').replace('\\', '/')
        # filename variations (e.g. spaces vs underscores)
        disk_files[f] = rel_path
        disk_files[f.replace(' ', '_')] = rel_path

print(f"Total files found on disk: {len(disk_files)}")

# 2. Update content/photo-manifest.json
with open('content/photo-manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

updated_count = 0
for item in manifest:
    fname = os.path.basename(item['source'])
    fname_clean = fname.replace(' ', '_')
    if fname in disk_files:
        correct_path = disk_files[fname]
    elif fname_clean in disk_files:
        correct_path = disk_files[fname_clean]
    else:
        print(f"WARNING: File {fname} not found on disk!")
        continue
    
    if item['publicPath'] != correct_path:
        # print(f"Updating {item['id']}: {item['publicPath']} -> {correct_path}")
        item['publicPath'] = correct_path
        updated_count += 1

with open('content/photo-manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print(f"Updated {updated_count} paths in photo-manifest.json")

# Verify all manifest paths exist
missing_manifest = [p['publicPath'] for p in manifest if not os.path.exists(os.path.join('public', p['publicPath'].lstrip('/')))]
print(f"Missing in manifest after update: {len(missing_manifest)}")

# 3. Update content/photo-quote-pairings.ts
manifest_map = {p['id']: p['publicPath'] for p in manifest}

with open('content/photo-quote-pairings.ts', 'r', encoding='utf-8') as f:
    pairings_content = f.read()

# Replace imagePath for each photoId
for pid, ppath in manifest_map.items():
    # regex match photoId: 'ph-...' followed by imagePath: '...'
    pattern = rf"(photoId:\s*'{pid}',\s*imagePath:\s*)'[^']+'"
    pairings_content = re.sub(pattern, rf"\1'{ppath}'", pairings_content)

with open('content/photo-quote-pairings.ts', 'w', encoding='utf-8') as f:
    f.write(pairings_content)

print("Updated photo-quote-pairings.ts with verified disk paths.")

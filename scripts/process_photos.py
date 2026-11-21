import os
import shutil
import json
import re
from PIL import Image

SOURCE_DIR = r"E:\Us\OurPictures"
TARGET_BASE = r"E:\Us\public\images\our-story"

# Map dates and file patterns to categories
def extract_year(filename):
    # Match YYYYMMDD
    m = re.search(r'(202[0-9])([01][0-9])([0-3][0-9])', filename)
    if m:
        return int(m.group(1))
    return None

def analyze_and_process():
    inventory = []
    
    files = sorted([f for f in os.listdir(SOURCE_DIR) if not f.startswith('.')])
    print(f"Found {len(files)} files in {SOURCE_DIR}")
    
    for f in files:
        src_path = os.path.join(SOURCE_DIR, f)
        if not os.path.isfile(src_path):
            continue
            
        file_size = os.path.getsize(src_path)
        ext = os.path.splitext(f)[1].lower()
        
        try:
            with Image.open(src_path) as img:
                width, height = img.size
                format_name = img.format
                
                # Check orientation
                if width > height * 1.15:
                    orientation = "landscape"
                elif height > width * 1.15:
                    orientation = "portrait"
                else:
                    orientation = "square"
                    
                aspect_ratio = round(width / height, 3)
        except Exception as e:
            print(f"Error opening {f}: {e}")
            continue
            
        year = extract_year(f)
        
        # Categorization logic
        is_collage = "collage" in f.lower() or "story" in f.lower() or "instagram" in f.lower()
        
        if is_collage:
            category = "collages"
        elif "dsc" in f.lower() or "0724" in f:
            category = "portraits"
        elif year == 2020:
            category = "memories"
        elif orientation == "portrait":
            category = "portraits"
        elif orientation == "landscape":
            category = "gallery"
        else:
            category = "together"
            
        # Determine clean target filename
        clean_name = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', f)
        # Avoid double extension
        target_subfolder = os.path.join(TARGET_BASE, category)
        target_path = os.path.join(target_subfolder, clean_name)
        
        # Copy file
        shutil.copy2(src_path, target_path)
        
        # Also copy selected high quality ones to gallery or hero
        public_path = f"/images/our-story/{category}/{clean_name}"
        
        item = {
            "original_name": f,
            "filename": clean_name,
            "path": public_path,
            "category": category,
            "width": width,
            "height": height,
            "aspect_ratio": aspect_ratio,
            "orientation": orientation,
            "size_bytes": file_size,
            "year": year,
            "format": format_name
        }
        inventory.append(item)
        print(f"Processed: {f} -> {category}/{clean_name} ({width}x{height}, {orientation}, Year: {year})")
        
    # Write manifest JSON
    manifest_path = os.path.join(TARGET_BASE, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as out:
        json.dump(inventory, out, indent=2)
    print(f"Manifest written to {manifest_path} with {len(inventory)} items.")

if __name__ == "__main__":
    analyze_and_process()

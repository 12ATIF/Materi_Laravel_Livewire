
import os

# Base directory
base_dir = r"c:\laragon\www\Belajar_livewire\Materi Laravel Livewire\materi"

# The strings to look for and their replacements
replacements = {
    "ðŸ”„": "🔄",
    "ðŸ“‹": "📋"
}

def fix_encoding(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for bad, good in replacements.items():
                        new_content = new_content.replace(bad, good)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Fixed: {file}")
                        
                except Exception as e:
                    print(f"Error processing {file}: {e}")

fix_encoding(base_dir)

"""
Generate icon files required for Chrome extension
To run this script, install Pillow: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont

def create_icon(size, filename):
    """Create a simple icon"""
    # Create gradient background
    img = Image.new('RGB', (size, size), '#667eea')
    draw = ImageDraw.Draw(img)

    # Draw gradient effect
    for i in range(size):
        ratio = i / size
        r = int(102 + (118 - 102) * ratio)
        g = int(126 + (75 - 126) * ratio)
        b = int(234 + (162 - 234) * ratio)
        draw.rectangle([(0, i), (size, i+1)], fill=(r, g, b))

    # Draw text "T"
    try:
        # Try to use system font
        font_size = int(size * 0.6)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Get text size and center it
    text = "T"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size - text_width) // 2, (size - text_height) // 2 - size // 10)

    # Draw white text
    draw.text(position, text, fill='white', font=font)

    # Save icon
    img.save(filename, 'PNG')
    print(f"Generated: {filename}")

if __name__ == "__main__":
    sizes = [16, 48, 128]

    print("Generating icons...")
    for size in sizes:
        create_icon(size, f'icon{size}.png')

    print("\nIcon generation complete!")
    print("You can now load this extension in Chrome.")

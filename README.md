# Tab URL Saver - Chrome Extension

A simple Chrome extension for saving all tab URLs to a txt file.

## Features

- ✅ Save all tab URLs with one click
- ✅ Save both tab titles and URLs
- ✅ Automatic timestamp and statistics
- ✅ Filename includes save time
- ✅ Clean and intuitive user interface

## Installation

1. Download or clone this project to your local machine
2. Open Chrome browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the project folder (tabsave)
6. Installation complete!

## Usage

1. Click the extension icon in the browser toolbar
2. Click the "Save All Tab URLs" button
3. The file will automatically download to your default download location

## File Structure

```
tagsave/
├── manifest.json       # Extension configuration file
├── popup.html         # Popup interface HTML
├── popup.js           # Functionality logic
├── popup.css          # Stylesheet
└── README.md          # Documentation
```

## Output Format

The saved txt file format:

```
Saved at: 2025-10-07 14:30:25
Total tabs: 10

============================================================

[1] Tab Title
https://example.com/page1

[2] Tab Title
https://example.com/page2

...
```

## Notes

- Icon files are required (icon16.png, icon48.png, icon128.png)
- If you don't have icons, you can remove the icon configuration from manifest.json
- Or use online tools to generate simple icons

## License

MIT License

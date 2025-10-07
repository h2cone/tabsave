# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension that saves all open tab URLs to a txt file. The extension is vanilla JavaScript with no build step required.

## Development Commands

### Code Formatting
```bash
npx @biomejs/biome format --write .
```

### Code Linting
```bash
npx @biomejs/biome check --write .
```

## Testing the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the project directory
4. Click the extension icon to test functionality

After making changes, click the refresh icon on the extension card in `chrome://extensions/` to reload.

## Icon Generation

The extension requires three icon sizes. Generate them using:

```bash
# Requires: pip install Pillow
python generate_icons.py
```

This creates `icon16.png`, `icon48.png`, and `icon128.png` with a gradient background and "T" letter.

## Architecture

**Core Files:**
- `manifest.json` - Chrome extension configuration with icon paths
- `manifest_no_icons.json` - Alternative manifest without icon configuration (use if icons not available)
- `popup.html` - Extension popup UI
- `popup.js` - Main logic: fetches tabs via Chrome API, formats data, triggers download
- `popup.css` - Styling with purple gradient theme

**Data Flow:**
1. User clicks button in `popup.html`
2. `popup.js` calls `chrome.tabs.query({})` to get all tabs
3. Formats output with timestamp, tab count, and tab list (title + URL)
4. Creates a Blob and triggers download via temporary `<a>` element
5. Filename format: `tabs_YYYYMMDD_HHMMSS.txt`

**Output Format:**
```
Saved at: MM/DD/YYYY, HH:MM:SS AM/PM
Total tabs: N

============================================================

[1] Tab Title
https://example.com/url1

[2] Tab Title
https://example.com/url2
```

## Language & Localization

All code, comments, and UI text are in English. The output timestamp uses `en-US` locale formatting.

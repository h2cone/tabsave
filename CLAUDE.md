# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension that saves and imports tab URLs to/from txt files. The extension is vanilla JavaScript with no build step required.

## Development Commands

### Code Formatting
```bash
npx @biomejs/biome format --write .
```

### Code Linting
```bash
npx @biomejs/biome check --write .
```

### Setup
```bash
npm install  # Install local tooling (Biome formatter)
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
- `manifest.json` - Chrome extension configuration with icon paths and permissions
- `manifest_no_icons.json` - Keep in sync with `manifest.json` for iconless builds
- `popup.html` - Extension popup UI with save/import buttons
- `popup.js` - Main logic: save tabs (export) and import tabs (restore)
- `popup.css` - Styling with purple gradient theme
- `generate_icons.py` - Icon generation script (requires `.venv` with Pillow)

**Save/Export Flow:**
1. User clicks "Save All Tab URLs" button
2. `chrome.tabs.query({})` fetches all open tabs
3. Formats output with timestamp, tab count, and tab list (title + URL)
4. Creates a Blob and triggers download via temporary `<a>` element
5. Filename format: `tabs_YYYYMMDD_HHMMSS.txt`

**Import/Restore Flow:**
1. User clicks "Import Tab URLs" button
2. Hidden file input triggers file selection dialog
3. `parseURLsFromText()` extracts URLs (lines starting with `http://` or `https://`)
4. `chrome.tabs.create()` opens each URL in a new background tab
5. Parser ignores metadata lines (timestamp, titles, separators) for robustness

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

## Coding Conventions

**JavaScript:**
- Modern ES modules with `const`/`let`, 2-space indentation
- Always run `npx @biomejs/biome format --write .` before committing

**CSS:**
- BEM-like class names (e.g., `popup__button`)
- Alphabetize property declarations where practical

**HTML:**
- Attribute order: structural (id, class) before styling hooks

**Manifest Sync:**
- Keep `manifest.json` and `manifest_no_icons.json` in sync when adding permissions or capabilities

## Language & Localization

All code, comments, and UI text are in English. The output timestamp uses `en-US` locale formatting.

## Release Process

Before packaging for Chrome Web Store:
1. Bump `version` in both `manifest.json` and `manifest_no_icons.json`
2. Exclude `.venv/`, `node_modules/` from release archive

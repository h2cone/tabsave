# Repository Guidelines

Tabsave is a Chrome extension that snapshots the current window's tab list. Use this guide to stay aligned with the repository structure, tooling, and release flow.

## Project Structure & Module Organization
Keep `manifest.json` and `manifest_no_icons.json` mirrored whenever you add permissions or capabilities so both icon and iconless builds remain valid. The popup UI spans `popup.html`, `popup.css`, and `popup.js`; edit them together to keep markup, styling, and logic synchronized. Root-level `icon*.png` assets are regenerated with `generate_icons.py`, which expects the `.venv` environment when Python dependencies are required. Node configuration sits in `package.json` and `package-lock.json`; never commit `node_modules/`, and treat the repository root as the entry point when loading via `chrome://extensions`.

## Build, Test, and Development Commands
- `npm install` installs Biome (formatter/linter) and any Node-based tooling.
- `npx biome check .` runs linting and formatting checks across the project.
- `npx biome format .` rewrites files to satisfy formatting rules before committing.
- `python generate_icons.py` rebuilds the icon set after updating artwork resources.
For manual verification, load the unpacked extension from the repository root and interact with the popup in Chrome.

## Coding Style & Naming Conventions
Write JavaScript with ES modules, `const`/`let`, and 2-space indentation consistent with `popup.js`. CSS should continue the BEM-inspired classes such as `popup__button`, and property blocks should stay alphabetized where practical. HTML attributes should list structural identifiers (id, class) before styling hooks. Always finish work by running `npx biome format .`; the project assumes formatted output.

## Testing Guidelines
Testing is manual today. Confirm that timestamps and tab counts render, the download button creates a file with numbered entries plus metadata, and multi-window exports merge correctly. Capture any untested scenarios or outstanding concerns in the pull request description so reviewers know what still needs validation.

## Commit & Pull Request Guidelines
Write imperative commit subjects within 50 characters (for example, `Add filename timestamp suffix`) and squash local fixups before opening a pull request. Provide a concise summary, explicit testing notes (commands and results), and screenshots or exported samples whenever UI or download behavior changes. Reference related issues using `Fixes #ID` to connect automation.

## Packaging & Release Tips
Before packaging, bump the `version` field in `manifest.json` and ensure `manifest_no_icons.json` matches. Exclude `.venv/`, `node_modules/`, and other tooling directories from release archives to keep bundles lightweight and compliant with Chrome Web Store limits.

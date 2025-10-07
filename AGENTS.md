# Repository Guidelines

## Project Structure & Module Organization
- `manifest.json` holds the Chrome extension manifest; keep `manifest_no_icons.json` in sync when editing capabilities so iconless builds remain possible.
- UI lives under `popup.html`, `popup.css`, and `popup.js`; treat them as a single unit and update all three when changing popup behavior.
- Helper assets sit at the repo root (`icon*.png`) with `generate_icons.py` for regenerating the icon set; run it inside the `.venv` if you rely on Python tooling.
- Node tooling state is tracked via `package.json` and `package-lock.json`; avoid committing `node_modules/`.

## Build, Test, and Development Commands
```bash
npm install           # install local tooling (Biome formatter)
npx biome check .     # lint and format check all source files
npx biome format .    # auto-format before submitting changes
python generate_icons.py  # optional: rebuild icon sprites after modifying source artwork
```
- Load the extension for manual testing via `chrome://extensions` → “Load unpacked” → repository root.

## Coding Style & Naming Conventions
- JavaScript: prefer modern ES modules, `const`/`let`, and 2-space indentation as used in `popup.js`.
- CSS: follow BEM-like class names already present (`popup__button`, etc.) and keep declarations alphabetized when practical.
- HTML: keep attribute order consistent (structural attributes first, then styling hooks).
- Always run `npx biome format .` before committing; fail builds if it reports changes.

## Testing Guidelines
- No automated test suite yet; verify via Chrome’s extension runtime.
- Manual regression checklist: click the popup, ensure timestamps and counts render, download file contains numbered entries and metadata, and multi-window tab collections export correctly.
- Document any gaps or edge cases you could not cover directly in the PR description.

## Commit & Pull Request Guidelines
- Use imperative, 50-character subject lines, e.g., `Add filename timestamp suffix`.
- Squash small fixups locally; keep history clean for rebases.
- Pull requests should include: a short summary, testing notes (commands run + results), and screenshots or exported sample output when UI or file format changes.
- Link relevant issues in the PR description with `Fixes #ID` where appropriate.

## Packaging & Release Tips
- Bump extension version in `manifest.json` before distributing zips to the Chrome Web Store.
- When preparing a release archive, exclude `.venv/`, `node_modules/`, and other tooling artifacts to keep upload size minimal.

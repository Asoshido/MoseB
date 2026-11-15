# MoseB — Blogger theme foundation

Stage 1 provides a modular source template and a single assembled XML file for Blogger installation. The structure preserves Blogger's native widgets and data model while keeping CSS and JavaScript in separate source files for maintainability.

## Repository layout

```text
src/
  template.xml       Blogger XML document and native widget/page structure
  styles.css         Structural and responsive CSS foundation
  scripts.js         Minimal progressive enhancements
build.py             Assembles source files into the installable XML
 dist/
  blogger-theme.xml  Generated Blogger theme (upload this file to Blogger)
```

## Build

Requires Python 3.9+ and no third-party packages:

```bash
python build.py
```

The build inserts `src/styles.css` and `src/scripts.js` into the marked locations in `src/template.xml`, then writes `dist/blogger-theme.xml`.

## Validation

Run:

```bash
python build.py
python -c "import xml.etree.ElementTree as ET; ET.parse('dist/blogger-theme.xml'); print('XML is well-formed')"
```

The build also rejects missing or unresolved source placeholders. Blogger's server-side template validation and an actual upload are separate checks; neither is claimed by this repository stage.

## Stage boundary

This is a structural foundation, not the completed visual recreation. Stage 2 will implement the reference-matched homepage presentation after the architecture is reviewed and approved. Individual post styling and detailed comment presentation remain for the appropriate later stage.

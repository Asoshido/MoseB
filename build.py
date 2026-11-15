
#!/usr/bin/env python3
"""Assemble the modular source files into an installable Blogger XML theme."""

from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "src" / "template.xml"
STYLES = ROOT / "src" / "styles.css"
SCRIPTS = ROOT / "src" / "scripts.js"
OUTPUT = ROOT / "dist" / "blogger-theme.xml"


def main() -> None:
    # Remove leading whitespace so the XML declaration is the first
    # content in the assembled document.
    template = TEMPLATE.read_text(encoding="utf-8").lstrip()

    styles = STYLES.read_text(encoding="utf-8").rstrip()
    scripts = SCRIPTS.read_text(encoding="utf-8").rstrip()

    if template.count("{{STYLES}}") != 1:
        raise SystemExit(
            "Expected exactly one stylesheet placeholder."
        )

    if template.count("{{SCRIPTS}}") != 1:
        raise SystemExit(
            "Expected exactly one script placeholder."
        )

    assembled = template.replace(
        "{{STYLES}}", styles
    ).replace(
        "{{SCRIPTS}}", scripts
    )

    if "{{" in assembled or "}}" in assembled:
        raise SystemExit(
            "Unresolved template placeholder found in assembled XML."
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        assembled,
        encoding="utf-8",
        newline="\n"
    )

    # Validate XML well-formedness.
    root = ET.parse(OUTPUT).getroot()

    blogger_ns = "http://www.google.com/2005/gml/b"
    widget_tag = f"{{{blogger_ns}}}widget"

    widget_ids = [
        node.attrib.get("id")
        for node in root.iter(widget_tag)
    ]

    if any(not widget_id for widget_id in widget_ids):
        raise SystemExit(
            "A Blogger widget is missing its required id."
        )

    duplicates = sorted({
        widget_id
        for widget_id in widget_ids
        if widget_ids.count(widget_id) > 1
    })

    if duplicates:
        raise SystemExit(
            f"Duplicate Blogger widget IDs: {', '.join(duplicates)}"
        )

    required_hooks = (
        "data:view.isError",
        "data:view.isSearch",
        "data:view.isLabelSearch",
        "data:view.isArchive",
        "data:view.isSingleItem",
        "data:posts",
    )

    missing = [
        hook for hook in required_hooks
        if hook not in assembled
    ]

    if missing:
        raise SystemExit(
            f"Missing Blogger page/data hooks: {', '.join(missing)}"
        )

    print(f"Built and validated {OUTPUT.relative_to(ROOT)}")
    print(
        f"XML well-formed; {len(widget_ids)} unique "
        "Blogger widget IDs; required page hooks present."
    )


if __name__ == "__main__":
    main()

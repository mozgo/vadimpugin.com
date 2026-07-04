#!/usr/bin/env python3
"""Download portfolio media from vadimpugin.com into public/works."""

from __future__ import annotations

import json
import os
import re
import subprocess
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "works"
DATA = ROOT / "data" / "site.json"
TMP = Path("/tmp")

WORK_PAGES = {
    "the-pan-and-his-arms": "The Pan and his Arms",
    "the-observer": "The Observer",
    "the-19th-year-of-the-tides": "The 19th Year of the Tides",
    "holytech": "Holy Tech Altars",
    "rilee": "Fragile sea hearts",
    "dunes-secret": "Evaporation",
    "sculptures-art-objects-soundart-videoart": "Melting",
    "baobab-tales": "On a Bird Wave",
    "sculptures-objects-videoart-soundart": "Infrathin Dialogues",
}

ORDER = list(WORK_PAGES.keys())
BASE = "https://www.vadimpugin.com/portfolio-collections/sculptures-art-objects-soundart-videoart"


def curl(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        ["curl", "-sL", "--max-time", "30", "-o", str(dest), url],
        capture_output=True,
        check=False,
    )
    return result.returncode == 0 and dest.exists() and dest.stat().st_size > 500


def fetch_page(slug: str) -> str:
    path = TMP / f"work-{slug}.html"
    if not path.exists():
        curl(f"{BASE}/{slug}", path)
    return path.read_text(encoding="utf-8", errors="replace")


def media_url(media_id: str, width: int = 1400, height: int = 1400) -> str:
    return (
        f"https://static.wixstatic.com/media/{media_id}/v1/fill/"
        f"w_{width},h_{height},al_c,q_85/{media_id}"
    )


def extract(html: str) -> tuple[str, list[str], list[str], list[str]]:
    desc_match = re.search(r'<meta property="og:description" content="([^"]*)"', html)
    description = unescape(desc_match.group(1)) if desc_match else ""

    images = re.findall(
        r"https://static\.wixstatic\.com/media/([a-f0-9_]+~mv2\.(?:jpg|jpeg|png|webp))",
        html,
        re.I,
    )
    images = [item for item in dict.fromkeys(images) if "c837a6" not in item]

    videos = list(
        dict.fromkeys(
            re.findall(
                r"https://video\.wixstatic\.com/video/([a-f0-9_]+)/480p/mp4/file\.mp4",
                html,
            )
        )
    )

    extras: list[str] = []
    for paragraph in re.findall(r"<p[^>]*>(.*?)</p>", html, re.S):
        text = re.sub(r"<[^>]+>", "", paragraph)
        text = unescape(
            text.replace("&nbsp;", " ")
            .replace("&ndash;", "–")
            .replace("&rsquo;", "'")
            .replace("&quot;", '"')
        )
        text = re.sub(r"\s+", " ", text).strip()
        if len(text) > 40 and "Vadim Pugin" not in text and "Edit Text" not in text and "©" not in text:
            extras.append(text)

    return description, images, videos, extras


def clean_description(text: str) -> str:
    text = re.sub(r'Create Your First Project.*', "", text, flags=re.I | re.S)
    text = re.sub(r'Start adding your projects.*', "", text, flags=re.I | re.S)
    text = re.sub(r'Click on "Manage Projects".*', "", text, flags=re.I | re.S)

    parts = [part.strip() for part in re.split(r"\n\n+", text) if part.strip()]
    unique: list[str] = []
    seen: set[str] = set()
    for part in parts:
        key = re.sub(r"\s+", " ", part.lower())[:80]
        if key not in seen:
            seen.add(key)
            unique.append(part)
    return "\n\n".join(unique)


def main() -> None:
    works = []

    for slug in ORDER:
        html = fetch_page(slug)
        description, images, videos, extras = extract(html)
        work_dir = PUBLIC / slug
        work_dir.mkdir(parents=True, exist_ok=True)

        local_images: list[str] = []
        for index, media_id in enumerate(images):
            filename = f"{index:02d}-{media_id.replace('~mv2.', '.')}"
            destination = work_dir / filename
            if curl(media_url(media_id), destination):
                local_images.append(f"/works/{slug}/{filename}")

        local_videos: list[str] = []
        for index, video_id in enumerate(videos):
            filename = f"video-{index}.mp4"
            destination = work_dir / filename
            url = f"https://video.wixstatic.com/video/{video_id}/480p/mp4/file.mp4"
            if curl(url, destination):
                local_videos.append(f"/works/{slug}/{filename}")

        full_description = description
        if extras and (not description or extras[0] not in description):
            full_description = (
                f"{description}\n\n{'\n\n'.join(extras)}".strip()
                if description
                else "\n\n".join(extras)
            )

        works.append(
            {
                "id": slug,
                "title": WORK_PAGES[slug],
                "description": clean_description(full_description),
                "featuredImage": local_images[0] if local_images else None,
                "images": local_images,
                "videos": local_videos,
            }
        )

    about_path = TMP / "vadim-about.html"
    if not about_path.exists():
        curl("https://www.vadimpugin.com/about", about_path)
    about_html = about_path.read_text(encoding="utf-8", errors="replace")

    bio: list[str] = []
    for paragraph in re.findall(r"<p[^>]*>(.*?)</p>", about_html, re.S):
        text = re.sub(r"<[^>]+>", "", paragraph)
        text = unescape(text.replace("&nbsp;", " ").replace("&ndash;", "–").replace("&rsquo;", "'"))
        text = re.sub(r"\s+", " ", text).strip()
        if len(text) > 50 and "©" not in text:
            bio.append(text)

    holytech_featured = next((work["featuredImage"] for work in works if work["id"] == "holytech"), None)

    site_data = {
        "artist": {
            "name": "Vadim Pugin",
            "tagline": "New York based multidisciplinary artist",
            "intro": (
                "Bridges the tangible and the digital, combining ceramic sculptures, found objects, "
                "and algorithms into total installations that re-cut the fabric of the presentness."
            ),
        },
        "statement": (
            "Fusing sculptures, sound installations and cybernetics actors to explore time's fluidity "
            "and bending temporal perception through art. My practice merges the tangible and the digital "
            "— ceramic sculptures, found objects, and algorithms woven into total installations that "
            "re-cut the fabric of the present."
        ),
        "bio": bio,
        "contacts": {
            "email": "vadim.pugin@gmail.com",
            "instagram": "https://www.instagram.com/mozgo/",
            "tiktok": "https://www.tiktok.com/@mozgotronica",
        },
        "featuredEvent": {
            "title": "Holy Tech Altars",
            "subtitle": "Current exhibition theme",
            "description": (
                "Cult objects for the Holy Tech liturgical space envelop and immerse visitors in a world "
                "where spiritual practices are curated by AI. This unique space structures the subconscious "
                "not through words, but through data."
            ),
            "image": holytech_featured,
            "workId": "holytech",
        },
        "works": works,
    }

    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(json.dumps(site_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated {DATA} with {len(works)} works")


if __name__ == "__main__":
    main()

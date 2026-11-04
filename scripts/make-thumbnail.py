"""Create optimized WebP thumbnails for the portfolio.

Captures a live website with headless Chrome (or takes an existing image),
crops it to a consistent aspect ratio, and writes two WebP sizes:

    <out>-640.webp   (grid cards)
    <out>-1280.webp  (featured cards / case studies)

Usage:
    py scripts/make-thumbnail.py --url https://example.com --out public/images/websites/example
    py scripts/make-thumbnail.py --file shot.png --out public/images/projects/my-app --crop none

Requires Pillow (`py -m pip install pillow`) and, for --url, Google Chrome or
Microsoft Edge. Set CHROME_PATH to use a different browser binary.
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

BROWSER_CANDIDATES = [
    os.environ.get("CHROME_PATH", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
]
WIDTHS = (640, 1280)


def find_browser():
    for path in BROWSER_CANDIDATES:
        if path and os.path.exists(path):
            return path
    sys.exit("No Chrome/Edge found. Set CHROME_PATH or use --file.")


def capture(url, dest, viewport):
    profile = tempfile.mkdtemp(prefix="thumb-profile-")
    try:
        subprocess.run(
            [
                find_browser(),
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--force-device-scale-factor=2",
                f"--window-size={viewport}",
                "--virtual-time-budget=15000",
                f"--user-data-dir={profile}",
                f"--screenshot={dest}",
                url,
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=120,
        )
    finally:
        shutil.rmtree(profile, ignore_errors=True)


def crop_top(im, ratio):
    """Crop from the top-left so the page header (logo + hero) stays in frame."""
    if ratio is None:
        return im
    w, h = im.size
    target_h = round(w / ratio)
    if target_h <= h:
        return im.crop((0, 0, w, target_h))
    target_w = round(h * ratio)
    return im.crop((0, 0, target_w, h))


def parse_ratio(value):
    if value == "none":
        return None
    a, b = value.split(":")
    return float(a) / float(b)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--url", help="Live website to capture")
    source.add_argument("--file", help="Existing screenshot to convert")
    parser.add_argument("--out", required=True, help="Output path without extension")
    parser.add_argument("--crop", default="16:10", help="Aspect ratio like 16:10, or 'none'")
    parser.add_argument(
        "--viewport",
        default="1440,900",
        help="Browser size W,H. Use a smaller height (e.g. 1024,640) for sites that reveal content on scroll.",
    )
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)

    if args.url:
        tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
        tmp.close()
        capture(args.url, tmp.name, args.viewport)
        src = tmp.name
    else:
        src = args.file

    im = crop_top(Image.open(src).convert("RGB"), parse_ratio(args.crop))
    for width in WIDTHS:
        height = round(im.height * width / im.width)
        im.resize((width, height), Image.LANCZOS).save(f"{args.out}-{width}.webp", "WEBP", quality=80, method=6)

    if args.url:
        os.remove(src)

    big_h = round(im.height * WIDTHS[-1] / im.width)
    print(f"Wrote {args.out}-640.webp and {args.out}-1280.webp")
    print(f"image: {{ base: '/{os.path.relpath(args.out, 'public').replace(os.sep, '/')}', width: {WIDTHS[-1]}, height: {big_h} }}")


if __name__ == "__main__":
    main()

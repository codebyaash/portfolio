"""Create browser-ready WebP variants for portfolio project screenshots."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1] / "assets" / "projects"


def main() -> None:
    for source in ROOT.rglob("*.png"):
        target = source.with_suffix(".webp")
        with Image.open(source) as image:
            image.save(target, "WEBP", quality=82, method=6)
        before = source.stat().st_size
        after = target.stat().st_size
        print(f"{source.relative_to(ROOT)}: {before // 1024} KB -> {after // 1024} KB")


if __name__ == "__main__":
    main()

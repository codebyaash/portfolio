from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "social"
OUTPUT.mkdir(parents=True, exist_ok=True)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplement/Arial.ttf"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"

CARDS = [
    {
        "file": "cloudops-og.png",
        "number": "01 / APPLIED AI + CLOUD OPERATIONS",
        "title": "AI CloudOps\nAssistant",
        "summary": "Evidence-grounded incident analysis\nand human-reviewed remediation.",
        "tags": ["FASTAPI", "AZURE", "POSTGRESQL", "OPENAI"],
        "accent": (255, 126, 108),
        "nodes": ["SIGNALS", "CONTEXT", "ANALYSIS", "GUIDANCE"],
    },
    {
        "file": "topologyx-og.png",
        "number": "02 / AZURE ARCHITECTURE + AI",
        "title": "TopologyX",
        "summary": "One workload brief. Six connected,\nreviewable architecture outputs.",
        "tags": ["AZURE", "BICEP", "TERRAFORM", "FASTAPI"],
        "accent": (184, 175, 255),
        "nodes": ["BRIEF", "TOPOLOGY", "REVIEW", "IaC"],
    },
    {
        "file": "deployforge-og.png",
        "number": "03 / PLATFORM ENGINEERING",
        "title": "DeployForge",
        "summary": "Simulation-first infrastructure planning,\npolicy, drift, cost and rollback.",
        "tags": ["IaC", "POLICY", "DRIFT", "CI/CD"],
        "accent": (255, 155, 139),
        "nodes": ["UPLOAD", "PLAN", "VALIDATE", "ROLLBACK"],
    },
    {
        "file": "wealthcompass-og.png",
        "number": "04 / FULL-STACK FINTECH",
        "title": "WealthCompass",
        "summary": "Local-first risk, portfolio and goal\nworkflows with optional cloud sync.",
        "tags": ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "RULES"],
        "accent": (159, 226, 191),
        "nodes": ["PROFILE", "PORTFOLIO", "GOALS", "CONTEXT"],
    },
]


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def mix(a: int, b: int, ratio: float) -> int:
    return round(a + (b - a) * ratio)


def create_card(card: dict) -> None:
    width, height = 1200, 630
    base = (17, 17, 31)
    deep = (40, 31, 58)
    image = Image.new("RGB", (width, height), base)
    pixels = image.load()
    for y in range(height):
        for x in range(width):
            horizontal = x / width
            vertical = y / height
            glow = max(0.0, 1.0 - (((x - 965) / 520) ** 2 + ((y - 130) / 430) ** 2))
            ratio = min(1.0, horizontal * 0.28 + vertical * 0.08 + glow * 0.42)
            pixels[x, y] = tuple(mix(base[i], deep[i], ratio) for i in range(3))

    draw = ImageDraw.Draw(image)
    accent = card["accent"]
    white = (247, 243, 237)
    muted = (184, 179, 198)
    line = (76, 69, 101)

    # Technical grid and orbital rings.
    for x in range(700, 1200, 48):
        draw.line((x, 0, x, height), fill=(34, 32, 51), width=1)
    for y in range(0, height, 48):
        draw.line((700, y, width, y), fill=(34, 32, 51), width=1)
    for radius in (115, 185, 255):
        box = (950 - radius, 305 - radius, 950 + radius, 305 + radius)
        draw.ellipse(box, outline=(*accent, 60), width=2)

    draw.rounded_rectangle((55, 48, 1145, 582), radius=22, outline=line, width=2)
    draw.rounded_rectangle((80, 75, 430, 111), radius=18, fill=(*accent,))
    draw.text((99, 84), card["number"], font=font(FONT_MONO, 16), fill=(22, 20, 35))

    title_font = font(FONT_BOLD, 78 if "\n" not in card["title"] else 70)
    draw.multiline_text((80, 150), card["title"], font=title_font, fill=white, spacing=-3)
    title_bottom = 248 if "\n" not in card["title"] else 315
    draw.multiline_text((83, title_bottom + 30), card["summary"], font=font(FONT_REGULAR, 26), fill=muted, spacing=8)

    # Architecture flow motif.
    node_y = 260
    node_xs = [760, 875, 990, 1105]
    for index, (node_x, label) in enumerate(zip(node_xs, card["nodes"])):
        if index:
            draw.line((node_xs[index - 1] + 35, node_y, node_x - 35, node_y), fill=accent, width=3)
        draw.ellipse((node_x - 33, node_y - 33, node_x + 33, node_y + 33), fill=(26, 24, 43), outline=accent, width=3)
        text_box = draw.textbbox((0, 0), str(index + 1), font=font(FONT_BOLD, 20))
        draw.text((node_x - (text_box[2] - text_box[0]) / 2, node_y - 12), str(index + 1), font=font(FONT_BOLD, 20), fill=white)
        label_box = draw.textbbox((0, 0), label, font=font(FONT_MONO, 12))
        draw.text((node_x - (label_box[2] - label_box[0]) / 2, node_y + 48), label, font=font(FONT_MONO, 12), fill=muted)

    tag_x = 82
    for tag in card["tags"]:
        text_font = font(FONT_MONO, 13)
        bounds = draw.textbbox((0, 0), tag, font=text_font)
        tag_width = bounds[2] - bounds[0] + 28
        draw.rounded_rectangle((tag_x, 505, tag_x + tag_width, 541), radius=18, outline=line, width=1)
        draw.text((tag_x + 14, 515), tag, font=text_font, fill=muted)
        tag_x += tag_width + 9

    draw.text((808, 505), "AASHRITHA N", font=font(FONT_BOLD, 20), fill=white)
    draw.text((808, 535), "ENGINEERING PORTFOLIO", font=font(FONT_MONO, 13), fill=accent)

    image.save(OUTPUT / card["file"], "PNG", optimize=True)


for card in CARDS:
    create_card(card)
    print(f"generated {card['file']}")

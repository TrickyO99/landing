import subprocess, sys
from pathlib import Path
from PIL import Image
here = Path(__file__).resolve().parent
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
for name, out in (("films", "trikinema-films"), ("nowplaying", "trikinema-nowplaying")):
    png = here / f"{out}.png"
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=6000",
                    f"--screenshot={png}", "--window-size=960,600", (here / f"{name}.html").as_uri()],
                   check=True, capture_output=True, timeout=90)
    im = Image.open(png).convert("RGB")
    im.save(here.parent / "img" / "projects" / f"{out}.jpg", quality=88, optimize=True)
    png.unlink()
    print(out, im.size)

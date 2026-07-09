"""Remove o fundo bege/creme dos logos e gera PNGs transparentes e recortados."""
from PIL import Image, ImageDraw, ImageFilter
import sys

def process(src, dst, thresh=60):
    im = Image.open(src).convert("RGB")
    w, h = im.size

    # cor de fundo = média dos 4 cantos
    corners = [im.getpixel((0, 0)), im.getpixel((w - 1, 0)),
               im.getpixel((0, h - 1)), im.getpixel((w - 1, h - 1))]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))

    # flood fill a partir dos cantos -> marca o fundo com sentinela magenta
    SENT = (255, 0, 255)
    flood = im.copy()
    for pt in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(flood, pt, SENT, thresh=thresh)

    # alpha: transparente onde virou sentinela
    px = flood.load()
    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == SENT:
                ap[x, y] = 0

    # encolhe 1px a borda opaca p/ tirar a franja creme, depois suaviza
    alpha = alpha.filter(ImageFilter.MinFilter(3))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))

    out = im.convert("RGBA")
    out.putalpha(alpha)

    # recorta as margens transparentes
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    out.save(dst)
    print(f"{dst}  bg={bg}  original={w}x{h}  final={out.size[0]}x{out.size[1]}")

process("_marca/logo/logo-completo.png", "_marca/logo/logo-transparente.png")
process("_marca/logo/icone.png", "_marca/logo/icone-transparente.png")

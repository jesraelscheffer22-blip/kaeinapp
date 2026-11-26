#!/usr/bin/env python3
"""Remove o fundo verde (#00FF00) ou magenta (#FF00FF) de imagens sem transparência.
Detecta a cor pelos 4 cantos. Uso: python3 tools/recortar-fundo.py assets/img/arquivo.png [...]
Só mexe em imagens cujos cantos são verde ou magenta puros; as outras ficam como estão."""
import sys
from PIL import Image

def chave(px):
    r, g, b = px[:3]
    if g > 180 and r < 110 and b < 110: return 'verde'
    if r > 180 and b > 180 and g < 110: return 'magenta'
    return None

def recortar(caminho):
    im = Image.open(caminho).convert('RGBA'); w, h = im.size; p = im.load()
    cantos = [chave(p[x, y]) for x, y in [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]]
    tipo = max(set(cantos), key=cantos.count)
    if not tipo or cantos.count(tipo) < 3: print(f'{caminho}: sem fundo de cor lisa, mantido'); return
    for y in range(h):
        for x in range(w):
            r, g, b, a = p[x, y]
            if tipo == 'verde':
                d = g - max(r, b)                      # quanto "mais verde" que o resto
                if d > 90: p[x, y] = (r, g, b, 0)
                elif d > 30: p[x, y] = (r, max(r, b), b, int(a * (90 - d) / 60))   # borda suave, sem halo verde
            else:
                d = min(r, b) - g
                if d > 90: p[x, y] = (r, g, b, 0)
                elif d > 30: p[x, y] = (min(r, g + 40), g, min(b, g + 40), int(a * (90 - d) / 60))
    im.save(caminho); print(f'{caminho}: fundo {tipo} removido')

for c in sys.argv[1:]: recortar(c)

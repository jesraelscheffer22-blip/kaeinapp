# Manifesto de Arte do Kaien

Como trocar uma arte: salve o arquivo como `assets/img/<nome>.webp` e rode `node tools/build.js`. Não precisa mexer em código.
Enquanto o arquivo não existe, o build coloca um **placeholder SVG** (gradiente noturno, lua roxa e pincelada carmesim para fundos; silhueta para personagens e monstros), com a etiqueta "arte pendente".

Estilo base dos prompts: *dark fantasy murim manhwa illustration, painterly, high detail, vertical 1024x1536, no text, no logos, no real brands.*
Personagens: Kaien jovem (cabelo longo escuro cacheado, roupas escuras, antebraços enfaixados); velho mestre (cabelo branco); Kaien adulto (manto dourado real). Monstros sobre **fundo verde chroma #00FF00 liso**, para recorte com alpha de verdade.

---

## A. Artes que já existem, mas faltam neste repositório (45)

Estas imagens já são usadas pelo app atual. Elas não vieram porque o build usa o `index (1).html` antigo.
**Antes de gerar qualquer uma, rode `node tools/extrair-imagens.js <index.html atual de 12,8 MB>`**: o script deve recuperar todas de uma vez.

| Arquivo (`assets/img/`) | Onde aparece | Formato |
|---|---|---|
| `bg-in1.webp` … `bg-in6.webp` | Abertura: as 6 cenas da história inicial | fundo vertical |
| `scnbg.webp` | Cena do capítulo 1 (A noite no pátio) | fundo |
| `chimg-cap1.webp` … `chimg-cap5.webp` | Leitor de capítulos (noite:1, noite:2, mestre:0, porque:0, fracasso:0) | ilustração |
| `pvp.webp`, `pvc.webp`, `pvm.webp`, `pvd.webp` | Prova de Ascensão D (portão, corpo, mente, disciplina) | ilustração |
| `fsub.webp` | Fundo da cinemática do rank D | fundo |
| `kemo.webp` | Kaien emocionado na cinemática do rank D | personagem com alpha |
| `emE.webp`, `emD.webp` | Emblemas dos ranks E e D (silhueta com alpha) | emblema |
| `pH10.webp` | Personagem com a roupa do rank D | personagem com alpha |
| `spin0-0..3.webp` | Giro 360° com a roupa inicial (frente, direita, costas, esquerda) | personagem com alpha |
| `spin2-0..3.webp` | Giro 360° com a roupa do rank D | personagem com alpha |
| `mob-alcool-0..3.webp` | Mini monstros do Álcool | monstro com alpha |
| `mob-celular-0..3.webp` | Mini monstros do Celular | monstro com alpha |
| `mob-procrastinacao-0..3.webp` | Mini monstros da Procrastinação | monstro com alpha |
| `mob-sono-0..3.webp` | Mini monstros do Sono ruim | monstro com alpha |

Atenção: `spin-0..3.webp` veio do arquivo antigo, que só tinha **um** conjunto de giro. Confira se é o da roupa com capa (nível 5). Se não for, o `extrair-imagens.js --sobrescrever` com o arquivo atual corrige.

## B. Artes novas (níveis 11–50)

A lista completa, com prompts em inglês, entra a partir da Fase 2/3: capítulos, fundos e roupas por rank, emblemas C/B/A/S, molduras rB/rA/rS, 45 monstros da Fase 2, 9 chefes da Fase 3, Provas e cinemáticas.

## C. Orçamento de peso (seção 6 do prompt)

Hoje `assets/img/` soma 9,5 MB em 61 imagens. **Os 9 chefes têm entre 340 e 454 KB** (o limite é 150 KB). Recomprimir em WebP q75–80 fica para a Fase 7, sem mexer na arte.

# Relatório final: Kaien até o nível 50 (Prompt 1 + Prompt 2)

Data: 26/11/2026 · Branch: `claude/new-session-fs885x`

## 1. O que foi entregue

- **Ranks C, B, A e S:** Provas de Ascensão com 4 provas cada. Cinemáticas com 7, 8, 9 e 12 atos, com som sintetizado, emblemas vetoriais e modo "reduzir efeitos". Roupa, título, fundo e aura por rank. Multiplicador de XP a partir do dia seguinte.
- **Prêmios dos níveis 11 a 50:** todos definidos (`src/js/06-progressao.js`). São 17 títulos de nível, 7 auras, 10 fundos, 7 roupas e 5 cores de nome.
- **Conteúdo novo:**
  - 32 capítulos reescritos (de 24–46 palavras para ~130–200 cada).
  - Diário do Kaien com 109 falas (por confiança, dia da semana e estado do dia anterior).
  - 40 ensinos em 7 temas, incluindo Elixires.
  - 62 conquistas, com dica em cada uma.
- **Dungeons:**
  - Fase 2 com 45 monstros evoluídos (nomes, falas e andares novos).
  - 9 Formas Verdadeiras (rank B).
  - O Espelho no nível 20, Espelho do Passado (35) e do Futuro (50).
  - Torre dos Mil Degraus, Invasões das estações e um Bestiário com 99 entradas.
- **Sistemas do Prompt 2:** Mapa, Cartas do Mestre, Intenção, Retorno gentil, Retiro, Meditação, Kata, Mandamentos, Torneio Silencioso, Diário do Discípulo, Escolas, Companheiros, Meu Templo, armas cerimoniais, títulos compostos, Galeria, Cartão de Discípulo, Missões de Cena, Estações e Caminho do Mestre (pós-50). Decisões e cortes em `PLANO-EXPANSAO.md`.
- **Qualidade:**
  - Estatísticas e constância (heatmap), retrospectiva mensal e anual.
  - Backup (exportar e importar) e tela de privacidade com "apagar tudo".
  - Central de ajuda.
  - Ajustes de efeitos, som, volume, vibração, tamanho do texto, alto contraste e estações.
- **Base técnica:** código separado em `src/`, build com variações de arte e conversão automática de PNG→WebP. O `build.yml` agora monta a partir de `src/` e instala o plugin de lembretes.

## 2. Testes (Playwright, Chromium 390×844): todos OK

| Teste | Resultado |
|---|---|
| Abertura completa + 35 dias em 30 combinações + dungeons (`qa/testes.js`) | 0 falhas, 0 erros de página |
| Saves antigos níveis 1, 5, 9, 10 e 16 (`qa/teste-saves.js`) | XP idêntico, nenhum campo perdido, backup criado |
| Provas e cinemáticas C/B/A/S, normal e com "reduzir efeitos" (`qa/teste-ranks.js`) | Nível trava no portão, prova libera, cinemática roda, ×2,4/2,9/3,3/3,6, roupa e título aplicados |
| Dungeons: fases 1→2→3, refazer (½ XP), Espelho 20, Torre, Invasão, Bestiário (`qa/teste-dungeons.js`) | OK |
| Dor e saúde: dor 2 bloqueia Difícil, dor 3 bloqueia acima de Fácil, Kata e prova viram mobilidade (`qa/teste-dor.js`) | OK |
| Telas em 360×640, 390×844 e 412×915: rolagem horizontal e erros (`qa/telas.js`) | OK (corrigi uma rolagem de 16 px que já existia no Desafio) |
| Backup: exportar → importar, arquivo inválido rejeitado | OK, XP idêntico |
| Desempenho: tempo de um render | ~0,5–3 ms (igual ao app original) |

### Simulação 1 → 50 (`qa/simulacao-1-50.js`), com missões, água, sono e 1 andar de dungeon por dia

| Perfil | Nível 10 | Nível 20 | Nível 30 | Nível 40 | Nível 50 |
|---|---|---|---|---|---|
| Fácil constante | dia 21 | 56 | 106 | 159 | **246 (~8 meses)** |
| Médio constante | dia 15 | 41 | 73 | 108 | **158 (~5 meses)** |
| Médio 80% dos dias | dia 24 | 57 | 97 | 136 | **200 (~6,5 meses)** |
| Difícil com falhas (70%) | dia 20 | 53 | 87 | 115 | **171 (~5,5 meses)** |

- Sem dungeons, só com missões, o perfil Médio chega ao 50 em ~220 dias (~7 meses).
- Antes da mudança de ritmo, eram 439 dias, então o tempo caiu pela metade, como você pediu.
- Ninguém regride de rank. Os 49 prêmios foram liberados nos 4 perfis, com 0 erros de página.

Capturas de tela: `qa/screens/final/` (níveis 25 e 52, e quadros das ascensões).

## 3. O que só o celular prova

Lembretes, vibração, toque real, desempenho em Android modesto, o carregamento das imagens em arquivo (pode piscar na primeira vez), o compartilhamento do Cartão e do backup (o WebView do Android pode não oferecer "compartilhar arquivo"; há um botão alternativo de copiar texto) e os sons sintetizados.

## 4. Pendências

1. **Imagens:** 120 novas para gerar (lista e textos prontos em `ARTE-PROMPTS.html` e `ARTE-MANIFESTO.md`). Outras 45 já existem no seu `index.html` de 12,8 MB e só precisam ser extraídas. Enquanto isso, o app usa variações recoloridas ou silhuetas.
2. **Envio ao GitHub:** o push falhou por falta de acesso. Os commits estão na branch local. Conecte o GitHub em claude.ai e instale o app Claude no repositório.
3. **Molduras (D3):** desligadas, aguardando a sua aprovação.
4. **Revisão humana antes de cobrar:**
   - Revisão dos textos de saúde por um profissional (treino, Kata, meditação, sono, vícios).
   - Revisão jurídica: LGPD, termos de uso, política de privacidade e idade mínima de 16 anos.
5. **Contatos de apoio:**
   - Verifiquei na web que o **CVV 188** é gratuito e funciona 24 h. O chat em cvv.org.br tem horário reduzido, por isso o texto pede para conferir o horário no site.
   - **SAMU 192** é o número nacional padrão.
   - **Jogadores Anônimos:** confirmei que existe no Brasil, mas não o site oficial, por isso o app não cita link.
   - Uma pessoa deve reconferir tudo isso antes de publicar.
6. **Textos de "versão de teste"** ainda aparecem em Privacidade, Assinatura e no modal de contatos. Ajuste quando for publicar.
7. **Acessibilidade:** o contraste AA e os alvos de toque de 44 px foram aplicados nas telas novas, mas não houve auditoria completa nas telas antigas.

## 5. Como testar

- **No computador:** `node tools/build.js --variante=teste` e abra `dist-teste/index.html` no Chrome. As ferramentas de teste estão no Perfil (⚙).
- **No celular:** com o acesso ao GitHub corrigido e o push feito, rode o workflow "Gerar APK" na branch `claude/new-session-fs885x` (Actions → Gerar APK → Run workflow). O APK aparece em Releases.

# Relatório da Fase 1: modularização com paridade, mais as 4 mudanças aprovadas

Data: 26/11/2026 · Nada foi publicado, commitado ou enviado. O `build.yml` não foi tocado.

## 1. O que mudou

### 1a. Modularização (sem mudar comportamento)
- O código do `index-sem-imagens.html` foi dividido em **9 arquivos CSS e 19 arquivos JS** em `src/`. A ordem fica em `src/ordem.json`. Os cortes seguem a ordem original, para não mudar a cascata do CSS nem a ordem de execução do JS.
- As 106 imagens agora têm **nome estável** (`pQ3`, `bg-t2`, `boss-jogos`, `mob-sono-2`...), referenciadas como `@@IMG:nome@@` no código.
- `tools/build.js` monta um único `index.html` em 3 modos: imagens em arquivos (padrão, para o APK), inline (um arquivo só) ou sem imagens. Também gera a variante de teste.
- `tools/extrair-imagens.js` puxa as imagens de qualquer `index.html` antigo para `assets/img/`. Rodado no `index (1).html`, recuperou **61 de 106**. As outras 45 viram placeholder (lista em `ARTE-MANIFESTO.md`) e voltam quando você rodar o script no arquivo atual de 12,8 MB.
- O original ficou guardado em `qa/referencia/` para os testes de paridade.

### 1b. Mudanças aprovadas por você
| Mudança | Onde | Detalhe |
|---|---|---|
| **Ritmo 2× mais rápido** | `src/js/06-progressao.js` | Custo de cada nível pela metade: `XPC=[125,…,500]` e `costOf(L)=500+50*(L-10)`. O XP das missões não mudou. |
| **Fonte embutida** | `src/styles/00-fontes.css`, `assets/fonts/` | Space Grotesk 400/500/700 (40 KB, licença OFL). O link do Google Fonts saiu. |
| **Ranking fictício removido** | `src/js/10-extras.js`, `15-render.js` | O ranking (Lara, Rafa22...), suas funções e o cartão saíram. O campo `S.rk` é apagado na migração. |
| **Ferramentas de teste só na variante de teste** | `src/js/00-config.js`, `15-render.js` | `KAIEN_TESTE` vale `false` no APK e `true` em `--variante=teste`. |
| Migração | `src/js/17-estado-e-boot.js` | `S.ver` 3 → 4: cada save antigo ganha um **backup automático** (`kaien.v1.bak`) antes de recalcular o nível. |

## 2. Testes rodados (Playwright, Chromium 390×844)

| Teste | Resultado |
|---|---|
| **Paridade de código**: build `--imagens=sem` comparado com o `index-sem-imagens.html` original | **Idêntico, byte a byte** |
| **Paridade de comportamento** (antes das mudanças aprovadas): original × build com arquivos × build inline. Abertura completa, 35 dias em 30 combinações (3 tipos de treino × 2–6 dias × Fácil/Difícil), dungeons. Aleatoriedade e relógio fixados. | **Estado `S` final idêntico** nos 3 (mesmo hash) |
| O teste detecta diferenças? (rodado contra uma versão com XP alterado) | Sim, acusou DIFERENTE |
| Depois das mudanças aprovadas: abertura, 35 dias, dungeons em `dist`, `dist-inline` e `dist-teste` | Abertura OK · **0 falhas** · 0 erros de página · os 3 builds com estado igual entre si |
| Bloqueio da 4ª dungeon | OK ("Você já tem 3 dungeons abertas") |
| **Saves antigos** (gerados no app original, níveis 1, 5, 9, 10 e 16, carregados no build novo) | **XP idêntico em todos**, nenhum campo perdido, backup criado, prêmios dos novos níveis concedidos, 0 erros |
| App **offline** (rede desligada) | Fonte carrega do arquivo local, **0 acessos externos** |
| Variante APK × variante teste | APK sem ferramentas e sem ranking; teste com ferramentas |

Capturas de tela em `qa/screens/fase1/`.

### Novo ritmo (simulação só com missões diárias, sem dungeons)
| Perfil | Nível 10 | 20 | 30 | 40 | **50** | Antes |
|---|---|---|---|---|---|---|
| Fácil, todos os dias | dia 34 | 90 | 158 | 237 | **327 (~11 meses)** | 654 |
| Médio, todos os dias | dia 23 | 61 | 107 | 160 | **220 (~7 meses)** | 439 |
| Médio, 80% dos dias | dia 28 | 77 | 138 | 209 | **286 (~9,5 meses)** | 566 |
| Difícil, 70% dos dias | dia 27 | 66 | 117 | 183 | **246 (~8 meses)** | 507 |

O ritmo ficou na metade do tempo, como pedido. As dungeons aceleram mais um pouco; a simulação completa com elas fica para a Fase 2.

### Efeito nos saves antigos (esperado)
Quem já jogava **sobe de nível na hora**, porque o XP é o mesmo e cada nível agora custa metade. Exemplos medidos: nível 5 → 7, nível 10 → 14, nível 16 → 22. Quem estava no 9 continua no 9 com a Prova do rank D liberada.

## 3. Pendências e riscos

1. **O APK ainda é gerado pelo arquivo antigo.** O `build.yml` copia o `index.html` da raiz (versão antiga) e não instala o plugin de lembretes. Proposta, **ainda não aplicada**, para quando você autorizar:
   ```
   node tools/build.js && cp -r dist/* www/
   npm install @capacitor/local-notifications@6   # + permissão POST_NOTIFICATIONS
   ```
2. **Saves que pulam o nível 20 com o novo ritmo** (o de nível 16 foi para 22) entram no rank C **sem Prova C**, porque ela ainda não existe. Na Fase 3, quem já passou do 20 terá a Prova C dada como cumprida (como o app já faz no rank D).
3. As imagens dos arquivos agora carregam sob demanda, em vez de virem embutidas. No Chromium não houve atraso visível; **em Android modesto, a primeira exibição de uma imagem pode piscar**. Se acontecer, a solução é pré-carregar.
4. Os 9 chefes pesam 340–454 KB cada (meta: 150 KB). A recompressão fica para a Fase 7.
5. Ainda há textos de "versão de teste" no app (Privacidade, Assinatura, modal de contatos, modo guiado). Ficam para a revisão de texto da Fase 7.

## 4. O que só o celular prova
Lembretes, vibração, toque real, desempenho e tempo de carregamento das imagens em arquivo no WebView do Android.

## 5. Próxima fase (aguardando o seu "pode seguir")
**Fase 2, núcleo de dados até o nível 50:** tabela de prêmios 11–50 para você aprovar antes de implementar, títulos, conquistas, estrutura dos ranks C/B/A/S, estado e migração, e a simulação completa 1→50 com dungeons e falhas aleatórias.

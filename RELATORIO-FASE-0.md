# Relatório da Fase 0: auditoria do app Kaien (sem alterar código)

Data: 26/11/2026 · Fonte auditada: `index-sem-imagens.html` (1.632 linhas; ~1.090 linhas de JS, 225 funções, ~345 declarações de topo). Nenhum arquivo do app foi alterado.

---

## 1. Achados que bloqueiam ou mudam o plano

| # | Achado | Impacto |
|---|---|---|
| B1 | **O `index.html` completo (12,8 MB) não está no repositório nem foi anexado.** O repo tem `index.html` (7,6 MB, 26 imagens) e `index (1).html` (12,9 MB, 62 imagens), e **os dois são versões mais antigas** do código (diferem em ~1.000 linhas do `index-sem-imagens.html`). | A Fase 1 (separar imagens em arquivos) precisa das imagens atuais. **Preciso do arquivo de 12,8 MB atual.** |
| B2 | **O workflow do repo não bate com o prompt.** Ele se chama `.github/workflows/build.yml` (não `build-apk.yml`), roda **a cada push na `main`**, copia o `index.html` antigo, **não instala `@capacitor/local-notifications`** e só adiciona a permissão VIBRATE (falta POST_NOTIFICATIONS). | Se esse for o workflow real, **os lembretes não funcionam no APK**: `remPlug()` devolve `null` e a falha é silenciosa. Não mexi no arquivo; você decide. |
| B3 | **Ranking falso de constância** (`RKF`: "Lara", "Rafa22", "Bruno"... com números inventados, liga e desliga em `S.rk`). | Vai contra a seção 11 (sem comparação social) e apresenta pessoas inventadas como se fossem reais. Recomendo remover antes de cobrar. |
| B4 | **Ferramentas de teste visíveis no Perfil do APK** ("Simular próximo dia", "Completar TUDO", "Zerar tudo", "Acelerar cronômetros"). | Qualquer usuário consegue inflar o XP. Precisam ficar só na variante de teste. |
| B5 | **Fonte externa:** o corpo do app usa *Space Grotesk* vinda do Google Fonts (rede). A Georgia aparece em 22 regras, nos elementos murim. | Contraria as regras "offline 100%" e "só Georgia". Sem internet, o app cai em `system-ui`. |

---

## 2. Conferência das regras do prompt com o código real

✅ = confere · ⚠️ = diferente (corrigir o prompt) · ➕ = existe e o prompt não cita

### Progressão
- ✅ `XPC=[250,…,1000]`, `costOf(L)=1000+100*(L-10)`, `cum`, `lvlRaw`, `lvlOf` (linhas 1006–1012).
- ✅ Portão do nível 10: `lvlOf` trava em 9 enquanto `S.provaD!==1`. `xpInOf` limita a barra e o XP excedente fica guardado.
- ✅ `RM=[1,1.7,2.4,2.9,3.3,3.6]`, `rkI`, `RKN='EDCBAS'`. `S.rkm` é gravado em `nextDay()→rkSnap()`, então vale a partir do dia seguinte.
- ✅ `LV` Fácil/Médio/Difícil (2/3/4 séries, ×1/×1,5/×2). Dor 2 bloqueia Difícil e dor 3 bloqueia tudo acima de Fácil (botões na abertura e no Perfil).
- ➕ Dor ≥ 2 também **congela o aumento de carga** (`applyFb`). Dor 3 troca Força e Agilidade por mobilidade leve.
- ➕ A cada 4ª semana vem uma **semana leve automática** (`isDl`: uma série a menos).
- ➕ **Sono:** registrar o sono dá +3 XP. Com noite curta, o Kaien oferece "modo leve" só naquele dia (`S.lvBase`).
- ✅ Confiança: `trustPts=min(100, floor(L*1.5+min(25,done/12)))`, 10 degraus `TR`.

### Prova D e cinemática
- ⚠️ **A Prova D tem 3 provas, não 4**: Corpo (checklist adaptado à dor), Mente "O silêncio" (2 textos de 15 ou mais caracteres), Disciplina "A palavra" (compromisso). O prompt pede 4 provas para C/B/A/S. Isso é aceitável como escalada, mas fica registrado.
- ✅ `provaInit/pvReady/pvEnsure/pvOpen/pvClose/pvGo/pvNext/pvCk/pvTxt/pvPass/pvCorpo/pvCard/pvView`, `rankDView`, `rdSfx`, `clearRdT` existem.
- ⚠️ O `rdSfx` **não sintetiza som com WebAudio**. Ele agenda 3 `beep()` (um oscilador de 880 Hz) e vibrações. Para C/B/A/S será preciso criar um sintetizador de verdade.
- ➕ Já existe um `rankView(lvl)` **genérico** (usado para qualquer rank ≠ D), com cores próprias: C azul, B roxo, A laranja, S dourado. Essas cores **não batem** com a paleta da seção 3 (C bronze/jade, B prata/gelo). Existe ainda uma 3ª paleta, `RKC`, no cabeçalho.
- ➕ Já existe `PROV` com textos das provas 20/30/40/50, mas **a tela que mostra isso é inalcançável**: o ramo `else` de `kaiView` nunca roda, porque o seletor só tem h/d/e.

### Kaien (aba)
- ⚠️ **Os 32 capítulos já existem com texto**, nos níveis exatos do prompt. Mas são **curtos: 24 a 46 palavras** (a meta é 120–220). O trabalho é **expandir**, não escrever do zero.
- ⚠️ `CHIMG` só tem **5 capítulos com imagem** (noite:1, noite:2, mestre:0, porque:0, fracasso:0). O capítulo noite:0 usa a cena. Os outros 26 mostram só o ícone.
- ✅ `DI` tem 32 falas por confiança (0 a 100). `ENS` tem 16 ensinamentos (níveis 2 a 50, já distribuídos até o 50).
- ➕ `SEC`: 5 **falas secretas** com condições, que o prompt não cita.
- ➕ **Recordações** (`S.dia`): diário livre do usuário, que guarda também as anotações de missões e dungeons, com editar e apagar.

### Personagem
- ⚠️ `eq` de verdade: `{aura, pose, bg, tone, frame, title}` + **`bgv`** (o fundo que vale de fato) + **`mold`**. O campo `eq.bg` não é usado e `eq.tone` é a roupa (0/1/2 → `pH/pH5/pH10`).
- ⚠️ `FRM` já tem **`rC`** (moldura do rank C), além de `niv` e `rD`. `frmWrap` tem `return inner;` na 1ª linha, então o resto é código morto (é assim que a moldura fica desligada, junto com `frmActive=()=>false`).
- ✅ Títulos: Aprendiz (2), Constante (6), Aspirante (10), mais "Derrotou o X" por chefe.
- ✅ Fundos: Pátio, Cachoeiras (8), Dragões (16). A revelação animada é `revCheck`/`S.bgRev`.
- ⚠️ `ACH` tem **11 conquistas**.

### Dungeons
- ✅ 9 hábitos em `DGH`, 5 andares cada, `MOBS/MOBI/MIMG/MOBIMG/MCOL`, máximo de 3 abertas, um andar por dia (`floorDay`), recaída sem punição (`gRec`).
- ⚠️ **A Fase 2 já existe, mas como "repetição"**: são os mesmos andares e os mesmos monstros, com ×1,5, a partir do nível 7, e o boss vencido vai para `S.defeated2`. O que falta é o **conteúdo evoluído** (4 monstros + chefe novos).
- ⚠️ **"Refazer" (metade do XP) só libera no nível 12**, regra que o prompt não cita.
- ⚠️ **O Espelho não é uma dungeon de 5 andares.** Ele mora na sub-aba "Chefes": `S.esp` tem 2.500 de vida, e cada dia com pelo menos uma missão feita tira dele a soma dos status. A vitória vale 300 XP (`lv>1` paga metade, já pensando num "retorno"). Os andares de `DGH['O Espelho']` e os `MOBS` dele **nunca são usados** (`dgGate` bloqueia).
- ➕ Rotação diária: uma dungeon "opcional, só hoje" (`dgRot`). Procrastinação e Sono ruim existem só como dungeon (não aparecem na abertura).
- ➕ Desistir guarda o XP e marca os andares já pagos (`S.dgNx`) para não pagar de novo.

### Save e migração
- ✅ Chave `kaien.v1`, backup `kaien.v1.bak`, `_mig()`. **Correção:** `_mig` fica **dentro do próprio HTML** (não no "carregador do APK") e grava `S.ver=3`. O backup só é feito quando `ver` muda ou quando o carregamento falha.
- ➕ `_sync()` avança os dias de calendário perdidos (até 60) chamando `nextDay()`. Dia perdido = dia inativo, sem regressão.
- ➕ Salva **a cada `render()`** (stringify do `S` inteiro).

---

## 3. Mapa de módulos (para a Fase 1)

| Módulo proposto | Linhas atuais | Conteúdo |
|---|---|---|
| `state.js` | 639–640, 1619–1632 | `S`, `reset`, `quick`, `_save`, `_sync`, `_mig`, carregador |
| `onboarding.js` | 545–681, 1288–1349 | `steps`, `calc`, perguntas, `obInit/obRender/obFx` |
| `missions.js` | 683–813, 853–875 | `LV`, `CHN`, `AGT`, `lib`, `plan`, `applyFb`, água, sono, `nextDay` |
| `progression.js` | 815–831, 1004–1012 | `RM`, `XPC`, `costOf`, `lvlOf`, `calcXp`, `totalXp`, `streakInfo` |
| `guide.js` | 876–975 | modo guiado, timers, `completeMission`, celebração |
| `dungeons.js` | 977–1003, 1104–1235 | `DGH`, `MOBS`, `BI`, Espelho, carrossel |
| `kaien.js` | 1013–1054 | `DI`, `HIS`, `ENS`, `PROV`, `SEC`, leitor |
| `character.js` | 1055–1103, 1239–1262 | giro 3D, fundos, molduras, `ACH`, `persView` |
| `ranks/d.js` | 1351–1387 | Prova D + 7 atos |
| `reminders.js` | 1389–1417 | lembretes Capacitor |
| `ui/render.js` | 1418–1604 | `render()` (uma função de ~190 linhas com todas as telas) |
| `ui/fx.js` | 1606–1618 | brasas, folhas, tochas |
| `styles/*.css` | 3–535 | ~530 linhas de CSS |

Dados de conteúdo (textos) que devem ir para `data/`: `steps`, `CHN`, `AGT`, `HM`, `SUR`, `DGH`, `BI`, `MOBI`, `MOBS`, `DI`, `HIS`, `ENS`, `PROV`, `SEC`, `TIPS`, `REMTX`, `LVK`, `OPL`, `FRS`.

---

## 4. Estado `S`: todos os campos (95)

**Perfil e abertura:** `i a sc name age h w pull react err warned lvl`
**Dia e missões:** `day ms cups noWater hist progAcc xpPrev px ov wd wd0 tm tm0 tmDay lvBase sugDay slp slh lastDate`
**Rank e prova:** `rkm provaD pv pvo pvAt lvShown lu rcv`
**Personagem:** `eq{aura,pose,bg,tone,frame,title,bgv,mold} mhp bgRev psub mv scn scnP scnSeen`
**Kaien:** `ksub kst kread rd tp dia dv dvf dedit ddel wdr`
**Dungeons:** `dg dgAll dgHist dgDone dgMsg dgCf dgList dgAsk dgHelp dgNx dgRi dgRot dgMiss dgSplash floorDay defeated defeated2 bi bossSeen esp hit dsub`
**Lembretes:** `rem remMsg`
**Interface temporária (salva, mas não deveria):** `g cel top tab entering splashDay mHelp rk rstAsk rdAsk fast _eh`
**Versão:** `ver` (= 3)

Campos mortos ou sem leitura útil: `mhp`, `eq.pose`, `eq.bg`, `eq.frame`, `dgHist` (só recebe dados), `S.rk` (ranking falso).

---

## 5. Ritmo atual (simulação real, Playwright/Chromium 390×844)

Bot só com missões diárias (sem dungeons), sono registrado, Prova D aprovada assim que libera:

| Perfil | Nível 10 | Nível 20 | Nível 30 | Nível 40 | **Nível 50** |
|---|---|---|---|---|---|
| Fácil, 100% dos dias | dia 68 | 180 | 316 | 474 | **654 (~21 meses)** |
| Médio, 100% | dia 46 | 121 | 212 | 319 | **439 (~14 meses)** |
| Médio, 80% dos dias | dia 59 | 161 | 273 | 415 | **566 (~18,5 meses)** |
| Difícil, 70% dos dias | dia 52 | 132 | 240 | 364 | **507 (~16,5 meses)** |

**Leitura preliminar:** o perfil Médio cai **dentro da meta de 12–18 meses** e o nível 10 sai em 1,5–2 meses. **Por isso, à primeira vista, não proponho mudar `costOf` nem `RM`.** As dungeons aceleram o ritmo; a simulação completa (com dungeons e falhas aleatórias) fica para a Fase 2. Zero erros de página (só falhas esperadas de carregamento: fonte bloqueada e imagens retiradas).

---

## 6. Pontos frágeis e dívida técnica

1. **XP do dia é recalculado ao vivo** (`totalXp = xpPrev + calcXp() + dgXp()`). Se uma atualização mudar `plan()` (XP de uma missão, novo tipo de missão), **o XP de hoje, ainda não guardado, muda**. Toda mudança de XP de missão deve valer só a partir do dia seguinte.
2. **Novos portões (20/30/40/50) podem "baixar" o nível exibido** de quem já tem XP acima (testers que usaram "Simular dia"). É preciso um "provaInit" para cada rank, dando o portão como cumprido a quem já passou (como já é feito no D).
3. `render()` é envolvido **3 vezes** (save, `dcInit/ovSync` via `setTimeout`). A ordem depende do tempo de carregamento.
4. Cada `render()` roda `plan()`/`calc()` dezenas de vezes (`progOf` ×6, `ACH.f()`, `calcXp`), mais `JSON.stringify(S)`. Hoje dá conta; com `hist` de 500+ dias, vale medir no Android modesto.
5. **Dois relógios** (`#clk`) com dois `setInterval`. Timer do guia a cada 250 ms, sempre ativo.
6. `esc()` não escapa `'`. Hoje os nomes de hábito passam por `q()`. Para o **Importar JSON** (Fase 7), o arquivo importado precisa ser validado campo a campo.
7. 16 `backdrop-filter` e 3 `mix-blend-mode` no CSS (o limite da seção 6 pede cautela).
8. Classes genéricas em massa: `.g` (76 usos), `.b`, `.r`, `.v`, `.l`, `.o`, `.sp`. Toda classe nova vai ter prefixo.
9. Código morto: `frmWrap` depois do `return`, `PROV` sem tela, `dgRoll`, `S.mhp`, os andares de `DGH['O Espelho']`.
10. Os tokens CSS `:root` são **azul e dourado** (`--bg:#0d1020`, `--gold:#f8b940`). Pergaminho e carmesim existem só como cores fixas espalhadas, sem token.
11. Título da página: "Kaien: teste da abertura".

---

## 7. Riscos de migração

- Campo novo sem padrão em `_mig` = `undefined` em contas (já aconteceu: `S.dgAll`, `S.esp.max` têm correções pontuais espalhadas pelo código).
- `S.ver` só existe como 3. Proposta: `_mig` passa a ter **etapas por versão** (3→4→…), sempre com backup antes.
- `defeated3`, `provaC/B/A/S`, novas roupas e fundos: todos com padrão 0 e concessão retroativa por nível (como `grantLv`).
- Saves de teste com nível > 10 sem `provaD` (gerados com as ferramentas de teste) precisam ser cobertos pelo teste de save antigo.

---

## 8. O que NÃO tocar (sem aprovação)

`XPC`, `costOf`, `RM`, `lvlOf`/portão D, `LV` e as regras de dor, `calcXp` e o bônus de conclusão, `applyFb`/progressão de carga, `nextDay`/`_sync`, a chave e o formato de `kaien.v1`, a Prova D e `rankDView`, os textos de saúde e apoio, o modal de contatos, o aviso "Sobre o app", `build.yml`.

---

## 9. Saúde e ética: pontos para checagem humana

- O modal de apoio lista **CVV 188** e **SAMU 192**, e orienta procurar UBS/CAPS AD. Ainda não verifiquei esses números na web; a verificação fica para a Fase 7 e precisa de revisão humana antes de publicar.
- Apostas cita "Jogadores Anônimos", e o Álcool já avisa "não pare de uma vez se bebe muito". Os dois estão bons e devem ser mantidos.
- Idade mínima "16 anos (provisória)": é uma decisão jurídica.
- Ranking falso (B3) e ferramentas de teste (B4).

---

## 10. Testes rodados nesta fase

| Teste | Resultado |
|---|---|
| Carregar `index-sem-imagens.html` no Chromium 390×844 | OK, 0 erros de JS |
| Simulação 1→50 (4 perfis, até 900 dias) | OK, tabela da seção 5 |
| Comparar com `index.html` e `index (1).html` do repo | Ambos são versões **anteriores** |

Não testado (só no aparelho real): lembretes, vibração, toque, desempenho.

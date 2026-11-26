# Plano da expansão (Prompt 2): decisões, prioridades e especificações

Você pediu para eu construir tudo até o fim sem pausas. Este documento registra **o que decidi e por quê**, para você revisar e pedir ajustes. Tudo foi implementado, salvo os itens marcados como cortados ou adiados.

## 1. Tabela de priorização

Impacto na retenção (I), esforço (E) e risco (R): A = alto, M = médio, B = baixo.

| Ideia | I | E | R | Rank | Decisão |
|---|---|---|---|---|---|
| A1 Mapa do Caminho | A | M | B | D (11) | Feito: mapa vertical com 50 paradas, prêmio, frase e data em que você chegou |
| A2 Estações e clima | M | B | B | todos | Feito: hemisfério sul + hora do dia; desliga em "Reduzir efeitos" e nos Ajustes |
| A3 Escolas | A | M | M | C (20) | Feito: 4 escolas, brasão, falas, bônus de +10% opcional a partir do dia seguinte, troca 1 vez por rank |
| A4 Meu Templo | A | M | B | C (25) | Feito: cena em vetor que cresce, vitrine de itens e troféus |
| A5 Companheiros | A | M | B | C–A | Feito: Lian (20), Bao (24), Jin (30), Yue (40); fala semanal, ensinos e lembranças |
| A6 Cartas do Mestre | A | B | B | 15–50 | Feito: 8 cartas do velho mestre (a cada 5 níveis) + 6 do Kaien (dias 7, 30, 60, 100, 200, 365), com dados reais |
| B1 Meditação | A | B | M (saúde) | D (14) | Feito: 1, 3 ou 5 min, vale como Mente; sem apneia, aviso de tontura |
| B2 Kata | M | M | M (saúde) | C (21) | Feito: 6 katas, nível limitado pela dor, versão mais leve, dor 3 = só a Kata da Água |
| B3 Mandamentos | A | B | B | D (13) | Feito: até 3, conta dias cumpridos (nunca zera), selos 7/21/66, +2 XP |
| B4 Diário do Discípulo | A | M | M (saúde) | C (23) | Feito: 30 perguntas, resposta por palavras-chave, apoio CVV em risco, página do mês, apagar tudo |
| B5 Torneio Silencioso | M | B | B | D (17) | Feito: 3 tarefas por semana, compara só com a sua semana anterior |
| B6 Retiros | A | B | B | **desde o nível 1** | Feito. **Mudei o rank:** descanso por doença não pode ficar trancado |
| B7 Missões de Cena | M | M | B | B (31) | Feito: 7 cenas (31, 34 … 49), sem escolha errada, muda a fala do Kaien por 3 dias |
| B8 Receitas e Elixires | B | B | M (saúde) | C (26) | **Fundido** nos Ensinos (tema "Elixires", 6 entradas): menos risco, sem lista de comidas |
| C1 Fases 2 e 3 | A | G | M | 7 / 30 | Feito: 45 monstros evoluídos + 9 Formas Verdadeiras |
| C2 Torre dos Mil Degraus | M | B | B | B (30) | Feito: +1 andar por dia ativo, nunca desce, marcos com títulos |
| C3 Invasões | M | M | B | B (36) | Feito: 4 por ano, 7 dias, vence com 5 dias ativos; volta no ano seguinte |
| C4 Bestiário | A | M | B | D (11) | Feito: 99 entradas com o que o monstro simboliza, dica real e data da vitória |
| C5 Espelho aprofundado | A | M | M (saúde) | 20/35/50 | Feito: Sombra no Espelho (20), Espelho do Passado (35), do Futuro (50), com apoio CVV |
| D1 Armas cerimoniais | B | B | B | A (40–50) | Feito: 6 itens só de vitrine, no Templo |
| D2 Aura dinâmica | M | B | B | C (25) | Feito: "Aura da semana", na cor do atributo mais treinado |
| D3 Moldura evolutiva | M | M | B | — | **Adiado:** o Prompt 1 pede a sua aprovação para reativar molduras |
| D4 Títulos compostos | M | B | B | A (40) | Feito: 10 prefixos × 8 sufixos, com concordância de gênero |
| D5 Galeria de Cenas | M | M | B | D (14) | Feito: fundos, capítulos, monstros, rever ascensões |
| D6 Cartão de Discípulo | B | M | M | A (43) | Feito: imagem sem dados pessoais (o apelido é opcional) |
| E1 Marcos de calendário | A | B | B | todos | Fundido com as Cartas |
| E2 Retrospectiva | M | M | B | B (33) | Feito: mês atual, mês anterior e relatório anual (rank S ou 365 dias) |
| E3 Heatmap | A | B | B | todos | Feito: 16 semanas em pinceladas; pausas em cinza e retiro em outra cor, nunca como falha |
| E4 Retorno gentil | A | B | B | todos | Feito: depois de 2 dias parado, cartão acolhedor com missão de 1 minuto |
| E5 Dificuldade sugerida | M | — | B | todos | Já existia no app (sugestão de subir ou descer); mantido |
| E6 Intenção do rank | M | B | B | D+ | Feito: palavra + frase, mostrada no Início, lembrada na prova e na ascensão |
| F Áudio | M | M | B | todos | Feito: sons sintetizados (pincel, selo, gongo, sino, trovão, vento) e paisagem sonora por rank (desligada por padrão), mudo e volume |
| G Qualidade | A | M | B | todos | Feito: dica da primeira vez em cada sistema, Central de Ajuda, tamanho de fonte, alto contraste, reduzir efeitos, backup e privacidade |

## 2. Ideias extras minhas (dentro do limite de 10)

1. **Missão do Mestre por rank:** 3 tarefas opcionais por rank, sem prazo, valendo 80 XP × rank.
2. **Variedade por rank:** surpresas novas a cada rank, 4 práticas de Mente novas (rank C+), variações da missão de Hábito.
3. **Selos de atributo:** marcos 25, 50 e 100 ao lado de cada atributo.
4. **Fala de hoje do Kaien:** muda com o dia da semana e com o que aconteceu ontem (parcial, dor, recaída, volta, dia completo, retiro).
5. **Cor do nome:** Aço, Jade, Prata, Ouro e Lunar.
6. **Lembretes por rank:** frases novas a cada rank.
7. **Apoio em crise unificado:** a mesma detecção gentil no Diário e nos Espelhos, sem bloquear nada.
8. **Variações de arte por filtro:** enquanto a arte nova não existe, o app usa uma versão recolorida da arte atual (bronze, prata, ouro, lunar) no lugar de um "buraco".

## 3. Números e regras que decidi

- **Ritmo (aprovado por você):** cada nível custa metade do XP original. Resultado da simulação em `RELATORIO-FINAL.md`.
- **Portões de rank** nos níveis 20/30/40/50, iguais ao do 10: o nível trava até a Prova, o XP excedente fica guardado. Quem já tinha visto o nível do portão ganha a prova como cumprida.
- **Provas C/B/A/S:** 4 provas cada (Corpo, Mente, uma temática do rank, Disciplina). O Corpo usa o mesmo cálculo da Prova D (respeita o nível e a dor).
- **XP novos:** Mandamento +2; Torneio 40 × rank; Missão de Cena 50 × rank; Missão do Mestre 80 × rank; Espelho do Passado e do Futuro 100 × rank; Invasão 150 × rank; Torre +25 × rank a cada 10 andares. Na Fase 3, o chefe dá 200 de bônus e os andares valem ×2.
- **Bônus de Escola:** +10% nas missões dos 2 atributos da escola (Montanha: +5% em tudo), só a partir do dia seguinte à escolha.

## 4. Estado novo (`S`) e migração

O save vai para a versão 5, com backup automático antes de migrar.

Campos novos, todos com valor padrão: `cfg`, `lvd`, `provaC/B/A/S`, `pvx`, `pvxAt`, `int`, `retG`, `cartas`, `cartaQ`, `med`, `medN`, `kata`, `kataN`, `kataLeve`, `ret`, `retN`, `retH`, `mand`, `trn`, `dia[].src='dd'`, `esc`, `compSel`, `torre`, `inv`, `bst`, `defeated3`, `espR`, `espT`, `cenas`, `cenaEco`, `renov`, `mm`, `ensl`, `slc`, `tut`, `eq.nc`, `eq.tc`, `eq.tcx`, `bgRev` (agora pode ir até 10), `eq.aura` (0–7) e `eq.tone` (0–6).

Testado com saves reais dos níveis 1, 5, 9, 10 e 16: XP idêntico e nenhum campo perdido.

## 5. Checklist de saúde e ética por recurso

| Recurso | Cuidados aplicados |
|---|---|
| Meditação | Só respiração 4/6, sem prender o ar, aviso de tontura, sem promessa |
| Kata | Sem equipamento; nível limitado pela dor; dor 3 = só mobilidade; "pare se sentir dor, tontura ou falta de ar" |
| Elixires | Sem calorias, dieta, jejum ou metas de peso; encaminha para nutricionista ou médico |
| Diário do Discípulo e Espelhos | Fica só no aparelho; apagar tudo; palavras de risco mostram CVV 188 e SAMU 192 com gentileza, sem bloquear; nada de "terapia" |
| Vícios (dungeons) | Redução gradual; álcool: "não pare de uma vez se bebe muito"; UBS, CAPS AD, Jogadores Anônimos; recaída nunca tira nada |
| Retiro | Descanso sem perda; orienta procurar serviço de saúde |
| Gamificação | Sem ranking entre pessoas (o ranking fictício foi removido), sem loja, sem contagem regressiva ansiosa, sem perda de sequência, invasões voltam no ano seguinte |
| Prova Corpo | Igual à Prova D: dor 2 ou mais vira mobilidade |

## 6. O que ficou de fora

- **D3 Moldura evolutiva:** aguarda a sua aprovação para reativar molduras (`frmActive`).
- **Cobrança e assinatura:** fora do escopo, como pede o Prompt 1.
- **Tradução:** só a preparação. Os textos ficam em arquivos de dados, e a entrega é em pt-BR.

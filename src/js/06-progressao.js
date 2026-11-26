const REW={2:{n:'Título: Aprendiz'},3:{n:'Capítulo 1 do mestre Kaien: a noite no pátio',m:1},4:{n:'Aura cinza do personagem e capítulo 2 do diário'},5:{n:'Nova roupa do personagem',m:1},6:{n:'Título: Constante'},7:{n:'Chefe: O Espelho'},8:{n:'Novo fundo: Templo das Cachoeiras',m:1},9:{n:'Capítulo 3 do diário'},10:{n:'Roupa nova do rank D e o título Aspirante',m:1},16:{n:'Novo fundo: Templo dos Dragões',m:1},
11:{n:'Mapa do Caminho e Bestiário'},12:{n:'Aura de Aço'},13:{n:'Mandamentos e o título Persistente'},14:{n:'Meditação do Amanhecer e Galeria de Cenas'},
15:{n:'Carta do Mestre e o título Discípulo do Templo',m:1},17:{n:'Torneio Silencioso: a prova semanal'},18:{n:'Título: Coração de Ferro'},19:{n:'Cor do nome: Aço'},
20:{n:'Rank C: roupa de bronze, fundo Floresta de Bambu, título Lâmina de Bronze, Escolas, a companheira Lian e o retorno do Espelho',m:1,rk:1},
21:{n:'Treino Kata'},22:{n:'Aura de Jade'},23:{n:'Diário do Discípulo'},24:{n:'O companheiro Bao e o título Bambu que Verga'},
25:{n:'Carta do Mestre, Meu Templo e a aura da semana',m:1},26:{n:'Elixires e o título Passo Leve'},27:{n:'Cor do nome: Jade'},28:{n:'Título: Raiz Profunda'},29:{n:'Novo fundo: Bambu ao Luar'},
30:{n:'Rank B: roupa de prata, fundo Montanha da Tempestade, título Pico de Prata, Forma Verdadeira, Torre dos Mil Degraus e o companheiro Jin',m:1,rk:1},
31:{n:'Missões de Cena'},32:{n:'Aura de Prata'},33:{n:'Retrospectiva do mês'},34:{n:'Título: Vento da Montanha'},
35:{n:'Carta do Mestre, o Espelho do Passado e o fundo Tempestade',m:1},36:{n:'Invasões das estações'},37:{n:'Cor do nome: Prata'},38:{n:'Título: Neve que Não Cede'},39:{n:'Templo: o Portão da Montanha'},
40:{n:'Rank A: roupa dourada, fundo Palácio do Dragão, título Garra do Dragão, a companheira Yue, armas cerimoniais e títulos compostos',m:1,rk:1},
41:{n:'Arma cerimonial: Leque do Vento'},42:{n:'Aura de Ouro'},43:{n:'Cartão de Discípulo'},44:{n:'Arma cerimonial: Cajado do Velho Mestre'},
45:{n:'Carta do Mestre e o fundo Jardim do Dragão',m:1},46:{n:'Título: Chama Serena'},47:{n:'Cor do nome: Ouro'},48:{n:'Título: Sombra do Mestre e o Selo de Jade'},49:{n:'Arma cerimonial: Talismã da Lua'},
50:{n:'Rank S: manto do mestre, fundo Pico da Lua, aura lunar, título Mestre do Caminho, o Espelho do Futuro e o Caminho do Mestre',m:1,rk:1}};
// Títulos de nível, em ordem de prestígio: [nome, nível].
const TITN=[['Aprendiz',2],['Constante',6],['Aspirante',10],['Persistente',13],['Discípulo do Templo',15],['Coração de Ferro',18],['Lâmina de Bronze',20],['Bambu que Verga',24],['Passo Leve',26],['Raiz Profunda',28],['Pico de Prata',30],['Vento da Montanha',34],['Neve que Não Cede',38],['Garra do Dragão',40],['Chama Serena',46],['Sombra do Mestre',48],['Mestre do Caminho',50]];
// Títulos extras (Escola, Torre, Invasões, Caminho do Mestre...): cada módulo empurra uma função que devolve nomes.
const TITX=[];
const titlesOf=L=>{const a=TITN.filter(t=>L>=t[1]).map(t=>t[0]);Object.keys(S.defeated||{}).forEach(h=>a.push('Derrotou o '+DGH[h].m));TITX.forEach(f=>{try{f(L).forEach(t=>{if(a.indexOf(t)<0)a.push(t)})}catch(e){}});return a};
// Custo de XP por nível. Metade do original (aprovado em 26/11/2026: "50% mais rápido").
// Original: XPC=[250,300,400,550,600,650,700,800,900,1000] e 1000+100*(L-10).
// O XP total do jogador não muda; quem já jogava apenas sobe de nível.
const XPC=[125,150,200,275,300,325,350,400,450,500];
const costOf=L=>L<=10?XPC[L-1]:500+50*(L-10);
const cum=L=>{let s=0;for(let i=1;i<L;i++)s+=costOf(i);return s};
const lvlRaw=x=>{let L=1;while(x>=cum(L+1))L++;return L};
// Portões de rank: o nível trava no anterior até a Prova de Ascensão. O XP excedente fica guardado.
const GATES=[[10,'provaD'],[20,'provaC'],[30,'provaB'],[40,'provaA'],[50,'provaS']];
const lvlOf=x=>{const L=lvlRaw(x);for(const g of GATES)if(L>=g[0]&&S[g[1]]!==1)return g[0]-1;return L};
const xpInOf=x=>{const L=lvlOf(x);return Math.min(costOf(L),x-cum(L))};
const myLvl=()=>lvlOf(totalXp());
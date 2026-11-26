# Kaien

App de hábitos e evolução pessoal, gamificado, com o mentor Kaien (estética murim).

## Estrutura

```
src/index.template.html   casca do HTML (head + body)
src/styles/*.css          estilos, na ordem de src/ordem.json
src/js/*.js               código, na ordem de src/ordem.json (um único script, escopo global)
assets/img/<nome>.webp    imagens (nome estável; veja ARTE-MANIFESTO.md)
assets/fonts/             Space Grotesk (licença OFL), sem depender da internet
tools/build.js            monta o app num único index.html
tools/extrair-imagens.js  tira as imagens base64 de um index.html antigo para assets/img/
qa/                       testes Playwright e capturas de tela
```

## Build

```
node tools/build.js                         # dist/        imagens em arquivos (APK)
node tools/build.js --imagens=inline        # um único arquivo com tudo embutido
node tools/build.js --variante=teste        # dist-teste/  começa do zero e mostra as ferramentas de teste
node tools/build.js --imagens=sem           # igual ao antigo index-sem-imagens.html (para revisar o código)
```

A ordem dos arquivos importa: tudo vira um único `<script>`, como era antes. Imagem que falta vira placeholder.

## Testes

```
node qa/testes.js dist/index.html [outro.html] [--telas=qa/screens/x]   # abertura, 35 dias (30 combinações), dungeons, paridade
node qa/teste-saves.js dist/index.html                                    # saves antigos dos níveis 1, 5, 9, 10 e 16
```

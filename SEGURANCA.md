# Segurança do Kaien: os 20 itens do checklist

O Kaien é um app **local**: não tem servidor, login, banco de dados nem API. Os dados ficam só no celular. Por isso, parte do checklist (que foi feito para apps com servidor) **não se aplica**. O que se aplica foi feito e testado (`qa/teste-seguranca.js`).

| # | Item | Situação no Kaien |
|---|---|---|
| 1 | Esconder API keys | ✅ O app não usa nenhuma chave. Conferido no código e em todo o histórico do Git: nenhuma chave encontrada. |
| 2 | Limpar secrets do git | ✅ Histórico verificado. O único segredo é o `GITHUB_TOKEN`, que o próprio GitHub cria e nunca fica no código. O build agora **falha** se aparecer algo parecido com uma chave no código. |
| 3 | Public key no banco de dados | ➖ Não há banco de dados nem servidor. |
| 4 | Ativar RLS | ➖ Não há banco de dados. |
| 5 | Criptografia de dados | ✅ **O backup pode ser protegido com senha**: criptografia AES-GCM de 256 bits, com a chave derivada da senha por PBKDF2-SHA256 (150 mil rodadas). Sem a senha, o arquivo é ilegível. Dentro do celular, os dados ficam no espaço privado do app, que outros apps não acessam. |
| 6 | Auth no servidor | ➖ Não há login nem servidor. |
| 7 | Restringir acessos | ✅ Permissões mínimas no Android: só vibração e notificações. Nada de câmera, localização, contatos ou arquivos. |
| 8 | Bloquear mass assignment | ✅ A importação de backup só aceita os campos esperados, com tipos e limites conferidos. XP negativo, dia inválido e nome gigante são recusados. Campos perigosos (`__proto__`, `constructor`) são removidos. |
| 9 | Proteger cookies | ➖ O app não usa cookies. |
| 10 | Hash nas senhas | ✅ A única senha (a do backup) nunca é guardada: ela só gera a chave na hora, por PBKDF2. |
| 11 | Rate limit | ➖ Não há servidor para receber requisições. |
| 12 | Proteção contra bots | ➖ Não há servidor nem cadastro. O **bot de teste 🤖** fica desligado por padrão no APK final (ver abaixo). |
| 13 | Queries parametrizadas | ➖ Não há banco SQL. O app também não usa `eval` nem executa texto como código. |
| 14 | Validação dos inputs | ✅ Nome, mandamentos e textos são limpos (sem caracteres de controle nem truques de direção de texto) e têm limite de tamanho. Todo texto do usuário é "escapado" antes de aparecer na tela, inclusive aspas simples, o que impede injeção de HTML. Testado com `<img src=x onerror=...>` no nome. |
| 15 | Não vazar conteúdo | ✅ **Política de Segurança de Conteúdo (CSP)**: o app não consegue carregar nada nem enviar dados para fora do próprio app. **Backup automático do Google desligado** (`allowBackup=false`), para o diário e os hábitos não irem para a nuvem sem você saber. Sem analytics, sem rastreadores, sem envio de "referer". O Cartão de Discípulo não mostra dados pessoais (o apelido é opcional). Senhas e textos de importação nunca são salvos. |
| 16 | Restringir uploads | ✅ O único "upload" é importar o backup: só arquivo `.json`/texto, até 5 MB, validado e limpo antes de usar. |
| 17 | Trim nas respostas de API | ➖ Não há API. |
| 18 | Security headers | ✅ CSP, `object-src 'none'`, `frame-src 'none'`, `base-uri 'none'`, `form-action 'none'` e `referrer: no-referrer`, colocados na própria página. |
| 19 | Forçar HTTPS | ✅ O app roda dentro do Capacitor em `https://localhost`. Tráfego sem criptografia (`http`) foi proibido no manifesto (`usesCleartextTraffic=false`). |
| 20 | Scan de dependências | ✅ O build roda `npm audit` nas dependências do Capacitor e avisa se houver vulnerabilidade alta. O app em si não tem dependências externas. |

## Antes de publicar na loja

- **Desligue o bot de teste:** ao rodar "Gerar APK", desmarque **"Incluir o bot de teste"**. Com ele ligado, qualquer pessoa consegue inflar o próprio XP.
- **APK de release assinado:** hoje o workflow gera um APK de *debug*. Para a Play Store é preciso um APK/AAB de *release*, assinado com uma chave guardada nos **Secrets do GitHub** (nunca no código).
- **Política de privacidade e LGPD:** a tela de Privacidade já explica o que é guardado. Ainda falta a revisão jurídica.
- **Opcional:** bloquear capturas de tela (`FLAG_SECURE`) para proteger o diário. Mas isso também impede o usuário de tirar print dos próprios progressos; é uma decisão sua.
- **Opcional:** os lembretes mostram o seu apelido na tela bloqueada ("Bom dia, Lia"). Se preferir, deixo a mensagem sem o nome.

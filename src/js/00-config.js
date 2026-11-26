// Gerado no build: true só na variante de teste (mostra as ferramentas de teste no Perfil).
const KAIEN_TESTE=@@TESTE@@;
// Gerado no build: true com --bot ou na variante de teste (mostra o bot 🤖). Desligar antes de publicar.
const KAIEN_BOT=@@BOT@@;
// Ganchos dos módulos novos: migração/valores padrão do estado S e ações após cada render.
const MIGS=[],AFTER_RENDER=[];
// PLAN_MODS: funções (missões)->missões aplicadas ao plano do dia (Retiro, Meditação, Kata, Escola...).
// MDONE: chamadas quando uma missão termina (m, estado). INI_CARDS: cartões extras no Início.
const PLAN_MODS=[],MDONE=[],INI_CARDS=[],NDAY=[];
const runMigs=()=>MIGS.forEach(f=>{try{f()}catch(e){console.warn('mig',e)}});
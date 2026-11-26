// Gerado no build: true só na variante de teste (mostra as ferramentas de teste no Perfil).
const KAIEN_TESTE=@@TESTE@@;
// Ganchos dos módulos novos: migração/valores padrão do estado S e ações após cada render.
const MIGS=[],AFTER_RENDER=[];
const runMigs=()=>MIGS.forEach(f=>{try{f()}catch(e){console.warn('mig',e)}});
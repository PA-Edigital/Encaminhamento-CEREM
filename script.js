const escolas = ["C.E.I.M. Anna Vianna De Andrade","C.E.I.M. Carlos Barreto","C.E.I.M. Francisco Sales","C.E.I.M. Hermelinda Toledo","C.E.I.M. Ir. Dino Girardelli","C.E.I.M. Ismênia Vitta Reis","C.E.I.M. Lázara Casarini Diani","C.E.I.M. Maria De Paiva Garcia","C.E.I.M. Marilisa Lopes De Oliveira","C.E.I.M. Meyre Aparecida De Pinho","C.E.I.M. Monica Daniele Fernandes De Souza","C.E.I.M. Nair Massafera Da Silva","C.E.I.M. Prof.ª Evangelina Meirelles De Miranda","C.E.I.M. Profª Benedita De Fátima Canadas","C.E.I.M. Profª Isabel Aparecida Dala Rosa Costa","C.E.I.M. Profª Leonor Pereira De Faria","C.E.I.M. Profª Maria Conceição De Castro Monteiro","C.E.I.M. Profª Maria Da Conceição Nunes De Paiva","C.E.I.M. Profª Maria Grafira Nunes Saponara","C.E.I.M. Recanto Feliz","C.E.I.M. Sebastião Cezário","C.E.M.E.J.A. Profª Jandyra Meyer Azevedo","E.M. Anathalia Lourdes Camanducaia","E.M. Anita Faria Amaral","E.M. Antônio Mariosa","E.M. Dom Otávio","E.M. Dr. Ângelo Cônsoli","E.M. Dr. Vasconcelos Costa","E.M. Jandyra Tosta De Souza","E.M. Monsenhor Júlio Perlatto","E.M. Pio XII","E.M. Profª Clarisse Toledo","E.M. Profª Isabel Coutinho Galvão","E.M. Profª Josefa Azevedo Torres","E.M. Profª Maria Barbosa","E.M. Sabina De Barros Mendonça","E.M. Santo Antônio","E.M. São Benedito","P.E.M. Comunidade Alegrinho","P.E.M. Coronel Brito Filho","P.E.M. Monsenhor Mendonça"];
const anos = ["Berçário I","Berçário II","Maternal I","Maternal II","Pré I","Pré II","1º Ano","2º Ano","3º Ano","4º Ano","5º Ano","6º Ano","7º Ano","8º Ano","9º Ano"];
const blocos1 = [
  {titulo:"ATENÇÃO", perguntas:["O estudante consegue finalizar tarefas que demandam atenção significativa?","O estudante durante o período de aula consegue se manter focado na maior parte do tempo?","Períodos de dispersão da atenção durante a aula são frequentes?"]},
  {titulo:"LINGUAGEM", perguntas:["O estudante troca letras ou palavras com frequência?","O estudante consegue formular frases coerentes com a situação e com a gramática básica?","O estudante possui atraso de fala quando comparado aos alunos da mesma idade?","O aluno compreende expressões faciais e corporais de outras pessoas?","O aluno entende situações de entrelinhas, linguagem figurada, duplo sentido e piadas?"]}
];
const blocos2 = [
  {titulo:"COMPORTAMENTO", perguntas:["O estudante respeita a rotina do grupo?","Mostra-se irritado com barulhos?","O estudante parece não ouvir quando chamado?","O estudante não realiza contato visual?","O estudante realiza contato visual e não o mantém?","Apresenta algum incômodo quando entra em contato com materiais com texturas diferentes?","O aluno apresenta acessos de raiva?","O aluno possui obsessão por organização?","O aluno apresenta interesse exagerado por algum assunto específico?","O estudante apresenta comportamento frequente de agitação que atrapalha as atividades acadêmicas?","O estudante apresenta comportamento frequente de impulsividade que atrapalham as atividades acadêmicas?"]},
  {titulo:"ASPECTOS PSICOMOTORES", perguntas:["O estudante consegue realizar tarefas que demandam destreza de movimento? Como cortar e colar?","Apresenta desequilíbrios ou quedas constantes?","Consegue participar das atividades físicas?","Realiza algum movimento diferente e repetitivo, como mexer com os dedos e as mãos de forma peculiar?"]},
  {titulo:"ASPECTOS COGNITIVOS", perguntas:["Consegue acompanhar o desenvolvimento intelectual como a maioria dos alunos da mesma turma?","O aluno consegue compreender comandos e segui-los?","O aluno tem facilidade de memorização?","Esquece com facilidade o que foi administrado em aula?","O estudante tem capacidade de imaginação reduzida?"]},
  {titulo:"SOLUÇÃO DE PROBLEMAS", perguntas:["O estudante consegue resolver sozinho pequenos problemas do dia a dia?"]},
  {titulo:"INTERAÇÃO SOCIAL", perguntas:["O estudante possui amizades dentro da escola com pessoas da mesma idade?","Interage em atividades sociais realizadas pela turma?","O estudante se junta a outras pessoas por iniciativa própria?"]}
];

function popularSelect(id, lista){const sel=document.getElementById(id); sel.innerHTML='<option value=""></option>'+lista.map(x=>`<option>${x}</option>`).join('');}
function montarTabela(bloco, prefixo){let html=`<table class="tabela-avaliacao"><thead><tr><th>${bloco.titulo}</th><th>SIM</th><th>NÃO</th></tr></thead><tbody>`; bloco.perguntas.forEach((p,i)=>{const n=`${prefixo}_${bloco.titulo.replace(/\W/g,'')}_${i}`; html+=`<tr><td>${p}</td><td><input type="radio" name="${n}" value="Sim" required></td><td><input type="radio" name="${n}" value="Não" required></td></tr>`;}); return html+'</tbody></table>';}
function somenteDigitos(valor){return String(valor||'').replace(/\D/g,'');}
function mascararData(valor){
  const d=somenteDigitos(valor).slice(0,8);
  if(d.length<=2) return d;
  if(d.length<=4) return d.slice(0,2)+'/'+d.slice(2);
  return d.slice(0,2)+'/'+d.slice(2,4)+'/'+d.slice(4,8);
}
function mascararCPF(valor){
  const d=somenteDigitos(valor).slice(0,11);
  if(d.length<=3) return d;
  if(d.length<=6) return d.slice(0,3)+'.'+d.slice(3);
  if(d.length<=9) return d.slice(0,3)+'.'+d.slice(3,6)+'.'+d.slice(6);
  return d.slice(0,3)+'.'+d.slice(3,6)+'.'+d.slice(6,9)+'-'+d.slice(9,11);
}
function mascararCEP(valor){
  const d=somenteDigitos(valor).slice(0,8);
  return d.length>5 ? d.slice(0,5)+'-'+d.slice(5) : d;
}
function parseDataBR(valor){
  const m=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(valor||'').trim());
  if(!m) return null;
  const dia=Number(m[1]), mes=Number(m[2]), ano=Number(m[3]);
  const data=new Date(ano, mes-1, dia);
  if(data.getFullYear()!==ano || data.getMonth()!==mes-1 || data.getDate()!==dia) return null;
  return data;
}
function dataValidaBR(valor){return !!parseDataBR(valor);}
function calcularIdade(){
  const campo=document.getElementById('dataNascimento');
  const saida=document.getElementById('idade');
  const nasc=parseDataBR(campo?.value);
  if(!nasc){saida.value='';return;}
  const hoje=new Date();
  let anos=hoje.getFullYear()-nasc.getFullYear();
  const m=hoje.getMonth()-nasc.getMonth();
  if(m<0||(m===0&&hoje.getDate()<nasc.getDate())) anos--;
  saida.value = anos>=0 ? `${anos} ano(s)` : '';
}
function dataBR(valor){return dataValidaBR(valor) ? String(valor).trim() : '';}
function dataParaNomeArquivo(){
  const data=parseDataBR(document.getElementById('dataAutorizacao').value) || new Date();
  return `${String(data.getDate()).padStart(2,'0')}-${String(data.getMonth()+1).padStart(2,'0')}`;
}
function limparNomeArquivo(txt){return (txt||'Aluno').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\\/:*?"<>|]/g,'').replace(/\s+/g,' ').trim() || 'Aluno';}
function nomeArquivo(){return `Encaminhamento CEREM - ${limparNomeArquivo(document.getElementById('nomeAluno').value)} - ${dataParaNomeArquivo()}.pdf`;}
function setStatus(msg){document.getElementById('status').textContent=msg||'';}

function carregarScript(src){return new Promise((resolve,reject)=>{const existente=[...document.scripts].find(s=>s.src===src); if(existente){resolve();return;} const s=document.createElement('script'); s.src=src; s.onload=resolve; s.onerror=reject; document.head.appendChild(s);});}
async function garantirJsPDF(){
  if(window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if(window.jsPDF) return window.jsPDF;
  const fontes=[
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js'
  ];
  for(const fonte of fontes){try{await carregarScript(fonte); if(window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;}catch(e){}}
  throw new Error('Biblioteca jsPDF não carregada.');
}
function valor(id){return (document.getElementById(id)?.value || '').trim();}
function marcado(name){const el=document.querySelector(`input[name="${name}"]:checked`); return el ? el.value : '';}
function checkbox(id){return document.getElementById(id)?.checked || false;}
function motivoMarcado(rotulo){return [...document.querySelectorAll('input[name="motivo"]')].some(el=>el.value===rotulo && el.checked);}


function atualizarEstadoOutros(){
  const marcado=checkbox('motivoOutros');
  const campo=document.getElementById('motivoOutrosTexto');
  if(!campo) return;
  campo.disabled=!marcado;
  campo.required=marcado;
  if(!marcado){
    campo.value='';
    campo.setCustomValidity('');
  }
}
function aplicarMascaras(){
  const dataNascimento=document.getElementById('dataNascimento');
  const dataAutorizacao=document.getElementById('dataAutorizacao');
  [dataNascimento,dataAutorizacao].forEach(campo=>{
    if(!campo) return;
    campo.addEventListener('input',()=>{campo.value=mascararData(campo.value); if(campo.id==='dataNascimento') calcularIdade();});
    campo.addEventListener('blur',()=>{campo.value=mascararData(campo.value); if(campo.id==='dataNascimento') calcularIdade();});
  });
  const cpf=document.getElementById('cpf');
  if(cpf) cpf.addEventListener('input',()=>{cpf.value=mascararCPF(cpf.value);});
  const cep=document.getElementById('cep');
  if(cep) cep.addEventListener('input',()=>{cep.value=mascararCEP(cep.value);});
  const cns=document.getElementById('cns');
  if(cns) cns.addEventListener('input',()=>{cns.value=somenteDigitos(cns.value).slice(0,15);});
  const motivoOutros=document.getElementById('motivoOutros');
  if(motivoOutros) motivoOutros.addEventListener('change',atualizarEstadoOutros);
  atualizarEstadoOutros();
}
function limparValidacoesCustomizadas(){
  document.querySelectorAll('input,select,textarea').forEach(el=>el.setCustomValidity(''));
}
function validarFormularioCompleto(){
  limparValidacoesCustomizadas();
  atualizarEstadoOutros();
  const form=document.getElementById('formularioCerem');
  const erros=[];
  function erro(id,msg){
    const el=document.getElementById(id);
    if(el){el.setCustomValidity(msg); erros.push(el);}
  }
  if(!dataValidaBR(valor('dataNascimento'))) erro('dataNascimento','Informe a data no formato dd/mm/aaaa.');
  if(!dataValidaBR(valor('dataAutorizacao'))) erro('dataAutorizacao','Informe a data no formato dd/mm/aaaa.');
  if(somenteDigitos(valor('cpf')).length!==11) erro('cpf','Informe o CPF no formato 000.000.000-00.');
  if(somenteDigitos(valor('cep')).length!==8) erro('cep','Informe o CEP no formato 00000-000.');
  if(somenteDigitos(valor('cns')).length!==15) erro('cns','Informe o CNS com 15 números.');

  const motivos=[...document.querySelectorAll('input[name="motivo"]')];
  const motivoOutros=document.getElementById('motivoOutros');
  const algumMotivo=motivos.some(el=>el.checked) || (motivoOutros && motivoOutros.checked);
  if(!algumMotivo && motivos[0]){
    motivos[0].setCustomValidity('Selecione pelo menos um motivo do encaminhamento.');
    erros.push(motivos[0]);
  }
  if(motivoOutros?.checked && !valor('motivoOutrosTexto')) erro('motivoOutrosTexto','Descreva o motivo em Outros ou desmarque a opção.');

  const nomesRadio=[...new Set([...document.querySelectorAll('.tabela-avaliacao input[type="radio"]')].map(el=>el.name))];
  for(const nome of nomesRadio){
    if(!document.querySelector(`input[name="${nome}"]:checked`)){
      const primeiro=document.querySelector(`input[name="${nome}"]`);
      primeiro.setCustomValidity('Marque Sim ou Não para esta pergunta.');
      erros.push(primeiro);
      break;
    }
  }

  if(!form.reportValidity()){
    const primeiroInvalido=erros[0] || form.querySelector(':invalid');
    primeiroInvalido?.scrollIntoView({behavior:'smooth', block:'center'});
    primeiroInvalido?.focus?.();
    setStatus('Preencha todos os campos obrigatórios antes de baixar o PDF.');
    return false;
  }
  return true;
}

async function gerarPDF(){
  const form=document.getElementById('formularioCerem');
  const botao=document.getElementById('botaoPdf');
  if(!validarFormularioCompleto()) return;
  setStatus('Gerando PDF...');
  if(botao) botao.disabled=true;
  try{
    calcularIdade();
    const jsPDF=await garantirJsPDF();
    const doc=new jsPDF({unit:'mm',format:'a4',orientation:'portrait',compress:true});
    montarPDF(doc);
    doc.save(nomeArquivo());
    setStatus('PDF baixado. Verifique a pasta Downloads.');
  }catch(e){
    console.error(e);
    alert('Não foi possível baixar o PDF. Abra o arquivo index.html no Google Chrome ou Microsoft Edge com internet ativa e tente novamente.');
    setStatus('Erro ao gerar.');
  }finally{
    if(botao) botao.disabled=false;
  }
}

function montarPDF(doc){
  const pageW=210, pageH=297, mx=10, bottom=285;
  const img=document.querySelector('.cabecalho img')?.src;
  function header(){
    if(img){try{doc.addImage(img,'PNG',mx,7,pageW-2*mx,26);}catch(e){}}
    doc.setFont('helvetica','bold'); doc.setFontSize(12);
    doc.text('FORMULÁRIO DE ENCAMINHAMENTO AO CEREM', pageW/2, 38, {align:'center'});
    doc.setFontSize(10.5); doc.text('CENTRO DE REABILITAÇÃO MUNICIPAL', pageW/2, 43, {align:'center'});
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.text('Protocolo de Saúde da Criança – ANEXO XXI', pageW/2, 47.5, {align:'center'});
    return 53;
  }
  function footer(){
    doc.setDrawColor(170); doc.line(mx,288,pageW-mx,288);
    doc.setFont('helvetica','normal'); doc.setFontSize(8);
    doc.text('Rua São José, 154 - Centro, Pouso Alegre - MG, 37550-178', pageW/2,292,{align:'center'});
    doc.text('cerem2026@gmail.com', pageW/2,295,{align:'center'});
  }
  function section(t,y){doc.setFillColor(235,235,235); doc.rect(mx,y-4,pageW-2*mx,6,'F'); doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.text(t,mx+2,y); return y+7;}
  function labelValue(label,val,x,y,w){doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.text(label,x,y); const lw=doc.getTextWidth(label)+1; doc.setFont('helvetica','normal'); doc.text(String(val||''),x+lw,y); doc.setDrawColor(80); doc.line(x+lw,y+1,w,y+1);}
  function textWrapped(txt,x,y,w,size=9.5,style='normal',lh=4.5){doc.setFont('helvetica',style);doc.setFontSize(size); const linhas=doc.splitTextToSize(txt,w); doc.text(linhas,x,y); return y + linhas.length*lh;}
  function markBox(x,y,on){doc.rect(x,y-3,3.2,3.2); if(on){doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text('X',x+.45,y-.2);}}
  function radio(x,y,on){doc.circle(x+1.6,y-1.6,1.55); if(on){doc.circle(x+1.6,y-1.6,.75,'F');}}
  function linhaManual(label,x,y,w){doc.setFont('helvetica','bold');doc.setFontSize(9.2);doc.text(label,x,y); const lw=doc.getTextWidth(label)+1; doc.line(x+lw,y+1,w,y+1);}
  function checkVisual(x, yy){
    doc.setDrawColor(20);
    doc.setLineWidth(0.35);
    doc.line(x, yy-1.2, x+1.0, yy-0.2);
    doc.line(x+1.0, yy-0.2, x+2.7, yy-2.5);
    doc.setLineWidth(0.2);
  }
  function itemDocumento(x, yy, texto){checkVisual(x, yy); doc.text(texto, x+4, yy);}
  function evalTable(bloco,prefixo,y,rowH=5.8){
    doc.setFontSize(8.8); doc.setFont('helvetica','bold');
    doc.setFillColor(235,235,235); doc.rect(mx,y-4,pageW-2*mx,5.5,'F');
    doc.text(bloco.titulo,mx+2,y); doc.text('SIM',174,y,{align:'center'}); doc.text('NÃO',190,y,{align:'center'});
    y+=4.5; doc.setFont('helvetica','normal'); doc.setFontSize(8.9);
    bloco.perguntas.forEach((p,i)=>{
      const n=`${prefixo}_${bloco.titulo.replace(/\W/g,'')}_${i}`;
      const resp=marcado(n);
      const linhas=doc.splitTextToSize(p,155);
      const h=Math.max(rowH, linhas.length*3.7 + 1.5);
      doc.setDrawColor(210); doc.line(mx,y+1,pageW-mx,y+1);
      doc.text(linhas,mx+2,y);
      radio(172,y,resp==='Sim'); radio(188,y,resp==='Não');
      y+=h;
    });
    return y+1.5;
  }

  let y=header();
  y=section('1. DADOS DO ALUNO',y);
  labelValue('Nome completo:',valor('nomeAluno'),mx,y,pageW-mx); y+=7;
  labelValue('Data de nascimento:',dataBR(valor('dataNascimento')),mx,y,78); labelValue('Idade:',valor('idade'),83,y,124); labelValue('Sexo/Gênero:',valor('sexoGenero'),130,y,pageW-mx); y+=7;
  labelValue('CPF:',valor('cpf'),mx,y,63); labelValue('CNS:',valor('cns'),68,y,138); labelValue('CM:',valor('cm'),143,y,pageW-mx); y+=7;
  labelValue('CEP:',valor('cep'),mx,y,43); labelValue('Endereço:',valor('endereco'),48,y,132); labelValue('Nº:',valor('numero'),137,y,154); labelValue('Compl.:',valor('complemento'),159,y,pageW-mx); y+=7;
  labelValue('Nome da Escola:',valor('nomeEscola'),mx,y,pageW-mx); y+=7;
  labelValue('Ano/Turma:',valor('anoTurma'),mx,y,78); labelValue('Responsável pelo preenchimento na escola:',valor('responsavelEscola'),83,y,pageW-mx); y+=8;

  y=section('2. AUTORIZAÇÃO DA FAMÍLIA',y);
  y=textWrapped('Autorizo o encaminhamento do(a) aluno(a) ao CEREM para avaliação e acompanhamento, estando ciente de que um dos responsáveis deverá comparecer ao CEREM acompanhando o aluno.',mx,y,pageW-2*mx,9.2,'normal',4.3)+2;
  labelValue('Nome do responsável:',valor('nomeResponsavel'),mx,y,pageW-mx); y+=7;
  labelValue('Grau de parentesco:',valor('parentesco'),mx,y,108); labelValue('Data:',dataBR(valor('dataAutorizacao')),114,y,pageW-mx); y+=8;

  y=section('3. MOTIVO(S) DO ENCAMINHAMENTO',y);
  const motivos=[['Dificuldade de aprendizagem','Dificuldade de aprendizagem'],['Desenvolvimento da fala/linguagem','Desenvolvimento da fala/linguagem'],['Dificuldade de comunicação','Dificuldade de comunicação'],['Dificuldades motoras','Dificuldades motoras'],['Comportamento/Interação social','Comportamento/Interação social'],['Atenção/Concentração','Atenção/Concentração'],['Aspectos emocionais','Aspectos emocionais'],['__outros','Outros: '+valor('motivoOutrosTexto')]];
  motivos.forEach((m,i)=>{const col=i%3,row=Math.floor(i/3); const x=mx+col*63.5, yy=y+row*6; const on=m[0]==='__outros'?checkbox('motivoOutros'):motivoMarcado(m[0]); markBox(x,yy,on); doc.setFont('helvetica','normal');doc.setFontSize(8.6); doc.text(doc.splitTextToSize(m[1],54),x+5,yy);}); y+=19;

  y=section('4. AVALIAÇÃO DO NEURODESENVOLVIMENTO PELA ESCOLA',y);
  blocos1.forEach((b,i)=>{y=evalTable(b,'p1'+i,y,5.9);});
  footer();

  doc.addPage();
  // Na segunda página, não repete o título institucional para liberar espaço útil.
  // Assim a avaliação começa mais acima e evita conflito com o rodapé.
  y=12;
  blocos2.forEach((b,i)=>{y=evalTable(b,'p2'+i,y,6.2);});
  y=section('PERCEPÇÃO SUBJETIVA DO EDUCADOR SOBRE O DESENVOLVIMENTO ESCOLAR',y+1);
  y=textWrapped('Anotações sobre percepções subjetivas do educador acerca do desenvolvimento escolar do estudante, podendo constar aspectos relevantes não abordados nos temas supracitados da tabela.',mx,y,pageW-2*mx,7.6,'normal',3.4)+1;
  doc.setDrawColor(80); doc.rect(mx,y,pageW-2*mx,30);
  const texto=valor('percepcao');
  if(texto){doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text(doc.splitTextToSize(texto,pageW-2*mx-4),mx+2,y+5);}
  y+=36;

  y=section('5. DOCUMENTAÇÃO A SER ENTREGUE NO CEREM',y);
  doc.setFont('helvetica','normal'); doc.setFontSize(9);
  itemDocumento(mx+2, y, 'Caderneta de vacinação');
  itemDocumento(mx+72, y, 'Relatórios e exames prévios');
  y+=8;

 doc.setFont('helvetica','bold'); 
doc.setFontSize(9.2);

const textoAssinatura = 'Assinatura do responsável pelo aluno:';

doc.text(textoAssinatura, mx, y);

const xAssinatura = mx + doc.getTextWidth(textoAssinatura) + 2;

doc.setDrawColor(80);
doc.line(xAssinatura, y + 1, pageW - mx, y + 1);

footer();
}

document.addEventListener('DOMContentLoaded',()=>{popularSelect('nomeEscola',escolas);popularSelect('anoTurma',anos);document.getElementById('tabelasPagina1').innerHTML=blocos1.map((b,i)=>montarTabela(b,'p1'+i)).join('');document.getElementById('tabelasPagina2').innerHTML=blocos2.map((b,i)=>montarTabela(b,'p2'+i)).join('');aplicarMascaras();});

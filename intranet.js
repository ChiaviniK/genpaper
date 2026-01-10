// ============================================================================
// 1. BANCO DE DADOS COMPLETO (BASEADO NOS ESTUDOS DE CASO 1 E 2)
// ============================================================================
const DB = {
    // --- PRODUÇÃO (CASO 1: Falha na MP-02 por falta de químico) ---
    maquinas: [
        { id: 1, nome: "MP-01: Picador", setor: "Pátio", status: "ok", gps: "RJ", dados: [{k:"RPM", v:"1200"}, {k:"Vibração", v:"2.4mm/s"}], alerta: null },
        { id: 2, nome: "MP-02: Digestor", setor: "Químico", status: "warn", gps: "SC", dados: [{k:"Pressão", v:"8.8 bar"}, {k:"Temp", v:"175°C"}], alerta: "Pressão Crítica" },
        { id: 3, nome: "MP-03: Secagem", setor: "Acabamento", status: "ok", gps: "BA", dados: [{k:"Velocidade", v:"1100"}, {k:"Umidade", v:"6.5%"}], alerta: null }
    ],
    insumos: [
        { nome: "Madeira", nivel: "12.500 m³", st: "Normal", cor: "green" },
        { nome: "Soda Cáustica", nivel: "22% (Crítico)", st: "BAIXO", cor: "red" }, // Causa do Caso 1
        { nome: "Resina Imp.", nivel: "10% (Crítico)", st: "BAIXO", cor: "red" }   // Pista do Caso 2
    ],
    turnos: [
        { data: "10/01", turno: "Manhã", maq: 2, op: "Carlos L.", obs: "OK" },
        { data: "10/01", turno: "Tarde", maq: 2, op: "Mariana S.", obs: "Falha Pressão" } // Culpada do Caso 1
    ],

    // --- FINANCEIRO (Dados gerais + Pagamento da fraude) ---
    pagamentos: [
        { id: "PG-201", beneficiario: "Energy Corp", valor: "R$ 450.000", status: "Pago", dados: [{k:"Desc", v:"Conta Luz"}, {k:"Data", v:"05/01"}] },
        { id: "PG-202", beneficiario: "Química Sul", valor: "R$ 40.000", status: "Pago", dados: [{k:"Desc", v:"Ref. NF-5003"}, {k:"Data", v:"11/01"}] }, // Pagamento da Fraude
        { id: "PG-203", beneficiario: "Madeira Co.", valor: "R$ 5.000", status: "Agendado", dados: [{k:"Desc", v:"Compra Toras"}, {k:"Data", v:"15/01"}] }
    ],
    compras: [
        { id: "PO-99", item: "Empilhadeira", valor: "R$ 120.000", status: "Aprovado", dados: [{k:"Solicitante", v:"Logística"}] },
        { id: "PO-100", item: "Notebooks Dell", valor: "R$ 45.000", status: "Pendente", dados: [{k:"Solicitante", v:"TI"}] }
    ],
    vendas: [
        { cliente: "Editora Globo", contrato: "Anual", status: "Ativo", dados: [{k:"Volume", v:"500 Ton"}, {k:"Mensal", v:"R$ 2.5M"}] },
        { cliente: "Klabin (Parceiro)", contrato: "Spot", status: "Ativo", dados: [{k:"Volume", v:"50 Ton"}, {k:"Mensal", v:"R$ 300k"}] }
    ],
    salarios: [
        { cargo: "Diretor", range: "25k-35k", status: "CLT", dados: [{k:"Qtd", v:"4"}, {k:"Bônus", v:"Sim"}] },
        { cargo: "Engenheiro Sr", range: "12k-18k", status: "CLT", dados: [{k:"Qtd", v:"15"}, {k:"Setor", v:"Produção"}] },
        { cargo: "Trainee", range: "3k-4k", status: "Estágio", dados: [{k:"Qtd", v:"8"}, {k:"Sup", v:"Rotativo"}] }
    ],

    // --- LOGÍSTICA (CASO 2: A Prova do Crime na Balança) ---
    logistica_frota: [
        { placa: "ABC-1234", modelo: "Volvo FH", status: "Em Rota", dados: [{k:"Motorista", v:"Jorge Amado"}, {k:"Carga", v:"Resina"}, {k:"Destino", v:"Fábrica Sul"}] },
        { placa: "XYZ-9876", modelo: "Scania R", status: "Manutenção", dados: [{k:"Motorista", v:"Pedro A."}, {k:"Oficina", v:"TruckCenter"}] }
    ],
    balanca: [ 
        // L-903 mostra que entraram 16.000 e saíram 10.000 = 6.000kg de carga real.
        // A NF-5003 (na contabilidade) diz que foram 8.000kg. FRAUDE DE 2.000kg.
        { id: "L-903", placa: "ABC-1234", status: "Finalizado", dados: [{k:"Entrada", v:"16.000kg"}, {k:"Saída", v:"10.000kg"}, {k:"Líquido", v:"6.000kg"}, {k:"Ref NF", v:"NF-5003"}] }
    ],
    motoristas: [
        { nome: "Jorge Amado", cnh: "Categoria E", status: "Ativo", dados: [{k:"Validade", v:"2028"}, {k:"ID", v:"55"}] },
        { nome: "Pedro Alvares", cnh: "Categoria E", status: "Ativo", dados: [{k:"Validade", v:"2027"}, {k:"ID", v:"12"}] }
    ],
    hospedagem_motoristas: [
        { data: "10/01", local: "Hotel Estradeiro", status: "Pago", dados: [{k:"Quartos", v:"5"}, {k:"Custo", v:"R$ 450"}] },
        { data: "11/01", local: "Hotel Estradeiro", status: "Pago", dados: [{k:"Quartos", v:"3"}, {k:"Custo", v:"R$ 270"}] }
    ],

    // --- INSUMOS (Contexto para o Caso 2) ---
    fornecedores_madeira: [
        { empresa: "Reflorestadora PR", tipo: "Madeira", status: "Ativo", dados: [{k:"Contrato", v:"Anual"}, {k:"Lead Time", v:"3 dias"}] }
    ],
    fornecedores_quimicos: [
        { empresa: "Química Sul", tipo: "Químicos", status: "Sob Auditoria", dados: [{k:"Produto", v:"Resina/Soda"}, {k:"Obs", v:"Preços Congelados"}] },
        { empresa: "Basf", tipo: "Corantes", status: "Spot", dados: [{k:"Produto", v:"Tinta"}, {k:"Obs", v:"-"}] }
    ],

    // --- CONTABILIDADE (CASO 2: A Nota Fiscal Fraudulenta) ---
    contabilidade: [
        { nf: "NF-5001", forn: "Química Sul", total: "R$ 25.000", status: "Faturado", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"5.000 kg"}] },
        { nf: "NF-5003", forn: "Química Sul", total: "R$ 40.000", status: "Faturado", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"8.000 kg"}] }, // FRAUDE (Balança diz 6k)
        { nf: "NF-5004", forn: "Química Sul", total: "R$ 40.000", status: "Pendente", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"8.000 kg"}] }  // FRAUDE
    ],

    // --- MARKETING (Distradores) ---
    mkt_campanhas: [
        { nome: "Papel Verde", canal: "Instagram", status: "Ativa", dados: [{k:"Investimento", v:"R$ 5.000"}, {k:"Cliques", v:"15.420"}] },
        { nome: "Institucional", canal: "LinkedIn", status: "Ativa", dados: [{k:"Investimento", v:"R$ 2.000"}, {k:"Views", v:"8.000"}] }
    ],
    mkt_social: [
        { rede: "Twitter", mencao: "@GenPaper cheiro estranho", status: "Negativo", dados: [{k:"Data", v:"10/01"}, {k:"Retweets", v:"12"}] },
        { rede: "Instagram", mencao: "Amei a embalagem", status: "Positivo", dados: [{k:"Data", v:"11/01"}, {k:"Likes", v:"340"}] }
    ]
};

// ============================================================================
// 2. CONFIGURAÇÃO DE PERMISSÕES (QUEM PODE BAIXAR O QUÊ)
// ============================================================================
const permissoesDownload = {
    'Produção': ['maquinas', 'insumos', 'turnos'],
    'Financeiro': ['pagamentos', 'compras', 'vendas', 'salarios'],
    'Logística': ['logistica_frota', 'balanca', 'motoristas', 'hospedagem_motoristas'],
    'Insumos': ['fornecedores_madeira', 'fornecedores_quimicos', 'insumos'],
    'Contabilidade': ['contabilidade'],
    'Marketing': ['mkt_campanhas', 'mkt_social'],
    'Auditoria': ['maquinas', 'turnos', 'contabilidade', 'balanca', 'insumos'], // Auditoria vê tudo que é crítico
    'RH': [] // RH não baixa dados
};


// ============================================================================
// 3. INICIALIZAÇÃO E ROTEAMENTO
// ============================================================================
let user = JSON.parse(localStorage.getItem('genUser'));
if(!user) user = { name: "Visitante", role: "Produção" }; // Fallback

// Preenche sidebar
const lblUser = document.getElementById('lblUser');
const lblRole = document.getElementById('lblRole');
if(lblUser) lblUser.innerText = user.name;
if(lblRole) lblRole.innerText = user.role;

rotearPerfil();

function rotearPerfil() {
    // 1. Esconde todos os painéis
    const perfis = ['perfil-rh', 'perfil-producao', 'perfil-financeiro', 'perfil-logistica', 'perfil-marketing', 'perfil-contabilidade', 'perfil-insumos', 'perfil-erro'];
    perfis.forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });

    // 2. Controle do Menu "Banco de Dados" (Download)
    const btnDados = document.getElementById('menu-data');
    if (btnDados) {
        if (user.role === 'RH') {
            btnDados.classList.add('hidden');
        } else {
            btnDados.classList.remove('hidden');
            prepararDownloads(); // Cria os botões de download
        }
    }

    // 3. Exibe o Dashboard Correspondente + Renderiza os Cards
    if(user.role === 'RH') {
        document.getElementById('perfil-rh').classList.remove('hidden');
        renderGraficosRH();
    } 
    else if (user.role === 'Produção') { 
        renderGeneric('producao', DB.maquinas, 'nome', 'setor', 'status', 'dados', 'alerta'); 
    }
    else if (user.role === 'Financeiro') { 
        renderGeneric('financeiro', DB.pagamentos, 'id', 'beneficiario', 'status', 'dados', null, 'valor'); 
    }
    else if (user.role === 'Logística') { 
        renderGeneric('logistica', DB.logistica_frota, 'placa', 'modelo', 'status', 'dados'); 
    }
    else if (user.role === 'Marketing') { 
        renderGeneric('marketing', DB.mkt_campanhas, 'nome', 'canal', 'status', 'dados'); 
    }
    else if (user.role === 'Contabilidade') { 
        renderGeneric('contabilidade', DB.contabilidade, 'nf', 'forn', 'status', 'dados', null, 'total'); 
    }
    else if (user.role === 'Insumos') { 
        renderGeneric('insumos', DB.fornecedores_quimicos, 'empresa', 'tipo', 'status', 'dados'); 
    }
    else if (user.role === 'Auditoria') {
        // Auditoria não tem dashboard visual, vai direto para a tela de dados
        navegar('data');
    }
    else {
        document.getElementById('perfil-erro').classList.remove('hidden');
    }
}


// ============================================================================
// 4. MOTOR DE RENDERIZAÇÃO DE CARDS (DASHBOARD INTERATIVO)
// ============================================================================
function renderGeneric(perfil, dadosDB, keyTitulo, keySub, keyBadge, keyDados, keyAlerta = null, keyExtra = null) {
    const elPerfil = document.getElementById(`perfil-${perfil}`);
    if(elPerfil) elPerfil.classList.remove('hidden');

    const container = document.getElementById(`grid-${perfil}`);
    if(!container) return;
    
    container.innerHTML = '';
    
    dadosDB.forEach(item => {
        // Lógica de Cores
        let cor = 'status-ok'; // Verde padrão
        let badgeVal = item[keyBadge] || 'OK';
        
        if(['warn', 'Pendente', 'Manutenção', 'Agendado', 'Sob Auditoria'].includes(badgeVal)) cor = 'status-warn'; // Amarelo
        if(['CRÍTICO', 'BAIXO', 'Negativo'].includes(badgeVal)) cor = 'status-err'; // Vermelho (CSS precisa ter .status-err { border-color: red; })

        // Borda colorida específica por departamento (Estilo)
        let styleBorder = "";
        if(perfil === 'financeiro') styleBorder = "border-left-color: #8e44ad;";
        if(perfil === 'logistica') styleBorder = "border-left-color: #d35400;";
        if(perfil === 'marketing') styleBorder = "border-left-color: #e91e63;";
        if(perfil === 'contabilidade') styleBorder = "border-left-color: #2c3e50;";

        // Cria o Card HTML
        let card = document.createElement('div');
        card.className = `card-maq ${cor}`;
        if(styleBorder) card.style = styleBorder;

        let extraInfo = keyExtra ? `<p style="font-weight:bold; color:#333; margin-top:5px;">${item[keyExtra]}</p>` : '';

        card.innerHTML = `
            <h3>${item[keyTitulo]}</h3>
            <p>${item[keySub]}</p>
            ${extraInfo}
            <span class="badge" style="background:#555">${badgeVal.toUpperCase()}</span>
        `;
        
        // Adiciona evento de clique para abrir detalhes
        card.onclick = () => abrirDetalhesGenerico(perfil, item, keyTitulo, keyDados, keyAlerta);
        container.appendChild(card);
    });

    // Renderiza tabelas extras específicas da Produção (se necessário)
    if(perfil === 'producao') {
        renderTabelasExtrasProducao();
    }
}

function abrirDetalhesGenerico(perfil, item, keyTitulo, keyDados, keyAlerta) {
    // 1. Título do Painel
    // Ajuste: se for produção, o ID é 'prod-titulo', senão é 'cont-titulo', 'fin-titulo' etc.
    let prefix = perfil.substring(0,3);
    if(perfil === 'producao') prefix = 'prod';
    if(perfil === 'contabilidade') prefix = 'cont';

    const elTitulo = document.getElementById(`${prefix}-titulo`);
    if(elTitulo) elTitulo.innerText = item[keyTitulo];

    // 2. Grid de Telemetria (Dados Detalhados)
    const elGrid = document.getElementById(`${prefix}-dados`);
    if(elGrid) {
        elGrid.innerHTML = '';
        if(item[keyDados]) {
            item[keyDados].forEach(d => {
                elGrid.innerHTML += `<div class="tele-item"><span class="tele-val">${d.v}</span><small>${d.k}</small></div>`;
            });
        }
    }

    // 3. Alerta (Se houver)
    if(keyAlerta) {
        const elAlerta = document.getElementById(`${prefix}-alerta`);
        if(elAlerta) {
            if(item[keyAlerta]) {
                elAlerta.style.display = 'block';
                elAlerta.innerText = item[keyAlerta];
            } else {
                elAlerta.style.display = 'none';
            }
        }
    }

    // 4. Exibe o Painel e faz Scroll
    const painel = document.getElementById(`detalhe-${perfil}`);
    if(painel) {
        painel.style.display = 'block';
        setTimeout(() => painel.scrollIntoView({behavior:'smooth', block:'start'}), 100);
    }
}

function renderTabelasExtrasProducao() {
    const tabIns = document.getElementById('tab-prod-ins');
    if(tabIns) {
        tabIns.innerHTML = '';
        DB.insumos.forEach(i => tabIns.innerHTML += `<tr><td>${i.nome}</td><td>${i.nivel}</td><td style="color:${i.cor}"><b>${i.st}</b></td></tr>`);
    }
    const divTurn = document.getElementById('tab-prod-turn');
    if(divTurn) {
        let html = '<table><thead><tr><th>Data</th><th>Turno</th><th>Maq</th><th>Op</th><th>Obs</th></tr></thead><tbody>';
        DB.turnos.forEach(t => html += `<tr><td>${t.data}</td><td>${t.turno}</td><td>${t.maq}</td><td>${t.op}</td><td>${t.obs}</td></tr>`);
        divTurn.innerHTML = html + '</tbody></table>';
    }
}


// ============================================================================
// 5. FUNÇÕES DE UTILIDADE E DOWNLOAD
// ============================================================================

function toggleMenu() {
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('mainContent');
    const userInfo = document.getElementById('userInfoBox');
    sidebar.classList.toggle('closed');
    main.classList.toggle('closed');
    if(sidebar.classList.contains('closed')) userInfo.style.display = 'none';
    else setTimeout(() => userInfo.style.display = 'block', 200);
}

function navegar(tela) {
    ['dash', 'msg', 'data'].forEach(t => {
        const view = document.getElementById(`view-${t}`);
        const menu = document.getElementById(`menu-${t}`);
        if(view) view.classList.add('hidden');
        if(menu) menu.classList.remove('active');
    });
    const viewAlvo = document.getElementById(`view-${tela}`);
    const menuAlvo = document.getElementById(`menu-${tela}`);
    if(viewAlvo) viewAlvo.classList.remove('hidden');
    if(menuAlvo) menuAlvo.classList.add('active');
}

function mudarAba(perfil, aba, btn) {
    // Apenas para Produção que tem sub-abas
    if(perfil === 'prod') {
        ['maq', 'ins', 'turn'].forEach(id => document.getElementById(`prod-${id}`).classList.add('hidden'));
        document.querySelectorAll('.prod-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`prod-${aba}`).classList.remove('hidden');
        btn.classList.add('active');
    }
}

function prepararDownloads() {
    const container = document.getElementById('download-area');
    if(!container) return;
    container.innerHTML = '';
    
    // Verifica quais arquivos este usuário pode baixar
    const arquivos = permissoesDownload[user.role] || [];

    if(arquivos.length === 0) {
        container.innerHTML = '<p>Nenhum dado disponível.</p>';
        return;
    }

    arquivos.forEach(tipo => {
        const div = document.createElement('div');
        div.className = 'card-panel';
        div.style.textAlign = 'center'; div.style.minWidth = '150px'; div.style.flex = '1';
        
        let nomeLimpo = tipo.replace('_', ' ').toUpperCase();
        
        div.innerHTML = `<h3>${nomeLimpo}</h3><p style="font-size:0.8rem">JSON</p>`;
        const btn = document.createElement('button');
        btn.className = 'prod-btn'; btn.innerText = '⬇ Baixar';
        btn.onclick = () => baixarJSON(tipo);
        
        div.appendChild(btn); 
        container.appendChild(div);
    });
}

function baixarJSON(tipo) {
    let dados = DB[tipo];
    if(!dados) return alert("Erro ao gerar arquivo: Dados não encontrados.");

    const blob = new Blob([JSON.stringify(dados, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dados_${tipo}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function sair() { localStorage.removeItem('genUser'); window.location.href = 'login.html'; }

// Gráficos RH (apenas visual)
function renderGraficosRH() {
    const ctx1 = document.getElementById('grafico1');
    const ctx2 = document.getElementById('grafico2');
    if(ctx1 && ctx2 && typeof Chart !== 'undefined') {
        try {
            new Chart(ctx1, {type:'bar', data:{labels:['Set','Out','Nov','Dez'], datasets:[{label:'Faltas', data:[12,19,3,5], backgroundColor:'#1b5e20'}]}});
            new Chart(ctx2, {type:'doughnut', data:{labels:['Prod','Adm'], datasets:[{data:[80,20], backgroundColor:['#2ecc71','#f1c40f']}]}});
        } catch(e){}
    }
}

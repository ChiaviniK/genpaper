// --- 1. BANCO DE DADOS COMPLETO (TODOS OS SETORES) ---
const DB = {
    // --- PRODUÇÃO ---
    maquinas: [
        { id: 1, nome: "MP-01: Picador", setor: "Pátio", status: "ok", gps: "RJ", dados: [{k:"RPM", v:"1200"}], alerta: null },
        { id: 2, nome: "MP-02: Digestor", setor: "Químico", status: "warn", gps: "SC", dados: [{k:"Pressão", v:"8.8 bar"}], alerta: "Pressão Crítica" },
        { id: 3, nome: "MP-03: Secagem", setor: "Acabamento", status: "ok", gps: "BA", dados: [{k:"Velocidade", v:"1100"}], alerta: null }
    ],
    insumos: [
        { nome: "Madeira", nivel: "12.500 m³", st: "Normal", cor: "green" },
        { nome: "Soda Cáustica", nivel: "22% (Crítico)", st: "BAIXO", cor: "red" },
        { nome: "Resina Imp.", nivel: "10% (Crítico)", st: "BAIXO", cor: "red" }
    ],
    turnos: [
        { data: "10/01", turno: "Manhã", maq: 2, op: "Carlos L.", obs: "OK" },
        { data: "10/01", turno: "Tarde", maq: 2, op: "Mariana S.", obs: "Falha Pressão" }
    ],

    // --- FINANCEIRO ---
    pagamentos: [
        { id: "PG-201", beneficiario: "Energy Corp", valor: 450000, desc: "Conta Luz Fabrica" },
        { id: "PG-202", beneficiario: "Química Sul", valor: 40000, desc: "Pagto NF-5003" }
    ],
    compras: [
        { id: "PO-99", item: "Empilhadeira", valor: 120000, status: "Aprovado" },
        { id: "PO-100", item: "Notebooks Dell", valor: 45000, status: "Pendente" }
    ],
    vendas: [
        { cliente: "Editora Globo", contrato: "Anual", volume: "500 Ton", valor_mensal: 2500000 },
        { cliente: "Klabin (Parceiro)", contrato: "Spot", volume: "50 Ton", valor_mensal: 300000 }
    ],
    salarios: [
        { cargo: "Diretor", range: "25k-35k", qtd: 4 },
        { cargo: "Engenheiro Sênior", range: "12k-18k", qtd: 15 },
        { cargo: "Trainee", range: "3k-4k", qtd: 8 }
    ],

    // --- LOGÍSTICA ---
    logistica_frota: [
        { caminhao: "Volvo FH", placa: "ABC-1234", status: "Em Rota", motorista_id: 55 },
        { caminhao: "Scania R", placa: "XYZ-9876", status: "Manutenção", motorista_id: 12 }
    ],
    balanca: [ // Importante para o caso 2
        { id: "L-903", placa: "ABC-1234", entrada: 16000, saida: 10000, carga_liq: 6000, nf_assoc: "NF-5003" }
    ],
    motoristas: [
        { id: 55, nome: "Jorge Amado", cnh: "E", validade: "2028" },
        { id: 12, nome: "Pedro Alvares", cnh: "E", validade: "2027" }
    ],
    hospedagem_motoristas: [
        { data: "10/01", local: "Hotel Estradeiro", quartos: 5, custo: 450.00 },
        { data: "11/01", local: "Hotel Estradeiro", quartos: 3, custo: 270.00 }
    ],

    // --- INSUMOS (COMPRAS TÉCNICAS) ---
    fornecedores_madeira: [
        { empresa: "Reflorestadora Paraná", contrato: "Ativo", lead_time: "3 dias" },
        { empresa: "Madeira Co.", contrato: "Em negociação", lead_time: "5 dias" }
    ],
    fornecedores_quimicos: [
        { empresa: "Química Sul", produto: "Resina/Soda", contrato: "Vitalício", obs: "Preços congelados" },
        { empresa: "Basf", produto: "Corantes", contrato: "Spot", obs: "-" }
    ],

    // --- CONTABILIDADE ---
    contabilidade: [
        { nf: "NF-5001", forn: "Química Sul", item: "Resina", qtd: 5000, total: 25000 },
        { nf: "NF-5003", forn: "Química Sul", item: "Resina", qtd: 8000, total: 40000 } // Fraude aqui
    ],

    // --- MARKETING (DISTRATOR) ---
    mkt_campanhas: [
        { nome: "Papel Verde", canal: "Instagram", cliques: 15000, gasto: 5000 },
        { nome: "GenPaper Institucional", canal: "LinkedIn", cliques: 450, gasto: 2000 }
    ],
    mkt_social: [
        { rede: "Twitter", mencao: "@GenPaper o cheiro do papel ta estranho", sentimento: "Negativo" },
        { rede: "Instagram", mencao: "Amei a embalagem nova!", sentimento: "Positivo" }
    ]
};

// --- 2. CONFIGURAÇÃO DE ACESSOS (QUEM VÊ O QUE) ---
const permissoes = {
    'Produção': ['maquinas', 'insumos', 'turnos'],
    'Financeiro': ['pagamentos', 'compras', 'vendas', 'salarios'],
    'Logística': ['logistica_frota', 'balanca', 'motoristas', 'hospedagem_motoristas'],
    'Insumos': ['fornecedores_madeira', 'fornecedores_quimicos', 'insumos'], // Vê nível tbm
    'Contabilidade': ['contabilidade'],
    'Marketing': ['mkt_campanhas', 'mkt_social'],
    'RH': [] // RH vê senhas na tela, não baixa JSON
};

// --- 3. INICIALIZAÇÃO ---
let user = JSON.parse(localStorage.getItem('genUser'));
if(!user) user = { name: "Teste", role: "Produção" }; // Fallback

const lblUser = document.getElementById('lblUser');
const lblRole = document.getElementById('lblRole');
if(lblUser) lblUser.innerText = user.name;
if(lblRole) lblRole.innerText = user.role;

rotearPerfil();

function rotearPerfil() {
    // 1. Esconde todos os dashboards visuais
    ['perfil-rh', 'perfil-producao', 'perfil-erro'].forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });

    // 2. Controla o botão "Banco de Dados" no menu lateral
    const btnDados = document.getElementById('menu-data');
    if (btnDados) {
        // RH não precisa de JSON, o resto precisa
        if (user.role === 'RH') {
            btnDados.classList.add('hidden');
        } else {
            btnDados.classList.remove('hidden');
            prepararDownloads(); // Monta a lista de arquivos para o usuário
        }
    }

    // 3. Mostra Dashboard Específico (se tiver)
    if(user.role === 'RH') {
        const el = document.getElementById('perfil-rh');
        if(el) el.classList.remove('hidden');
    } else if (user.role === 'Produção') {
        const el = document.getElementById('perfil-producao');
        if(el) { el.classList.remove('hidden'); renderProducao(); }
    } else {
        // Perfis sem dashboard visual (Contab, Log, etc) caem numa tela genérica ou direto nos dados
        // Vamos mostrar uma tela de boas vindas simples no lugar do dashboard
        const el = document.getElementById('perfil-erro');
        if(el) {
            el.classList.remove('hidden');
            document.querySelector('#perfil-erro h1').innerText = `Painel: ${user.role}`;
            document.querySelector('#perfil-erro p').innerText = "Acesse o menu 'Banco de Dados' para seus relatórios.";
        }
    }
}

// --- 4. PREPARAR DOWNLOADS DINAMICAMENTE ---
function prepararDownloads() {
    const container = document.getElementById('download-area');
    if(!container) return;
    
    container.innerHTML = ''; // Limpa botões antigos
    
    // Pega a lista de arquivos permitidos para esse cargo
    const arquivosPermitidos = permissoes[user.role] || [];

    if(arquivosPermitidos.length === 0) {
        container.innerHTML = '<p>Nenhum dado disponível para seu perfil.</p>';
        return;
    }

    // Cria um card para cada arquivo
    arquivosPermitidos.forEach(tipo => {
        const div = document.createElement('div');
        div.className = 'card-panel';
        div.style.textAlign = 'center';
        div.style.minWidth = '200px';
        div.style.flex = '1';

        div.innerHTML = `
            <h3>${formatarNome(tipo)}</h3>
            <p style="font-size:0.9rem; color:#666; margin-bottom:1rem">Arquivo JSON</p>
        `;
        
        const btn = document.createElement('button');
        btn.className = 'prod-btn';
        btn.innerText = '⬇ Baixar';
        btn.onclick = () => baixarJSON(tipo);

        div.appendChild(btn);
        container.appendChild(div);
    });
}

function formatarNome(str) {
    // Transforma "dados_maquinas" em "Dados Maquinas"
    return str.replace(/_/g, ' ').toUpperCase();
}

// --- 5. FUNÇÕES PADRÃO (MENU, DOWNLOAD, ETC) ---
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

function baixarJSON(tipo) {
    let dados = DB[tipo];
    if(!dados) return alert("Erro no arquivo.");
    const blob = new Blob([JSON.stringify(dados, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dados_${tipo}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function sair() { localStorage.removeItem('genUser'); window.location.href = 'login.html'; }

// --- 6. RENDERIZAÇÃO ESPECÍFICA DE PRODUÇÃO E RH ---
function renderProducao() {
    // (Mantive sua lógica de renderização visual da produção aqui para não quebrar o dashboard deles)
    const container = document.getElementById('container-maquinas');
    if(container) {
        container.innerHTML = '';
        DB.maquinas.forEach(m => {
            let cor = m.status === 'ok' ? 'status-ok' : 'status-warn';
            let bg = m.status === 'ok' ? 'bg-ok' : 'bg-warn';
            let card = document.createElement('div');
            card.className = `card-maq ${cor}`;
            card.innerHTML = `<h3>${m.nome}</h3><p>${m.setor}</p><span class="badge ${bg}">${m.status}</span>`;
            card.onclick = () => alert('Telemetria detalhada disponível no JSON.');
            container.appendChild(card);
        });
    }
}

// Lógica de abas da produção
function mudarAbaProd(aba, btn) {
    ['maq', 'ins', 'turn'].forEach(id => {
        const el = document.getElementById(`aba-${id}`);
        if(el) el.classList.add('hidden');
    });
    document.querySelectorAll('.prod-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`aba-${aba}`).classList.remove('hidden');
    btn.classList.add('active');
}
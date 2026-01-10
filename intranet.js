// --- 1. BANCO DE DADOS (EXPANDIDO) ---
const DB = {
    maquinas: [
        { id: 1, nome: "MP-01: Picador", setor: "Pátio", status: "ok", dados: [{k:"RPM", v:"1200"}, {k:"Vibração", v:"2.4mm/s"}], alerta: null },
        { id: 2, nome: "MP-02: Digestor", setor: "Químico", status: "warn", dados: [{k:"Pressão", v:"8.8 bar"}, {k:"Temp", v:"175°C"}], alerta: "Pressão Crítica" },
        { id: 3, nome: "MP-03: Secagem", setor: "Acabamento", status: "ok", dados: [{k:"Velocidade", v:"1100"}, {k:"Umidade", v:"6.5%"}], alerta: null }
    ],
    pagamentos: [
        { id: "PG-201", beneficiario: "Energy Corp", valor: "R$ 450.000", status: "Pago", dados: [{k:"Desc", v:"Conta Luz"}, {k:"Data", v:"05/01"}] },
        { id: "PG-202", beneficiario: "Química Sul", valor: "R$ 40.000", status: "Pago", dados: [{k:"Desc", v:"Ref. NF-5003"}, {k:"Data", v:"11/01"}] },
        { id: "PG-203", beneficiario: "Madeira Co.", valor: "R$ 5.000", status: "Agendado", dados: [{k:"Desc", v:"Compra Toras"}, {k:"Data", v:"15/01"}] }
    ],
    frota: [
        { placa: "ABC-1234", modelo: "Volvo FH", status: "Em Rota", dados: [{k:"Motorista", v:"Jorge Amado"}, {k:"Carga", v:"Resina"}, {k:"Destino", v:"Fábrica Sul"}] },
        { placa: "XYZ-9876", modelo: "Scania R", status: "Manutenção", dados: [{k:"Motorista", v:"Pedro A."}, {k:"Oficina", v:"TruckCenter"}] },
        { placa: "LOG-5555", modelo: "Mercedes", status: "Disponível", dados: [{k:"Local", v:"Pátio 1"}] }
    ],
    campanhas: [
        { nome: "Papel Verde", canal: "Instagram", status: "Ativa", dados: [{k:"Investimento", v:"R$ 5.000"}, {k:"Cliques", v:"15.420"}, {k:"ROI", v:"320%"}] },
        { nome: "Institucional", canal: "LinkedIn", status: "Ativa", dados: [{k:"Investimento", v:"R$ 2.000"}, {k:"Visualizações", v:"8.000"}] }
    ],
    contabilidade: [
        { nf: "NF-5001", forn: "Química Sul", total: "R$ 25.000", status: "Faturado", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"5.000 kg"}] },
        { nf: "NF-5002", forn: "Madeira Co.", total: "R$ 5.000", status: "Faturado", dados: [{k:"Item", v:"Toras"}, {k:"Qtd Faturada", v:"10.000 kg"}] },
        { nf: "NF-5003", forn: "Química Sul", total: "R$ 40.000", status: "Faturado", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"8.000 kg"}] }, // FRAUDE
        { nf: "NF-5004", forn: "Química Sul", total: "R$ 40.000", status: "Pendente", dados: [{k:"Item", v:"Resina"}, {k:"Qtd Faturada", v:"8.000 kg"}] }  // FRAUDE
    ],
    fornecedores: [
        { empresa: "Química Sul", tipo: "Químicos", status: "Ativo", dados: [{k:"Contrato", v:"Vitalício"}, {k:"Lead Time", v:"2 dias"}] },
        { empresa: "Reflorestadora PR", tipo: "Madeira", status: "Ativo", dados: [{k:"Contrato", v:"Anual"}, {k:"Volume", v:"500 ton/mês"}] }
    ],
    insumos: [
        { nome: "Madeira", nivel: "12.500 m³", st: "Normal", cor: "green" },
        { nome: "Soda Cáustica", nivel: "22%", st: "BAIXO", cor: "red" },
        { nome: "Resina Imp.", nivel: "10%", st: "CRÍTICO", cor: "red" }
    ],
    turnos: [
        { data: "10/01", turno: "Manhã", maq: 2, op: "Carlos L.", obs: "OK" },
        { data: "10/01", turno: "Tarde", maq: 2, op: "Mariana S.", obs: "Falha Pressão" }
    ]
};

// --- 2. INICIALIZAÇÃO ---
let user = JSON.parse(localStorage.getItem('genUser'));
if(!user) user = { name: "Teste", role: "Produção" };

document.getElementById('lblUser').innerText = user.name;
document.getElementById('lblRole').innerText = user.role;
rotearPerfil();

function rotearPerfil() {
    // Esconde tudo
    const perfis = ['perfil-rh', 'perfil-producao', 'perfil-financeiro', 'perfil-logistica', 'perfil-marketing', 'perfil-contabilidade', 'perfil-insumos', 'perfil-erro'];
    perfis.forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });

    // Controla botão dados
    const btnDados = document.getElementById('menu-data');
    if (btnDados) {
        if (user.role === 'RH') btnDados.classList.add('hidden');
        else {
            btnDados.classList.remove('hidden');
            prepararDownloads();
        }
    }

    // Mostra Dashboard Correto
    if(user.role === 'RH') {
        document.getElementById('perfil-rh').classList.remove('hidden');
        renderGraficosRH();
    } 
    else if (user.role === 'Produção') { renderGeneric('producao', DB.maquinas, 'nome', 'setor', 'status', 'dados', 'alerta'); }
    else if (user.role === 'Financeiro') { renderGeneric('financeiro', DB.pagamentos, 'id', 'beneficiario', 'status', 'dados', null, 'valor'); }
    else if (user.role === 'Logística') { renderGeneric('logistica', DB.frota, 'placa', 'modelo', 'status', 'dados'); }
    else if (user.role === 'Marketing') { renderGeneric('marketing', DB.campanhas, 'nome', 'canal', 'status', 'dados'); }
    else if (user.role === 'Contabilidade') { renderGeneric('contabilidade', DB.contabilidade, 'nf', 'forn', 'status', 'dados', null, 'total'); }
    else if (user.role === 'Insumos') { renderGeneric('insumos', DB.fornecedores, 'empresa', 'tipo', 'status', 'dados'); }
    else if (user.role === 'Auditoria') { navegar('data'); }
    else { document.getElementById('perfil-erro').classList.remove('hidden'); }
}


// --- 3. FUNÇÃO DE RENDERIZAÇÃO GENÉRICA (MÁGICA DOS DASHBOARDS) ---
function renderGeneric(perfil, dadosDB, keyTitulo, keySub, keyBadge, keyDados, keyAlerta = null, keyExtra = null) {
    const el = document.getElementById(`perfil-${perfil}`);
    if(el) el.classList.remove('hidden');

    const container = document.getElementById(`grid-${perfil}`);
    if(!container) return;
    
    container.innerHTML = '';
    
    dadosDB.forEach(item => {
        let cor = 'status-ok';
        if(item[keyBadge] === 'warn' || item[keyBadge] === 'Pendente' || item[keyBadge] === 'Manutenção') cor = 'status-warn';
        if(item[keyBadge] === 'CRÍTICO' || item[keyBadge] === 'BAIXO') cor = 'status-err'; // Se houver estilo erro

        // Borda colorida baseada no perfil
        let styleBorder = "";
        if(perfil === 'financeiro') styleBorder = "border-left-color: #8e44ad;";
        if(perfil === 'logistica') styleBorder = "border-left-color: #d35400;";
        if(perfil === 'marketing') styleBorder = "border-left-color: #e91e63;";
        if(perfil === 'contabilidade') styleBorder = "border-left-color: #2c3e50;";

        let card = document.createElement('div');
        card.className = `card-maq ${cor}`;
        if(styleBorder) card.style = styleBorder;

        let extraInfo = keyExtra ? `<p style="font-weight:bold; color:#333; margin-top:5px;">${item[keyExtra]}</p>` : '';

        card.innerHTML = `
            <h3>${item[keyTitulo]}</h3>
            <p>${item[keySub]}</p>
            ${extraInfo}
            <span class="badge" style="background:#555">${item[keyBadge]}</span>
        `;
        
        card.onclick = () => abrirDetalhesGenerico(perfil, item, keyTitulo, keyDados, keyAlerta);
        container.appendChild(card);
    });

    // Renderiza tabelas extras se for produção
    if(perfil === 'producao') {
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
}

function abrirDetalhesGenerico(perfil, item, keyTitulo, keyDados, keyAlerta) {
    // Preenche Titulo
    const elTitulo = document.getElementById(`${perfil.substring(0,3) + (perfil==='producao'?'d':'')}-titulo`); // prod-titulo, fin-titulo...
    if(elTitulo) elTitulo.innerText = item[keyTitulo];

    // Preenche Grid de Dados
    const elGrid = document.getElementById(`${perfil.substring(0,3) + (perfil==='producao'?'d':'')}-dados`);
    if(elGrid) {
        elGrid.innerHTML = '';
        if(item[keyDados]) {
            item[keyDados].forEach(d => {
                elGrid.innerHTML += `<div class="tele-item"><span class="tele-val">${d.v}</span><small>${d.k}</small></div>`;
            });
        }
    }

    // Alerta (Opcional)
    if(keyAlerta) {
        const elAlerta = document.getElementById(`${perfil.substring(0,4)}-alerta`);
        if(elAlerta) {
            if(item[keyAlerta]) {
                elAlerta.style.display = 'block';
                elAlerta.innerText = item[keyAlerta];
            } else {
                elAlerta.style.display = 'none';
            }
        }
    }

    // Mostra Painel
    const painel = document.getElementById(`detalhe-${perfil}`);
    if(painel) {
        painel.style.display = 'block';
        setTimeout(() => painel.scrollIntoView({behavior:'smooth', block:'start'}), 100);
    }
}


// --- 4. FUNÇÕES GERAIS ---
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
    // Específico para produção
    ['maq', 'ins', 'turn'].forEach(id => document.getElementById(`${perfil}-${id}`).classList.add('hidden'));
    document.querySelectorAll('.prod-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${perfil}-${aba}`).classList.remove('hidden');
    btn.classList.add('active');
}

function sair() { localStorage.removeItem('genUser'); window.location.href = 'login.html'; }

function baixarJSON(tipo) {
    let dados = DB[tipo];
    // Ajuste para baixar dados específicos do estudo de caso 2
    if(tipo === 'logistica') dados = DB.frota; // Exemplo simplificado

    if(!dados) return alert("Erro no arquivo.");
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

function prepararDownloads() {
    const container = document.getElementById('download-area');
    if(!container) return;
    container.innerHTML = '';
    
    // Define o que cada um pode baixar
    let permitted = [];
    if(user.role === 'Produção') permitted = ['maquinas', 'insumos', 'turnos'];
    if(user.role === 'Financeiro') permitted = ['pagamentos', 'compras'];
    if(user.role === 'Logística') permitted = ['frota'];
    if(user.role === 'Contabilidade') permitted = ['contabilidade'];
    if(user.role === 'Insumos') permitted = ['fornecedores', 'insumos'];
    if(user.role === 'Auditoria') permitted = ['maquinas', 'turnos', 'contabilidade', 'frota']; // Auditor vê tudo

    permitted.forEach(tipo => {
        const div = document.createElement('div');
        div.className = 'card-panel';
        div.style.textAlign = 'center'; div.style.minWidth = '150px'; div.style.flex = '1';
        div.innerHTML = `<h3>${tipo.toUpperCase()}</h3><p style="font-size:0.8rem">JSON</p>`;
        const btn = document.createElement('button');
        btn.className = 'prod-btn'; btn.innerText = '⬇ Baixar';
        btn.onclick = () => baixarJSON(tipo);
        div.appendChild(btn); container.appendChild(div);
    });
}

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
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

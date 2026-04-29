// Sample data structure - will be replaced with Google Sheets data
const hierarchyData = [
    {
        id: 1,
        nome: "ARCA CHURCH",
        tipo: "Igreja",
        idPai: null,
        idSupervisao: null,
        nomeExibicao: "ARCA CHURCH\nIGREJA",
        dataCriacao: "2017-12-03",
        ativa: true,
        proximaMultiplicacao: null
    },
    {
        id: 2,
        nome: "SHALOM",
        tipo: "Supervisão",
        idPai: 1,
        idSupervisao: 1,
        nomeExibicao: "SHALOM\nSUPERVISÃO",
        dataCriacao: "2018-03-05",
        ativa: true,
        proximaMultiplicacao: null
    },
    {
        id: 3,
        nome: "CORDATUS",
        tipo: "Supervisão",
        idPai: 1,
        idSupervisao: 2,
        nomeExibicao: "CORDATUS\nSUPERVISÃO",
        dataCriacao: "2018-08-15",
        ativa: true,
        proximaMultiplicacao: null
    },
    {
        id: 4,
        nome: "TRANSFORMAÇÃO",
        tipo: "Supervisão",
        idPai: 3,
        idSupervisao: 3,
        nomeExibicao: "TRANSFORMAÇÃO\nSUPERVISÃO",
        dataCriacao: "2019-05-20",
        ativa: true,
        proximaMultiplicacao: null
    },
    {
        id: 5,
        nome: "ABA PAI",
        tipo: "Célula",
        idPai: 3,
        idSupervisao: 3,
        nomeExibicao: "ABA PAI\nCÉLULA",
        dataCriacao: "2018-09-10",
        ativa: false,
        proximaMultiplicacao: null
    }
];

// Load data from Google Sheets (placeholder)
async function loadHierarchyData() {
    try {
        // This would be replaced with actual Google Sheets API call
        // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/...`);
        // const data = await response.json();
        // return data.values;
        return hierarchyData;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return hierarchyData;
    }
}

// Calculate months until multiplication date
function calcularMesesAteData(dataMultiplicacao) {
    if (!dataMultiplicacao) return null;
    
    const hoje = new Date(2026, 3, 29); // Current date
    const data = new Date(dataMultiplicacao);
    
    const months = (data.getFullYear() - hoje.getFullYear()) * 12 + 
                   (data.getMonth() - hoje.getMonth());
    
    return months;
}

// Get status icon based on months
function getStatusIcon(meses) {
    if (meses === null) return '';
    
    if (meses >= 6) {
        return '<span class="box-status-icon icon-ok">👍</span>';
    } else if (meses >= 3) {
        return '<span class="box-status-icon icon-warning">⚠️</span>';
    } else if (meses > 0) {
        return '<span class="box-status-icon icon-danger">🔴</span>';
    } else {
        return '<span class="box-status-icon icon-expired">🔵</span>';
    }
}

// Format date to Portuguese
function formatarData(dataString) {
    const opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', opcoes);
}

// Get box class based on type
function getBoxClass(tipo, ativa) {
    if (!ativa && tipo === 'Célula') return 'inativa';
    
    switch(tipo.toLowerCase()) {
        case 'igreja':
            return 'chiesa';
        case 'supervisão':
            return 'supervisao';
        case 'célula':
            return 'celula';
        case 'nova célula':
            return 'nova-celula';
        default:
            return 'celula';
    }
}

// Create box HTML
function criarBox(item) {
    const boxClass = getBoxClass(item.tipo, item.ativa);
    const statusIcon = getStatusIcon(calcularMesesAteData(item.proximaMultiplicacao));
    const dataFormatada = formatarData(item.dataCriacao);
    
    return `
        <div class="box ${boxClass}" data-id="${item.id}" title="${item.nome}">
            ${statusIcon}
            <div class="box-type">${item.tipo}</div>
            <div class="box-title">${item.nomeExibicao}</div>
            <div class="box-date">Desde ${dataFormatada}</div>
        </div>
    `;
}

// Group items by level/generation
function agruparPorNivel(dados) {
    const niveis = {};
    
    dados.forEach(item => {
        const nivel = calcularNivel(item, dados);
        if (!niveis[nivel]) {
            niveis[nivel] = [];
        }
        niveis[nivel].push(item);
    });
    
    return niveis;
}

// Calculate hierarchy level
function calcularNivel(item, dados) {
    let nivel = 0;
    let atual = item;
    
    while (atual.idPai) {
        const pai = dados.find(d => d.id === atual.idPai);
        if (!pai) break;
        nivel++;
        atual = pai;
    }
    
    return nivel;
}

// Calculate statistics
function calcularEstatisticas(dados) {
    const stats = {
        igrejas: 0,
        supervisoes: 0,
        celulas: 0,
        novasCelulas: 0,
        ativas: 0,
        inativas: 0
    };
    
    dados.forEach(item => {
        if (item.tipo === 'Igreja') stats.igrejas++;
        else if (item.tipo === 'Supervisão') stats.supervisoes++;
        else if (item.tipo === 'Nova Célula') stats.novasCelulas++;
        else if (item.tipo === 'Célula') stats.celulas++;
        
        if (item.ativa) stats.ativas++;
        else stats.inativas++;
    });
    
    return stats;
}

// Update resume panel
function atualizarResumo(dados) {
    const stats = calcularEstatisticas(dados);
    const resumeContent = document.getElementById('resume-content');
    
    if (resumeContent) {
        resumeContent.innerHTML = `
            <div class="resume-stat">
                <span>🏛️</span>
                <span>${stats.igrejas} Igreja</span>
            </div>
            <div class="resume-stat">
                <span>🟢</span>
                <span>${stats.supervisoes} Supervisões</span>
            </div>
            <div class="resume-stat">
                <span>🟡</span>
                <span>${stats.celulas} Células</span>
            </div>
            <div class="resume-stat">
                <span>🟣</span>
                <span>${stats.novasCelulas} Novas Células</span>
            </div>
            <div class="resume-stat">
                <span>✅</span>
                <span>${stats.ativas} Ativas</span>
            </div>
            <div class="resume-stat">
                <span>❌</span>
                <span>${stats.inativas} Inativas</span>
            </div>
        `;
    }
}

// Render hierarchy
function renderizarHierarquia(dados) {
    const container = document.getElementById('hierarchyContainer');
    if (!container) return;
    
    const niveis = agruparPorNivel(dados);
    let html = '';
    
    Object.keys(niveis)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .forEach(nivel => {
            const geracaoNum = parseInt(nivel);
            html += `
                <div class="hierarchy-level">
                    <div class="level-label">GERAÇÃO ${geracaoNum} - NÍVEL ${geracaoNum}</div>
                    <div class="hierarchy-row">
                        ${niveis[nivel].map(item => criarBox(item)).join('')}
                    </div>
                </div>
            `;
        });
    
    container.innerHTML = html;
}

// Initialize application
async function inicializarApp() {
    try {
        const dados = await loadHierarchyData();
        
        // Update resume statistics
        atualizarResumo(dados);
        
        // Render hierarchy
        renderizarHierarquia(dados);
        
        // Add click handlers for interactivity
        document.querySelectorAll('.box').forEach(box => {
            box.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = dados.find(d => d.id === parseInt(id));
                if (item) {
                    console.log('Item clicado:', item);
                    // Add your interaction logic here
                }
            });
        });
        
        console.log('Aplicação inicializada com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', inicializarApp);

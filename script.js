// Sample data structure - will be replaced with Excel data
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
    }
];

let currentData = hierarchyData;

// Load data from localStorage or data.json
async function loadHierarchyData() {
    try {
        // Try localStorage first
        const cachedData = xlsxHandler.getFromLocalStorage();
        if (cachedData && cachedData.length > 0) {
            console.log('Dados carregados do cache');
            return cachedData;
        }

        // Try data.json
        const response = await fetch('data.json');
        if (response.ok) {
            const data = await response.json();
            console.log('Dados carregados de data.json');
            xlsxHandler.saveToLocalStorage(data);
            return data;
        }

        return hierarchyData;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return hierarchyData;
    }
}

// Calculate months until multiplication date
function calcularMesesAteData(dataMultiplicacao) {
    if (!dataMultiplicacao) return null;
    
    const hoje = new Date();
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
    if (!dataString) return '';
    const opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const data = new Date(dataString + 'T00:00:00');
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

// Update last update time display
function atualizarTimestamp() {
    const lastUpdate = xlsxHandler.getLastUpdate();
    const lastUpdateEl = document.getElementById('lastUpdate');
    
    if (lastUpdateEl && lastUpdate) {
        const date = new Date(lastUpdate);
        const formatted = date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR');
        lastUpdateEl.textContent = `Última atualização: ${formatted}`;
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
    
    container.innerHTML = html || '<p style="text-align: center; color: #999;">Nenhum dado para exibir</p>';
}

// Show modal
function showModal(title, message, type = 'success') {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modal.className = `modal ${type}`;
    modal.style.display = 'flex';
    
    // Close on button click
    document.getElementById('modalBtn').onclick = () => {
        modal.style.display = 'none';
    };
    
    // Close on X click
    document.querySelector('.close').onclick = () => {
        modal.style.display = 'none';
    };
    
    // Close on outside click
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Update data from XLSX
async function atualizarDados() {
    const btn = document.getElementById('updateBtn');
    btn.disabled = true;
    btn.classList.add('loading');
    
    try {
        console.log('Iniciando atualização...');
        
        // Convert XLSX to JSON
        const novosDados = await xlsxHandler.xlsxToJson();
        
        if (!novosDados || novosDados.length === 0) {
            throw new Error('Nenhum dado foi extraído do arquivo XLSX');
        }
        
        // Save to localStorage
        xlsxHandler.saveToLocalStorage(novosDados);
        
        // Update current data
        currentData = novosDados;
        
        // Re-render everything
        atualizarResumo(currentData);
        renderizarHierarquia(currentData);
        atualizarTimestamp();
        
        // Show success message
        showModal(
            '✅ Sucesso!',
            `Dados atualizados com sucesso!\n\n${novosDados.length} registros carregados do arquivo XLSX.`,
            'success'
        );
        
        console.log('Atualização concluída:', novosDados.length, 'registros');
        
    } catch (error) {
        console.error('Erro na atualização:', error);
        showModal(
            '❌ Erro na Atualização',
            `Ocorreu um erro ao processar o arquivo XLSX:\n\n${error.message}`,
            'error'
        );
    } finally {
        btn.disabled = false;
        btn.classList.remove('loading');
    }
}

// Initialize application
async function inicializarApp() {
    try {
        // Load initial data
        const dados = await loadHierarchyData();
        currentData = dados;
        
        // Update resume statistics
        atualizarResumo(currentData);
        
        // Render hierarchy
        renderizarHierarquia(currentData);
        
        // Update timestamp
        atualizarTimestamp();
        
        // Add button event listener
        const updateBtn = document.getElementById('updateBtn');
        if (updateBtn) {
            updateBtn.addEventListener('click', atualizarDados);
        }
        
        console.log('Aplicação inicializada com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showModal(
            '⚠️ Aviso',
            'Erro ao inicializar a aplicação. Usando dados de exemplo.',
            'error'
        );
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', inicializarApp);

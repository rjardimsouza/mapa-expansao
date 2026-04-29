# 🌿 Mapa de Expansão - ARCA CHURCH

Visualização hierárquica interativa da estrutura de expansão da ARCA CHURCH baseada em planilha do Google Sheets.

## 📋 Requisitos

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Acesso à internet (para integração com Google Sheets)
- API Key do Google Sheets (ver configuração abaixo)

## 🚀 Quick Start

1. **Clone ou faça download do repositório**
```bash
git clone https://github.com/rjardimsouza/mapa-expansao.git
cd mapa-expansao
```

2. **Abra `index.html` em seu navegador**
```bash
# Opção 1: Abra diretamente
open index.html

# Opção 2: Use um servidor local (recomendado)
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 🔗 Integração com Google Sheets

### Passo 1: Preparar a Planilha

Sua planilha deve ter as seguintes colunas (nessa ordem):

| ID | Nome | Tipo | ID Pai | ID Supervisão | Nome Exibição | Data Criação | Ativa? | Próxima Multiplicação |
|---|---|---|---|---|---|---|---|---|
| 1 | ARCA CHURCH | Igreja | - | - | ARCA CHURCH IGREJA | 2017-12-03 | Sim | - |
| 2 | SHALOM | Supervisão | 1 | 1 | SHALOM SUPERVISÃO | 2018-03-05 | Sim | - |

**Importante:** 
- `Ativa?` deve conter "Sim" ou "Não"
- `Próxima Multiplicação` deve estar em formato YYYY-MM-DD
- `Tipo` pode ser: Igreja, Supervisão, Célula, Nova Célula

### Passo 2: Configurar Google Sheets API

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a API "Google Sheets API"
4. Crie uma chave de API (Credentials > API Key)
5. Copie sua **Sheet ID** da URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/...`

### Passo 3: Atualizar Configuração

Edite `data.js` e substitua:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    API_KEY: 'SEU_API_KEY_AQUI',
    SHEET_ID: '19AU6VJ1YCkeRzLsn6Kg8gHttR78VZ6bha3fEC8twDXQ',
    RANGE: 'Sheet1!A1:J1000'
};
```

### Passo 4: Usar no Código

Modifique `script.js` na função `loadHierarchyData()`:

```javascript
async function loadHierarchyData() {
    const dados = await window.dataSource.fetchFromGoogleSheets();
    return dados || hierarchyData; // Fallback para dados de exemplo
}
```

## 🎨 Tipos de Caixas e Cores

| Tipo | Cor | Código Hex |
|---|---|---|
| Igreja | Azul Escuro | #1e3a5f |
| Supervisão | Verde | #6ba14f |
| Célula | Amarelo | #f4d35e |
| Nova Célula | Roxo | #d4a5d9 |
| Inativa | Cinza | #cccccc |

## 📊 Ícones de Status de Multiplicação

O status é calculado automaticamente com base na coluna "Próxima Multiplicação":

| Ícone | Significado | Intervalo |
|---|---|---|
| 👍 Verde | Em dia | ≥ 6 meses |
| ⚠️ Amarelo | Atenção | 3-6 meses |
| 🔴 Vermelho | Urgente | 0-3 meses |
| 🔵 Roxo | Vencido | < 0 meses |

## 📂 Estrutura de Arquivos

```
mapa-expansao/
├── index.html          # Página principal
├── styles.css          # Estilos e layout
├── script.js           # Lógica de renderização
├── data.js             # Integração com Google Sheets
├── data.json           # (Opcional) Dados locais
└── README.md           # Este arquivo
```

## 🔧 Funcionalidades

✅ Visualização hierárquica em tempo real  
✅ Agrupamento por gerações/níveis  
✅ Estatísticas resumidas (Igreja, Supervisões, Células, etc.)  
✅ Caixas cinzas para células inativas  
✅ Ícones de status de multiplicação  
✅ Datas discretas de criação  
✅ Design responsivo (mobile/tablet/desktop)  
✅ Caixas interativas (clicáveis)  
✅ Integração com Google Sheets  

## 🛠️ Customização

### Alterar Cores

Edite `styles.css`:

```css
.box.chiesa {
    background-color: #1e3a5f; /* Altere aqui */
    color: white;
}
```

### Alterar Ícones de Status

Edite `script.js` na função `getStatusIcon()`:

```javascript
if (meses >= 6) {
    return '<span class="box-status-icon icon-ok">👍</span>'; // Altere o emoji
}
```

### Adicionar Novos Campos

1. Adicione coluna na planilha
2. Atualize índice em `parseSheetData()` (data.js)
3. Use o novo campo onde necessário

## 🐛 Troubleshooting

### "CORS Error" ao carregar dados
- Certifique-se de que a API Key está correta
- Verifique se a Sheet ID está correta
- A planilha deve ser pública ou compartilhada

### Dados não carregam
- Verifique console (F12) para erros
- Confirme que as colunas estão na ordem correta
- Teste com `loadFromLocalJSON()` primeiro

### Caixas aparecem vazias
- Verifique se a coluna "Nome" tem dados
- Confirme se "Nome Exibição" está preenchido

## 📝 Exemplo de Dados

```json
[
    {
        "id": 1,
        "nome": "ARCA CHURCH",
        "tipo": "Igreja",
        "idPai": null,
        "idSupervisao": null,
        "nomeExibicao": "ARCA CHURCH\nIGREJA",
        "dataCriacao": "2017-12-03",
        "ativa": true,
        "proximaMultiplicacao": null
    }
]
```

## 📱 Responsividade

A página foi otimizada para:
- 📱 Mobile (até 480px)
- 📲 Tablet (481px - 768px)
- 🖥️ Desktop (acima de 768px)

## 🔐 Segurança

⚠️ **Importante:** Nunca coloque sua API Key diretamente no código para produção!

Para produção, use:
- Variáveis de ambiente
- Backend proxy
- Firebase Functions
- Netlify Functions

## 📞 Suporte

Para problemas ou dúvidas, abra uma [issue](https://github.com/rjardimsouza/mapa-expansao/issues).

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar.

---

**Última atualização:** 29/04/2026

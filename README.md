# 🌿 Mapa de Expansão - ARCA CHURCH

Visualização hierárquica interativa da estrutura de expansão da ARCA CHURCH baseada em arquivo JSON local.

## 📋 Quick Start

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/rjardimsouza/mapa-expansao.git
cd mapa-expansao
```

### 2️⃣ Abra em um Servidor Local

#### Opção A: Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Depois acesse: http://localhost:8000
```

#### Opção B: Node.js (http-server)
```bash
npx http-server
```

#### Opção C: Abrir Diretamente
```bash
# No navegador, abra:
file:///caminho/completo/para/mapa-expansao/index.html
```

## 📊 Estrutura de Dados

Os dados estão armazenados em `data.json`. Cada item deve ter:

```json
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
```

### Campos Obrigatórios:

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `id` | número | ID único do item | 1 |
| `nome` | string | Nome do item | "ARCA CHURCH" |
| `tipo` | string | Tipo: Igreja, Supervisão, Célula, Nova Célula | "Igreja" |
| `idPai` | número/null | ID do item pai | 1 ou null |
| `idSupervisao` | número/null | ID da supervisão | 1 ou null |
| `nomeExibicao` | string | Nome para exibir (use \n para quebra de linha) | "ARCA CHURCH\nIGREJA" |
| `dataCriacao` | string | Data no formato YYYY-MM-DD | "2017-12-03" |
| `ativa` | boolean | Status do item | true ou false |
| `proximaMultiplicacao` | string/null | Data da próxima multiplicação YYYY-MM-DD | "2026-10-20" ou null |

## 🎨 Tipos de Caixas

| Tipo | Cor | Classe CSS |
|------|-----|-----------|
| Igreja | 🟦 Azul Escuro (#1e3a5f) | `.chiesa` |
| Supervisão | 🟢 Verde (#6ba14f) | `.supervisao` |
| Célula | 🟡 Amarelo (#f4d35e) | `.celula` |
| Nova Célula | 🟣 Roxo (#d4a5d9) | `.nova-celula` |
| Inativa | ⚫ Cinza (#cccccc) | `.inativa` |

**Nota:** Células com `ativa: false` aparecem em cinza automaticamente.

## 🔔 Ícones de Status de Multiplicação

O status é calculado automaticamente comparando a data atual com `proximaMultiplicacao`:

| Ícone | Status | Intervalo |
|-------|--------|-----------|
| 👍 | Verde (em dia) | ≥ 6 meses |
| ⚠️ | Amarelo (atenção) | 3-6 meses |
| 🔴 | Vermelho (urgente) | 0-3 meses |
| 🔵 | Roxo (vencido) | < 0 meses |

## 📂 Estrutura de Arquivos

```
mapa-expansao/
├── index.html          # 📄 Página principal
├── styles.css          # 🎨 Estilos e layout
├── script.js           # ⚙️ Lógica de renderização
├── data.json           # 📊 Dados da hierarquia
└── README.md           # 📖 Este arquivo
```

## 🔧 Como Usar Seus Dados

### Opção 1: Editar `data.json` Diretamente

1. Abra `data.json`
2. Substitua os dados de exemplo
3. Salve o arquivo
4. Recarregue a página no navegador

### Opção 2: Converter Planilha Excel para JSON

Use um conversor online:
- [Excel to JSON Online](https://www.convertcsv.com/excel-to-json.htm)
- [CloudConvert](https://cloudconvert.com/xlsx-to-json)

Passos:
1. Exporte sua planilha do Google Sheets como CSV/XLSX
2. Use o conversor para transformar em JSON
3. Copie o resultado para `data.json`
4. Recarregue a página

## 🖥️ Funcionalidades

✅ **Hierarquia Visual** com agrupamento por geração  
✅ **Cores Automáticas** por tipo de item  
✅ **Ícones de Multiplicação** com status  
✅ **Resumo Estatístico** geral  
✅ **Datas Discretas** de criação  
✅ **Caixas Cinzas** para itens inativos  
✅ **Design Responsivo** (mobile/tablet/desktop)  
✅ **Sem dependências externas** (JavaScript puro)  
✅ **Sem API Key necessária** (dados locais)  

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🐛 Troubleshooting

### "Dados não carregam"
1. Verifique se `data.json` existe no mesmo diretório
2. Verifique o console do navegador (F12 > Console)
3. Certifique-se de que está usando um servidor local (não `file://`)
4. Valide o JSON em [jsonlint.com](https://www.jsonlint.com/)

### "Caixas aparecem vazias"
- Verifique se o campo `nomeExibicao` tem conteúdo
- Use `\n` para quebras de linha no nome

### "Ícone de status não aparece"
- Verifique se `proximaMultiplicacao` está no formato YYYY-MM-DD
- Deixe como `null` se não houver data

## 🎨 Personalizar Cores

Edite `styles.css`:

```css
.box.chiesa {
    background-color: #1e3a5f; /* Azul - Igreja */
}

.box.supervisao {
    background-color: #6ba14f; /* Verde - Supervisão */
}

.box.celula {
    background-color: #f4d35e; /* Amarelo - Célula */
}

.box.nova-celula {
    background-color: #d4a5d9; /* Roxo - Nova Célula */
}

.box.inativa {
    background-color: #cccccc; /* Cinza - Inativa */
}
```

## 📝 Exemplo de Dados Completo

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
    },
    {
        "id": 2,
        "nome": "SHALOM",
        "tipo": "Supervisão",
        "idPai": 1,
        "idSupervisao": 1,
        "nomeExibicao": "SHALOM\nSUPERVISÃO",
        "dataCriacao": "2018-03-05",
        "ativa": true,
        "proximaMultiplicacao": null
    },
    {
        "id": 3,
        "nome": "ABA PAI",
        "tipo": "Célula",
        "idPai": 2,
        "idSupervisao": 2,
        "nomeExibicao": "ABA PAI\nCÉLULA",
        "dataCriacao": "2018-09-10",
        "ativa": false,
        "proximaMultiplicacao": null
    }
]
```

## 💡 Dicas

- Use quebras de linha (`\n`) no `nomeExibicao` para melhor legibilidade
- Deixe `idPai` como `null` para itens raiz (Igreja)
- Sempre inclua `ativa` (true ou false)
- Datas devem estar em YYYY-MM-DD
- JSON deve estar válido (sem aspas desemparelhadas)

## 🚀 Próximos Passos

1. **Personalizar dados:** Edite `data.json` com seus dados
2. **Publicar online:** Use GitHub Pages, Netlify, Vercel, etc.
3. **Integrar com API:** Modifique `script.js` para carregar de uma API

## 📞 Suporte

- 🐛 Encontrou um bug? Abra uma [issue](https://github.com/rjardimsouza/mapa-expansao/issues)
- 💬 Tem sugestões? Deixe um comentário nas issues
- 📧 Contacte: rjardim.souza@gmail.com

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Última atualização:** 29/04/2026
**Versão:** 1.0.0

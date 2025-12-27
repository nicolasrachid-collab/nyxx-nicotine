<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1wueM_RweCIU3A6Dh9ZayaCs8_W9EwZnc

## Run Locally

**Prerequisites:** Node.js (versão 18 ou superior)

### Método Rápido (Recomendado)

No Windows, execute um dos scripts de inicialização:

**PowerShell (Recomendado):**
```powershell
.\start.ps1
```

**Ou usando Command Prompt (.bat):**
```cmd
start.bat
```

Este script irá:
- ✓ Verificar se Node.js está instalado
- ✓ Verificar e instalar/atualizar dependências automaticamente
- ✓ Verificar se a porta 3000 está disponível
- ✓ Iniciar o servidor de desenvolvimento

### Método Manual

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **(Opcional) Configure variáveis de ambiente:**
   Se o projeto usar a API do Gemini, crie um arquivo `.env` na raiz do projeto:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O projeto será aberto automaticamente no navegador em **http://localhost:3000**

### Solução de Problemas

**Porta 3000 já está em uso?**
- Feche outros processos que estejam usando a porta 3000
- Ou altere a porta no arquivo `vite.config.ts`

**Erro ao instalar dependências?**
- Limpe o cache: `npm cache clean --force`
- Delete `node_modules` e `package-lock.json`
- Execute novamente: `npm install`

**Projeto não abre automaticamente?**
- Acesse manualmente: http://localhost:3000

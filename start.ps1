# Script de inicialização do projeto Nyxx Nicotine
# Garante que todas as dependências estão instaladas e o projeto inicia corretamente

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Nyxx Nicotine - Inicializando Projeto" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se o Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js em: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verifica se o npm está instalado
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm encontrado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm não encontrado!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Verifica se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erro ao instalar dependências!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Verificando dependências..." -ForegroundColor Yellow
    # Verifica se package-lock.json é mais recente que node_modules
    $packageLockDate = (Get-Item "package-lock.json" -ErrorAction SilentlyContinue).LastWriteTime
    $nodeModulesDate = (Get-Item "node_modules" -ErrorAction SilentlyContinue).LastWriteTime
    
    if ($packageLockDate -gt $nodeModulesDate) {
        Write-Host "Atualizando dependências..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "✗ Erro ao atualizar dependências!" -ForegroundColor Red
            exit 1
        }
        Write-Host "✓ Dependências atualizadas!" -ForegroundColor Green
    } else {
        Write-Host "✓ Dependências já instaladas" -ForegroundColor Green
    }
}

Write-Host ""

# Verifica se a porta 3000 está em uso
Write-Host "Verificando porta 3000..." -ForegroundColor Yellow
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠ Porta 3000 está em uso. O servidor pode tentar usar outra porta." -ForegroundColor Yellow
    Write-Host "  Para liberar a porta, você pode encerrar o processo ou usar outra porta." -ForegroundColor Yellow
} else {
    Write-Host "✓ Porta 3000 disponível" -ForegroundColor Green
}

Write-Host ""
Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Cyan
Write-Host "O projeto será aberto automaticamente no navegador em http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para parar o servidor, pressione Ctrl+C" -ForegroundColor Gray
Write-Host ""

# Inicia o servidor
npm run dev


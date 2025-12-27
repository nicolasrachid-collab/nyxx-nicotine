@echo off
chcp 65001 >nul
echo ========================================
echo   Nyxx Nicotine - Inicializando Projeto
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Node.js não encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js encontrado: %NODE_VERSION%

echo Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ✗ npm não encontrado!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm encontrado: v%NPM_VERSION%
echo.

if not exist "node_modules" (
    echo Instalando dependências...
    call npm install
    if errorlevel 1 (
        echo ✗ Erro ao instalar dependências!
        pause
        exit /b 1
    )
    echo ✓ Dependências instaladas com sucesso!
) else (
    echo ✓ Dependências já instaladas
)

echo.
echo Iniciando servidor de desenvolvimento...
echo O projeto será aberto automaticamente no navegador em http://localhost:3000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

call npm run dev


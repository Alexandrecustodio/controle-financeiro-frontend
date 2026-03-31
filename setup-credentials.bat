@echo off
REM Finance Manager - Setup Apple Credentials
REM Script para configurar credenciais Apple no Windows

echo.
echo ========================================
echo Finance Manager - Setup Credentials
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "app.config.ts" (
    echo Erro: Este script deve ser executado na pasta do projeto!
    echo Por favor, navegue para a pasta finance-app e tente novamente.
    pause
    exit /b 1
)

echo Configurando credenciais Apple...
echo.

REM Set token and run credentials command
set EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9

echo Executando: npx eas credentials --platform ios
echo.
echo Quando pedir, selecione "preview" e faça login com sua conta Apple Developer.
echo.

call npx eas credentials --platform ios

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Sucesso! Credenciais configuradas!
    echo ========================================
    echo.
    echo Proximo passo: Execute o build com:
    echo.
    echo   setup-build.bat
    echo.
) else (
    echo.
    echo Erro ao configurar credenciais.
    echo Por favor, tente novamente.
    echo.
)

pause

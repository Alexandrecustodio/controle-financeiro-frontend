@echo off
REM Finance Manager - Build iOS App
REM Script para gerar build iOS automaticamente

echo.
echo ========================================
echo Finance Manager - iOS Build
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "app.config.ts" (
    echo Erro: Este script deve ser executado na pasta do projeto!
    echo Por favor, navegue para a pasta finance-app e tente novamente.
    pause
    exit /b 1
)

echo Iniciando build iOS...
echo.

REM Set token and run build command
set EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9

echo Executando: eas build --platform ios --profile preview
echo.
echo Isso vai levar 10-20 minutos. Nao feche esta janela!
echo.

call npx eas build --platform ios --profile preview

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Build concluido com sucesso!
    echo ========================================
    echo.
    echo Verifique seu build em: https://expo.dev/builds
    echo.
) else (
    echo.
    echo Erro ao gerar build.
    echo Por favor, tente novamente.
    echo.
)

pause

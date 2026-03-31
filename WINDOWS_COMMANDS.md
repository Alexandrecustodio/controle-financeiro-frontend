# 🪟 Comandos Simples para Windows

Se os scripts `.bat` não funcionaram, use estes comandos diretos.

---

## 🎯 Passo 1: Configurar Credenciais Apple

**Abra PowerShell na pasta do projeto e cole este comando:**

```powershell
$env:EXPO_TOKEN='owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9'; npx eas credentials --platform ios
```

**Pressione Enter.**

**O que vai acontecer:**
1. Vai pedir para selecionar um profile
2. Selecione `preview` (use seta para baixo)
3. Pressione Enter
4. Vai pedir para fazer login com Apple
5. Uma janela do navegador vai abrir
6. Faça login com sua conta Apple Developer
7. Autorize o acesso
8. Pronto! Credenciais configuradas

---

## 🎯 Passo 2: Gerar Build iOS

**Depois que as credenciais estiverem prontas, cole este comando:**

```powershell
$env:EXPO_TOKEN='owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9'; npx eas build --platform ios --profile preview
```

**Pressione Enter.**

**O que vai acontecer:**
1. Build vai começar
2. Vai levar 10-20 minutos
3. Você receberá um link para acompanhar
4. Depois um link do TestFlight

---

## ✅ Resumo

| Etapa | Comando |
|-------|---------|
| 1. Credenciais | `$env:EXPO_TOKEN='owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9'; npx eas credentials --platform ios` |
| 2. Build | `$env:EXPO_TOKEN='owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9'; npx eas build --platform ios --profile preview` |

---

## 🚨 Se Ainda Tiver Erro

Se receber erro, tente abrir **CMD** em vez de PowerShell:

1. Win + R
2. Digite `cmd`
3. Pressione Enter
4. Cole este comando:

```cmd
set EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 && npx eas credentials --platform ios
```

Depois:

```cmd
set EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 && npx eas build --platform ios --profile preview
```

---

**Qual erro você está recebendo? Me mostre a mensagem exata!**

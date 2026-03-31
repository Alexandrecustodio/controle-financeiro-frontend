# 🚀 Como Configurar e Publicar o App (Guia Local)

## ⚠️ IMPORTANTE

Você precisa fazer esses passos **NO SEU COMPUTADOR**, não no servidor de build.

---

## 📋 Pré-requisitos

1. **Node.js instalado** - https://nodejs.org (versão 16+)
2. **Git instalado** - https://git-scm.com
3. **Projeto baixado** - Clone ou baixe o projeto

---

## 🎯 Passo 1: Abrir Terminal no Seu Computador

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter

**Mac/Linux:**
- Abra o Terminal (Cmd + Espaço, digite "Terminal")

---

## 🎯 Passo 2: Navegar para a Pasta do Projeto

```bash
cd /caminho/para/finance-app
```

**Exemplo:**
```bash
# Windows
cd C:\Users\seu-usuario\finance-app

# Mac
cd /Users/seu-usuario/finance-app

# Linux
cd /home/seu-usuario/finance-app
```

---

## 🎯 Passo 3: Fazer Login no Expo

Execute no terminal:

```bash
npx eas login
```

**O que fazer:**
- Pressione Enter quando pedir email/username
- Digite seu email do Expo (ou crie em https://expo.dev)
- Pressione Enter
- Digite sua senha
- Pressione Enter

**Resultado esperado:**
```
✅ Logged in as: seu-email@exemplo.com
```

---

## 🎯 Passo 4: Criar Projeto no Expo EAS

Execute:

```bash
npx eas init
```

**O que vai aparecer:**

```
? What is your project name?
→ finance-app
```

Pressione Enter para aceitar o padrão.

```
? How would you like to create your EAS project?
→ Create a new EAS project
```

Selecione com seta e pressione Enter.

```
? Automatically create an Expo project?
→ Yes
```

Pressione Enter.

**Resultado esperado:**
```
✅ Project created successfully
✅ .easrc.json updated
```

---

## 🎯 Passo 5: Configurar Credenciais Apple

Execute:

```bash
npx eas credentials
```

**O que fazer:**

```
? Which platform?
→ iOS
```

Selecione com seta e pressione Enter.

```
? Which profile?
→ preview
```

Selecione e pressione Enter.

```
? Auto-generate credentials?
→ Yes
```

Pressione Enter.

**Resultado esperado:**
```
✅ Credentials configured
```

---

## 🎯 Passo 6: Gerar Build iOS

Execute:

```bash
npx eas build --platform ios --profile preview
```

**O que vai acontecer:**
- Build vai começar
- Vai levar 10-20 minutos
- Você receberá um link

**Resultado esperado:**
```
✅ Build started
✅ Build URL: https://expo.dev/builds/xxxxx
```

---

## 📱 Testar no iPhone

1. Abra o link que você recebeu
2. Escaneie o QR code com seu iPhone
3. Toque em "Instalar"
4. Teste o app

---

## 📋 Resumo dos Comandos

```bash
# 1. Login
npx eas login

# 2. Criar projeto
npx eas init

# 3. Configurar credenciais
npx eas credentials

# 4. Gerar build
npx eas build --platform ios --profile preview
```

---

## ❓ Perguntas Frequentes

### P: Posso fazer isso no servidor?
**R:** Não recomendado. Faça no seu computador local.

### P: Preciso de conta Apple Developer?
**R:** Para preview (TestFlight): NÃO. Para App Store: SIM ($99/ano).

### P: Quanto tempo leva?
**R:** Primeiro build: 20-30 min. Próximos: 10-15 min.

### P: Posso cancelar?
**R:** Sim, mas será cobrado pelo build iniciado.

---

## 🚨 Erros Comuns

### Erro: "Not authenticated"
```bash
npx eas logout
npx eas login
```

### Erro: "Project does not exist"
```bash
npx eas init
# Responda as perguntas
```

### Erro: "Apple credentials not found"
```bash
npx eas credentials
```

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] Projeto baixado/clonado
- [ ] Executei `npx eas login`
- [ ] Executei `npx eas init`
- [ ] Executei `npx eas credentials`
- [ ] Pronto para `npx eas build --platform ios --profile preview`

---

## 🎓 Próximo Passo

Quando estiver pronto, execute:

```bash
npx eas build --platform ios --profile preview
```

E aguarde! 🚀

---

**Dúvidas?**
- https://docs.expo.dev/build/introduction/
- https://docs.expo.dev/build-reference/ios-builds/

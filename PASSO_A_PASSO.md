# 📱 Guia Passo-a-Passo: Publicar Finance Manager no iOS

## ⚠️ IMPORTANTE

Você **NÃO precisa** criar um projeto no Expo Go. Você precisa criar um projeto no **Expo EAS** (que é diferente).

## 🎯 Passos Simples

### Passo 1: Fazer Login no Expo

Abra o terminal e execute:

```bash
eas login
```

**O que fazer:**
- Digite seu email do Expo (ou crie uma conta em https://expo.dev)
- Digite sua senha
- Pressione Enter

**Resultado esperado:**
```
✅ Logged in as: seu-email@exemplo.com
```

---

### Passo 2: Criar Projeto no Expo (IMPORTANTE!)

Execute:

```bash
eas init
```

**O que vai acontecer:**
- O terminal vai fazer perguntas
- **RESPONDA AS PERGUNTAS** (não deixe em branco)

**Perguntas típicas:**

```
? What is your project name?
→ finance-app

? How would you like to create your EAS project?
→ Create a new EAS project

? Automatically create an Expo project?
→ Yes
```

**Resultado esperado:**
```
✅ Project created successfully
✅ .easrc.json updated
```

---

### Passo 3: Configurar Credenciais Apple

Execute:

```bash
eas credentials
```

**O que fazer:**
- Selecione: **iOS**
- Selecione: **preview** (para testes) ou **production** (para App Store)
- Deixe o EAS gerar automaticamente (pressione Enter)

**Resultado esperado:**
```
✅ Credentials configured successfully
```

---

### Passo 4: Gerar Build iOS

Execute:

```bash
eas build --platform ios --profile preview
```

**O que vai acontecer:**
- O build vai começar
- Vai levar 10-20 minutos
- Você receberá um link para acompanhar

**Resultado esperado:**
```
✅ Build started
✅ Build URL: https://expo.dev/builds/xxxxx
```

---

## 📊 Resumo Visual

```
┌─────────────────────────────────────────────────┐
│ 1. eas login                                    │
│    └─ Fazer login com email/senha              │
├─────────────────────────────────────────────────┤
│ 2. eas init                                     │
│    └─ Responder as perguntas (IMPORTANTE!)     │
├─────────────────────────────────────────────────┤
│ 3. eas credentials                              │
│    └─ Configurar credenciais Apple             │
├─────────────────────────────────────────────────┤
│ 4. eas build --platform ios --profile preview  │
│    └─ Gerar build (10-20 minutos)              │
├─────────────────────────────────────────────────┤
│ 5. Receber link do TestFlight                  │
│    └─ Testar no iPhone                         │
└─────────────────────────────────────────────────┘
```

---

## ❓ Perguntas Frequentes

### P: Preciso criar um projeto no Expo Go?
**R:** NÃO! Você cria um projeto no **Expo EAS** (usando `eas init`). Expo Go é apenas para desenvolvimento local.

### P: O que é .easrc.json?
**R:** É um arquivo que armazena o ID do seu projeto. Ele é criado automaticamente quando você roda `eas init`.

### P: Quanto tempo leva o build?
**R:** 
- Primeiro build: 20-30 minutos
- Builds subsequentes: 10-15 minutos

### P: Posso cancelar o build?
**R:** Sim, pressione Ctrl+C no terminal. Mas você será cobrado pelo build iniciado.

### P: Preciso de conta Apple Developer?
**R:** 
- Para **preview (TestFlight)**: NÃO
- Para **production (App Store)**: SIM ($99/ano)

---

## 🚨 Erros Comuns

### Erro: "Project does not exist"

**Causa:** Você não rodou `eas init` ou rodou em modo não-interativo

**Solução:**
```bash
eas init
# Responda as perguntas
```

### Erro: "Not authenticated"

**Causa:** Você não fez login

**Solução:**
```bash
eas login
```

### Erro: "Apple credentials not found"

**Causa:** Você não configurou credenciais

**Solução:**
```bash
eas credentials
```

---

## 📋 Checklist

- [ ] Tenho conta Expo (https://expo.dev)
- [ ] Executei `eas login`
- [ ] Executei `eas init` (respondendo as perguntas)
- [ ] Executei `eas credentials`
- [ ] Pronto para rodar `eas build --platform ios --profile preview`

---

## 🎯 Próximo Passo

Quando estiver pronto, execute:

```bash
eas build --platform ios --profile preview
```

E aguarde o build terminar! 🚀

---

**Dúvidas? Consulte:**
- https://docs.expo.dev/build/introduction/
- https://docs.expo.dev/build-reference/ios-builds/

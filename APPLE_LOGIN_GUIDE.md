# 🍎 Como Fazer Login com Apple Developer

## 📋 O Que Você Precisa

- Conta Apple Developer (você já tem ✅)
- Email da conta Apple
- Senha da conta Apple
- Computador com terminal

---

## 🎯 Passo 1: Abrir Terminal

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter

**Mac:**
- Pressione `Cmd + Espaço`
- Digite `Terminal` e pressione Enter

**Linux:**
- Abra o Terminal

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

## 🎯 Passo 3: Executar Comando de Credenciais

Cole este comando no terminal:

```bash
EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 npx eas credentials --platform ios
```

Pressione Enter.

---

## 🎯 Passo 4: Responder as Perguntas

### Pergunta 1: Qual profile?

```
? Which build profile do you want to configure?
  development
❯ preview
  production
```

**Resposta:** Selecione `preview` com a seta para baixo e pressione Enter.

---

### Pergunta 2: Quer logar com Apple?

```
✔ Do you want to log in to your Apple account? … yes
```

**Resposta:** Já está selecionado `yes`. Pressione Enter.

---

### Pergunta 3: Login com Apple

Você verá:

```
› Log in to your Apple Developer account to continue
```

**O que fazer:**
1. Uma janela do navegador vai abrir
2. Digite seu **email Apple**
3. Digite sua **senha Apple**
4. Se tiver 2FA, complete a autenticação
5. Autorize o acesso

---

## 🎯 Passo 5: Deixar o EAS Gerar Credenciais

Depois do login, o EAS vai perguntar:

```
? Do you want to create a new provisioning profile?
```

**Resposta:** Selecione `yes` e pressione Enter.

O EAS vai gerar automaticamente:
- ✅ Certificado de distribuição
- ✅ Perfil de provisionamento
- ✅ Tudo que precisa para build

---

## ✅ Resultado Esperado

Quando terminar, você verá:

```
✔ Credentials configured successfully
```

---

## 📱 Próximo Passo

Depois que as credenciais estiverem configuradas, você pode rodar o build:

```bash
EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 eas build --platform ios --profile preview
```

---

## ❓ Perguntas Frequentes

### P: Preciso de senha da Apple?
**R:** Sim, a senha da sua conta Apple Developer.

### P: O que é 2FA?
**R:** Autenticação de dois fatores. Se sua conta tem, você vai receber um código no seu iPhone.

### P: Minha conta Apple Developer expirou?
**R:** Você precisa renovar em https://developer.apple.com

### P: Posso usar qualquer conta Apple?
**R:** Não, precisa ser uma conta Apple Developer ($99/ano).

---

## 🚨 Erros Comuns

### Erro: "Invalid credentials"
- Verifique se digitou email/senha corretos
- Tente novamente

### Erro: "Account not found"
- Verifique se tem conta Apple Developer ativa
- Acesse https://developer.apple.com para verificar

### Erro: "2FA required"
- Autorize no seu iPhone
- Volte para o terminal e tente novamente

---

## 🎓 Resumo

1. ✅ Abra terminal
2. ✅ Navegue para pasta do projeto
3. ✅ Execute: `EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 npx eas credentials --platform ios`
4. ✅ Selecione `preview`
5. ✅ Faça login com Apple
6. ✅ Deixe o EAS gerar credenciais
7. ✅ Pronto! Credenciais configuradas

---

## 📞 Precisa de Ajuda?

- **Apple Developer Support**: https://developer.apple.com/support
- **Expo Docs**: https://docs.expo.dev/build-reference/ios-builds/
- **EAS Credentials**: https://docs.expo.dev/app-signing/managed-credentials/

---

**Quando terminar, me avise para eu rodar o build! 🚀**

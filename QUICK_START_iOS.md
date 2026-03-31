# Quick Start: Publicar Finance Manager no iOS

## ⚡ Resumo Rápido

Siga estes 3 passos para publicar seu app no iOS:

### 1️⃣ Login no EAS

```bash
cd /home/ubuntu/finance-app
eas login
```

Digite seu email/username do Expo e senha.

### 2️⃣ Configurar Credenciais iOS

```bash
eas credentials
```

- Selecione: **iOS**
- Selecione: **preview** (para testes) ou **production** (para App Store)
- Siga as instruções na tela

**Você precisará de:**
- Apple Team ID (encontre em https://developer.apple.com/account)
- Ou deixar o EAS gerar automaticamente

### 3️⃣ Gerar Build iOS

```bash
eas build --platform ios --profile preview
```

Isso vai:
- Compilar seu app no servidor da Expo
- Gerar um arquivo `.ipa` (iOS app)
- Enviar para TestFlight automaticamente

⏱️ **Tempo**: 10-20 minutos

## ✅ Depois do Build

Quando terminar, você receberá:
- ✅ Link para TestFlight
- ✅ QR code para instalar no iPhone
- ✅ Link para monitorar o build em tempo real

## 📱 Testar no iPhone

1. Abra o link do TestFlight no seu iPhone
2. Toque em "Instalar"
3. Abra o app e teste todas as funcionalidades

## 🚀 Publicar na App Store

Quando estiver pronto:

```bash
eas submit --platform ios --profile production
```

Isso vai enviar para revisão na App Store.

## ❓ Precisa de Ajuda?

- **Documentação completa**: Veja `iOS_BUILD_GUIDE.md`
- **Status do build**: https://expo.dev/builds
- **Suporte Expo**: https://docs.expo.dev/build/setup

## 📋 Checklist Antes de Publicar

- [ ] Testou o app no Expo Go
- [ ] Testou todas as telas (Dashboard, Transações, Metas, Investimentos)
- [ ] Verificou os dados persistem corretamente
- [ ] Testou modo escuro/claro
- [ ] Tem conta Apple Developer ativa
- [ ] Tem Apple Team ID

---

**Dica**: Se tiver dúvidas durante o processo, o EAS vai guiar você passo a passo! 🎯

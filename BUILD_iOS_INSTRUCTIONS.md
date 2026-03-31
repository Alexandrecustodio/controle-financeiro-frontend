# 🚀 Como Publicar Finance Manager no iOS

## Pré-requisitos

1. **Conta Expo** - https://expo.dev
2. **Conta Apple Developer** - https://developer.apple.com (necessária para App Store)
3. **EAS CLI instalado** - Já está no projeto

## ⚡ Passos Rápidos

### 1. Fazer Login no Expo

```bash
eas login
```

**Importante**: Use o mesmo email/username que você usará para criar o projeto no Expo.

### 2. Criar Projeto no Expo (Primeira Vez)

Se você ainda não tem um projeto no Expo, execute:

```bash
eas init
```

Isso vai:
- Criar um novo projeto no Expo
- Gerar um `projectId` único
- Atualizar `.easrc.json`

**Responda as perguntas:**
- Project name: `finance-app`
- Auto-generate credentials: `yes`

### 3. Configurar Credenciais Apple

```bash
eas credentials
```

Siga as instruções:
- Selecione: **iOS**
- Selecione: **preview** (para TestFlight) ou **production** (para App Store)
- Deixe o EAS gerar automaticamente (mais fácil)

### 4. Gerar Build iOS

```bash
EAS_BUILD_NO_EXPO_GO_WARNING=true eas build --platform ios --profile preview
```

**Tempo esperado**: 10-20 minutos

### 5. Monitorar Build

Você receberá um link para acompanhar o progresso em tempo real:
- https://expo.dev/builds

## 📱 Testar no iPhone

Quando o build terminar:

1. Abra o link do TestFlight no seu iPhone
2. Toque em "Instalar"
3. Teste todas as funcionalidades

## 🎯 Para Publicar na App Store

Quando estiver pronto para publicação oficial:

```bash
EAS_BUILD_NO_EXPO_GO_WARNING=true eas build --platform ios --profile production
```

Depois:

```bash
eas submit --platform ios
```

## 🔧 Troubleshooting

### "Project does not exist"

**Solução**: Execute `eas init` para criar o projeto no Expo

```bash
eas init
```

### "Apple credentials not found"

**Solução**: Configure credenciais

```bash
eas credentials
```

### "Invalid provisioning profile"

**Solução**: Regenere credenciais

```bash
eas credentials --reset
eas credentials
```

### Build falha com erro de certificado

**Solução**: Verifique sua conta Apple Developer

1. Acesse https://developer.apple.com
2. Verifique se sua conta está ativa
3. Verifique se tem permissão para criar apps
4. Regenere credenciais: `eas credentials --reset`

## 📋 Checklist Antes de Publicar

- [ ] Testou o app no Expo Go
- [ ] Testou todas as 5 abas (Dashboard, Transações, Metas, Investimentos, Configurações)
- [ ] Verificou se os dados persistem corretamente
- [ ] Testou modo escuro/claro
- [ ] Tem conta Expo ativa
- [ ] Tem conta Apple Developer ativa
- [ ] Tem Apple Team ID

## 📚 Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| `app.json` | Configuração básica do Expo |
| `app.config.ts` | Configuração avançada (TypeScript) |
| `eas.json` | Perfis de build (development, preview, production) |
| `.easrc.json` | Project ID do Expo |

## 🎓 Próximas Etapas

1. ✅ Execute `eas login`
2. ✅ Execute `eas init`
3. ✅ Execute `eas credentials`
4. ✅ Execute `eas build --platform ios --profile preview`
5. ✅ Teste no iPhone
6. ✅ Execute `eas build --platform ios --profile production`
7. ✅ Execute `eas submit --platform ios`

## 💡 Dicas

- **Primeiro build é mais lento** (20-30 min) - Builds subsequentes são mais rápidos (10-15 min)
- **Mantenha credenciais seguras** - Nunca commit `.easrc.json` ou credenciais em git
- **Use preview primeiro** - Sempre teste em TestFlight antes de publicar na App Store
- **Monitore o build** - Abra o link do Expo para ver o progresso em tempo real

## 🆘 Precisa de Ajuda?

- **Documentação Expo**: https://docs.expo.dev/build/introduction/
- **EAS Build Guide**: https://docs.expo.dev/build-reference/ios-builds/
- **App Store Submission**: https://docs.expo.dev/submit/ios/

---

**Seu app está pronto para publicar! 🎉**

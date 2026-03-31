# 🎯 Solução Final: Publicar Finance Manager no iOS

## ⚠️ Problema Identificado

O erro "Project does not exist: @alexandrecust/finance-app" ocorre quando você tenta rodar `eas init` em modo não-interativo (sem poder responder perguntas).

## ✅ Solução Rápida

### Opção 1: Usar o Script (RECOMENDADO)

```bash
cd /home/ubuntu/finance-app
chmod +x eas-build.sh
./eas-build.sh
```

Este script:
- ✅ Verifica se você está logado no Expo
- ✅ Cria `.easrc.json` se necessário
- ✅ Executa o build sem erros
- ✅ Mostra o status em tempo real

### Opção 2: Comandos Manuais (Se o script não funcionar)

```bash
# 1. Login no Expo
eas login

# 2. Criar projeto no Expo (INTERATIVO - responda as perguntas)
eas init

# 3. Configurar credenciais Apple
eas credentials

# 4. Gerar iOS build
EAS_BUILD_NO_EXPO_GO_WARNING=true eas build --platform ios --profile preview
```

## 🔑 Pontos Importantes

| Passo | Ação | Notas |
|-------|------|-------|
| `eas login` | Login com email/senha Expo | Necessário para autenticação |
| `eas init` | Criar projeto no Expo | **DEVE SER INTERATIVO** (responda as perguntas) |
| `eas credentials` | Configurar credenciais Apple | Deixe o EAS gerar automaticamente |
| `eas build` | Gerar iOS build | Use `--non-interactive` após configurar tudo |

## 🚨 Por Que Dá Erro?

O erro ocorre quando você tenta rodar `eas init` em modo não-interativo:

```bash
# ❌ ERRADO - Modo não-interativo
eas init --non-interactive

# ✅ CORRETO - Modo interativo (responda as perguntas)
eas init
```

## 📱 Fluxo Correto

```
1. eas login
   ↓
2. eas init (RESPONDA AS PERGUNTAS)
   ↓
3. eas credentials
   ↓
4. eas build --platform ios --profile preview
   ↓
5. Aguarde 10-20 minutos
   ↓
6. Receba link do TestFlight
```

## 🎯 Usando o Script

O arquivo `eas-build.sh` automatiza tudo:

```bash
./eas-build.sh
```

**O que o script faz:**
1. Verifica se você está logado (`eas whoami`)
2. Cria `.easrc.json` com projectId único
3. Executa build com as flags corretas
4. Mostra mensagens de progresso

## 📋 Checklist Antes de Rodar

- [ ] Executou `eas login`
- [ ] Executou `eas init` (respondendo as perguntas)
- [ ] Executou `eas credentials`
- [ ] Tem conta Apple Developer ativa
- [ ] Tem Apple Team ID

## 🆘 Se Ainda Tiver Erro

### Erro: "Not authenticated"
```bash
eas logout
eas login
```

### Erro: "Project does not exist"
```bash
# Certifique-se de ter rodado eas init INTERATIVO
eas init
```

### Erro: "Apple credentials not found"
```bash
eas credentials
```

### Erro: "Invalid provisioning profile"
```bash
eas credentials --reset
eas credentials
```

## 📚 Arquivos do Projeto

| Arquivo | Propósito |
|---------|-----------|
| `app.json` | Configuração Expo básica |
| `app.config.ts` | Configuração avançada |
| `eas.json` | Perfis de build |
| `.easrc.json` | Project ID (gerado automaticamente) |
| `eas-build.sh` | Script de build automático |

## 🎓 Próximas Etapas

1. ✅ Execute `eas login`
2. ✅ Execute `eas init` (responda as perguntas)
3. ✅ Execute `eas credentials`
4. ✅ Execute `./eas-build.sh` ou `eas build --platform ios --profile preview`
5. ✅ Aguarde o build terminar
6. ✅ Receba link do TestFlight
7. ✅ Teste no iPhone
8. ✅ Publique na App Store quando estiver pronto

## 💡 Dicas Finais

- **Use o script** - `./eas-build.sh` é mais fácil
- **Seja paciente** - Primeiro build leva 20-30 minutos
- **Monitore o build** - Acesse https://expo.dev/builds
- **Teste no TestFlight** - Sempre teste antes de publicar
- **Mantenha credenciais seguras** - Nunca commit `.easrc.json` em git

---

**Seu app está pronto para publicar! 🎉**

Se tiver dúvidas, consulte:
- https://docs.expo.dev/build/introduction/
- https://docs.expo.dev/build-reference/ios-builds/

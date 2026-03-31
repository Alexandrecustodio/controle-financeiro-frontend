# 🪟 Guia Windows: Publicar Finance Manager no iOS

## 📋 Pré-requisitos

1. **Node.js instalado** - https://nodejs.org (versão 16+)
2. **Projeto baixado** no seu computador
3. **Conta Apple Developer** ativa

---

## 🎯 Passo 1: Abrir a Pasta do Projeto

1. Abra o **File Explorer** (Explorador de Arquivos)
2. Navegue até a pasta `finance-app`
3. Você deve ver arquivos como `app.config.ts`, `package.json`, etc.

---

## 🎯 Passo 2: Abrir PowerShell na Pasta

1. Na pasta do projeto, clique na barra de endereço
2. Digite `powershell` e pressione Enter
3. PowerShell vai abrir naquela pasta

---

## 🎯 Passo 3: Executar Script de Credenciais

Cole este comando:

```powershell
.\setup-credentials.bat
```

Pressione Enter.

**O que vai acontecer:**
- Script vai verificar se está na pasta certa
- Vai executar `npx eas credentials --platform ios`
- Você vai ver perguntas no terminal
- Selecione `preview`
- Uma janela do navegador vai abrir
- Faça login com sua conta Apple Developer
- Deixe o EAS gerar as credenciais

**Quando terminar, você verá:**
```
Sucesso! Credenciais configuradas!
```

---

## 🎯 Passo 4: Executar Script de Build

Depois que as credenciais estiverem prontas, execute:

```powershell
.\setup-build.bat
```

Pressione Enter.

**O que vai acontecer:**
- Build vai começar
- Vai levar 10-20 minutos
- Você receberá um link para acompanhar
- Depois um link do TestFlight para testar no iPhone

---

## 📋 Resumo dos Passos

| Passo | Comando | O Que Faz |
|-------|---------|----------|
| 1 | `.\setup-credentials.bat` | Configura credenciais Apple (primeira vez) |
| 2 | `.\setup-build.bat` | Gera build iOS para TestFlight |
| 3 | Abre link do TestFlight | Testa no iPhone |

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] Projeto baixado na pasta `finance-app`
- [ ] Abri PowerShell na pasta do projeto
- [ ] Executei `.\setup-credentials.bat`
- [ ] Fiz login com Apple Developer
- [ ] Executei `.\setup-build.bat`
- [ ] Recebi link do TestFlight

---

## 🚨 Erros Comuns

### Erro: "O arquivo setup-credentials.bat não pode ser encontrado"

**Solução:**
- Certifique-se de que está na pasta `finance-app`
- Verifique se o arquivo `setup-credentials.bat` existe na pasta
- Tente abrir PowerShell como Administrador

### Erro: "Não foi possível encontrar o comando npx"

**Solução:**
- Node.js não está instalado
- Instale em https://nodejs.org
- Reinicie PowerShell depois de instalar

### Erro: "Credenciais inválidas"

**Solução:**
- Verifique email/senha da Apple Developer
- Certifique-se de que a conta está ativa
- Tente novamente

---

## 💡 Dicas

1. **Deixe o PowerShell aberto** enquanto o build está rodando
2. **Não feche a janela** durante o build
3. **Monitore o progresso** em https://expo.dev/builds
4. **Teste no TestFlight** antes de publicar na App Store

---

## 📱 Próximas Etapas

1. ✅ Executar `.\setup-credentials.bat`
2. ✅ Executar `.\setup-build.bat`
3. ✅ Receber link do TestFlight
4. ✅ Testar no iPhone
5. ✅ Publicar na App Store (opcional)

---

**Pronto! Seu app vai estar no TestFlight em 20 minutos! 🚀**

# 🚀 Deploy Railway + Vercel - Guia Completo

Este guia mostra como fazer deploy profissional do Finance Manager usando Railway (backend) + Vercel (frontend).

---

## 📊 Arquitetura Final

```
┌─────────────────────────────────────────────────────────────┐
│                    Seu Aplicativo                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend (Vercel)          Backend (Railway)              │
│  https://seu-app.vercel.app https://seu-api.railway.app   │
│  ├─ React Native            ├─ Node.js + Express          │
│  ├─ Expo Router             ├─ tRPC API                   │
│  ├─ NativeWind              ├─ Drizzle ORM                │
│  └─ TypeScript              └─ PostgreSQL                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Passo 1: Preparar Railway (Backend)

### 1.1 Criar Conta Railway

1. Acesse https://railway.app
2. Clique **"Start New Project"**
3. Faça login com GitHub (recomendado)

### 1.2 Criar Projeto Backend

1. No painel Railway, clique **"New Project"**
2. Selecione **"Deploy from GitHub"**
3. Autorize Railway a acessar seu GitHub
4. Selecione o repositório: **`controle-financeiro-backend`**
5. Clique **"Deploy"**

### 1.3 Adicionar PostgreSQL

1. No painel do projeto, clique **"+ New"**
2. Selecione **"Database"** → **"PostgreSQL"**
3. Railway cria automaticamente o banco
4. Copie a `DATABASE_URL` (você vai usar depois)

### 1.4 Configurar Variáveis de Ambiente

1. Clique na aba **"Variables"**
2. Adicione estas variáveis:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=seu_secret_aqui_gere_com_openssl_rand_hex_32
SESSION_SECRET=seu_secret_aqui_gere_com_openssl_rand_hex_32
EXPO_PUBLIC_API_URL=https://seu-app.railway.app/api
```

### 1.5 Gerar Secrets Seguros

```bash
# No seu terminal, execute:
openssl rand -hex 32  # Copie e cole em JWT_SECRET
openssl rand -hex 32  # Copie e cole em SESSION_SECRET
```

### 1.6 Monitorar Deploy

1. Vá para a aba **"Deployments"**
2. Espere o build terminar (leva 5-10 minutos)
3. Quando terminar, você verá um link como:
   ```
   https://seu-app.railway.app
   ```

**Teste a API:**
```bash
curl https://seu-app.railway.app/api/health
```

---

## 🎯 Passo 2: Preparar Vercel (Frontend)

### 2.1 Criar Conta Vercel

1. Acesse https://vercel.com
2. Clique **"Sign Up"**
3. Faça login com GitHub (recomendado)

### 2.2 Importar Projeto Frontend

1. No painel Vercel, clique **"Add New..."** → **"Project"**
2. Selecione **"Import Git Repository"**
3. Procure por: **`controle-financeiro-frontend`**
4. Clique **"Import"**

### 2.3 Configurar Variáveis de Ambiente

1. Na tela de configuração, vá para **"Environment Variables"**
2. Adicione:

```
EXPO_PUBLIC_API_URL=https://seu-app.railway.app/api
```

(Substitua `seu-app` pelo nome do seu projeto no Railway)

### 2.4 Deploy

1. Clique **"Deploy"**
2. Espere terminar (leva 2-5 minutos)
3. Você receberá um link como:
   ```
   https://seu-app.vercel.app
   ```

---

## ✅ Verificar Se Está Funcionando

### 3.1 Testar Backend

```bash
# Teste a API
curl https://seu-app.railway.app/api/health

# Deve retornar algo como:
# {"status":"ok"}
```

### 3.2 Testar Frontend

1. Abra https://seu-app.vercel.app no navegador
2. Você deve ver o app carregando
3. Se houver erro, verifique o console do navegador (F12)

### 3.3 Testar Conexão

1. No app, tente adicionar uma transação
2. Verifique se os dados aparecem no dashboard
3. Se funcionar, está tudo conectado! ✅

---

## 🔄 Passo 3: Deploy Automático

### 3.1 GitHub Actions (Opcional)

O arquivo `.github/workflows/deploy.yml` já está configurado. Ele:
- Roda testes a cada push
- Faz build automaticamente
- Deploy automático para Railway

### 3.2 Verificar Status

1. Vá para seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Veja o status dos workflows

---

## 🔐 Passo 4: Segurança

### 4.1 Secrets Seguros

✅ **Já feito:** Variáveis de ambiente configuradas no Railway/Vercel

### 4.2 HTTPS

✅ **Automático:** Railway e Vercel fornecem HTTPS gratuitamente

### 4.3 CORS

O backend já está configurado para aceitar requisições do frontend.

---

## 📱 Passo 5: Acessar no Celular

### 5.1 Opção A: Web (Mais Fácil)

1. Abra o navegador do celular
2. Digite: `https://seu-app.vercel.app`
3. Pronto! O app roda no celular

### 5.2 Opção B: Expo Go (Se Quiser Testar Desenvolvimento)

1. Instale Expo Go
2. Clone o repositório localmente
3. Execute: `npm run dev`
4. Escaneie o QR code

---

## 📊 Monitorar Aplicação

### 6.1 Railway Dashboard

1. Acesse https://railway.app/dashboard
2. Veja:
   - Status do servidor
   - Uso de CPU/Memória
   - Logs em tempo real
   - Histórico de deployments

### 6.2 Vercel Dashboard

1. Acesse https://vercel.com/dashboard
2. Veja:
   - Status do deploy
   - Tempo de build
   - Analytics
   - Logs

---

## 🆘 Troubleshooting

### "Erro de conexão entre frontend e backend"

**Solução:**
1. Verifique se `EXPO_PUBLIC_API_URL` está correto no Vercel
2. Teste a API com curl:
   ```bash
   curl https://seu-app.railway.app/api/health
   ```
3. Verifique os logs no Railway

### "Banco de dados não conecta"

**Solução:**
1. Verifique `DATABASE_URL` no Railway
2. Rode migrations:
   ```bash
   npm run db:push
   ```
3. Verifique os logs

### "App não carrega no Vercel"

**Solução:**
1. Abra o console do navegador (F12)
2. Veja as mensagens de erro
3. Verifique os logs no Vercel

### "Erro 502 Bad Gateway"

**Solução:**
1. Railway pode estar reiniciando
2. Aguarde 5 minutos
3. Se persistir, verifique os logs no Railway

---

## 📋 Checklist Final

- [ ] Conta Railway criada
- [ ] Backend deployado no Railway
- [ ] PostgreSQL criado no Railway
- [ ] Variáveis de ambiente configuradas (Railway)
- [ ] Conta Vercel criada
- [ ] Frontend deployado no Vercel
- [ ] Variáveis de ambiente configuradas (Vercel)
- [ ] API respondendo em produção
- [ ] Frontend acessível via web
- [ ] Conexão frontend ↔ backend funcionando
- [ ] Testes básicos passando

---

## 🎉 Próximos Passos

1. **Monitorar:** Acompanhe os logs no Railway e Vercel
2. **Escalar:** Se precisar de mais recursos, aumente no Railway
3. **Adicionar funcionalidades:** Faça push no GitHub, deploy automático!
4. **Publicar:** Quando estiver pronto, publique na App Store/Play Store

---

## 📚 Documentação

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [tRPC Docs](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)

---

**Seu app está pronto para produção! 🚀**

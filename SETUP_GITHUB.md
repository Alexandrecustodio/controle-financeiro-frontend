# 🚀 Setup Completo para GitHub

Este guia mostra como preparar o Finance Manager para hospedar no GitHub e fazer deploy.

---

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado
- Node.js 18+
- Docker (opcional, para desenvolvimento)

---

## 🎯 Passo 1: Preparar Repositório Local

### 1.1 Inicializar Git

```bash
cd /caminho/do/projeto/finance-app

# Inicialize git
git init

# Adicione todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit: Finance Manager app"
```

### 1.2 Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `finance-manager`
3. Descrição: "App de gestão financeira com React Native e Node.js"
4. Escolha **Public** ou **Private**
5. Clique **Create repository**

### 1.3 Conectar ao GitHub

```bash
# Adicione o remote (substitua seu-usuario)
git remote add origin https://github.com/seu-usuario/finance-manager.git

# Renomeie branch para main (se necessário)
git branch -M main

# Faça push
git push -u origin main
```

---

## 🗄️ Passo 2: Configurar Banco de Dados

### 2.1 Opção A: PostgreSQL Local (Desenvolvimento)

```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Baixe em https://www.postgresql.org/download/windows/
```

### 2.2 Criar Banco de Dados

```bash
# Crie o banco
createdb finance_manager

# Verifique
psql -l | grep finance_manager
```

### 2.3 Configurar Variáveis de Ambiente

```bash
# Crie .env.local
cp .env.example .env.local

# Edite com suas credenciais
nano .env.local
```

**Conteúdo de .env.local:**

```env
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/finance_manager
NODE_ENV=development
PORT=3000
EXPO_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=seu_secret_aqui
SESSION_SECRET=seu_secret_aqui
```

---

## 🐳 Passo 3: Usar Docker (Opcional)

### 3.1 Com Docker Compose

```bash
# Inicie PostgreSQL + App
docker-compose up

# Em outro terminal, rode migrations
docker exec finance_manager_app npm run db:push
```

### 3.2 Sem Docker

```bash
# Instale dependências
npm install

# Rode migrations
npm run db:push

# Inicie servidor
npm run dev
```

---

## 🔧 Passo 4: Rodar Localmente

### 4.1 Terminal 1: Backend

```bash
npm run dev:server

# Ou com npm
npm run dev
```

Você verá:
```
Server running on http://localhost:3000
```

### 4.2 Terminal 2: Frontend

```bash
npm run dev:metro

# Ou com npm
npm run dev
```

Você verá um QR code. Escaneie com Expo Go no celular.

---

## 📁 Estrutura de Arquivos

Verifique se todos os arquivos estão no repositório:

```
finance-manager/
├── app/                          # Frontend
├── server/                       # Backend
├── drizzle/                      # Database schema
├── lib/                          # Utilitários
├── components/                   # Componentes
├── hooks/                        # Hooks
├── package.json
├── app.config.ts
├── tsconfig.json
├── tailwind.config.js
├── theme.config.js
├── Dockerfile                    # Para deploy
├── docker-compose.yml            # Para desenvolvimento
├── .env.example                  # Template de env
├── .gitignore                    # Arquivos a ignorar
├── .github/workflows/deploy.yml  # CI/CD
├── README_GITHUB.md              # Documentação
├── GITHUB_DEPLOYMENT.md          # Guia de deploy
└── SETUP_GITHUB.md              # Este arquivo
```

---

## 🔐 Passo 5: Configurar Secrets no GitHub

### 5.1 Adicionar Secrets

1. Acesse seu repositório no GitHub
2. Vá para **Settings → Secrets and variables → Actions**
3. Clique **New repository secret**
4. Adicione:

| Nome | Valor |
|------|-------|
| `RAILWAY_TOKEN` | Token do Railway |
| `DATABASE_URL` | URL do banco em produção |
| `JWT_SECRET` | Secret seguro (gere com `openssl rand -hex 32`) |
| `SESSION_SECRET` | Secret seguro (gere com `openssl rand -hex 32`) |

### 5.2 Gerar Secrets Seguros

```bash
# Gere secrets
openssl rand -hex 32  # JWT_SECRET
openssl rand -hex 32  # SESSION_SECRET
```

---

## 🚀 Passo 6: Configurar CI/CD

### 6.1 GitHub Actions

O arquivo `.github/workflows/deploy.yml` já está configurado. Ele:
- Roda testes a cada push
- Faz build
- Deploy automático para Railway (branch main)

### 6.2 Verificar Status

1. Vá para **Actions** no seu repositório
2. Veja o status dos workflows
3. Clique em um workflow para ver detalhes

---

## 🌐 Passo 7: Deploy em Produção

### 7.1 Railway (Recomendado)

1. Acesse https://railway.app
2. Clique **New Project**
3. Selecione **Deploy from GitHub**
4. Autorize Railway
5. Selecione seu repositório
6. Configure variáveis de ambiente
7. Deploy automático ativado!

### 7.2 Alternativas

- **Heroku:** https://www.heroku.com
- **Render:** https://render.com
- **Vercel:** https://vercel.com (frontend)
- **AWS:** https://aws.amazon.com

---

## 📝 Passo 8: Documentação

### 8.1 Atualizar README

Edite `README_GITHUB.md` com:
- Descrição do projeto
- Como instalar
- Como usar
- Como contribuir

### 8.2 Adicionar Badges

```markdown
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue)](https://reactnative.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
```

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Git configurado localmente
- [ ] `.env.local` criado
- [ ] PostgreSQL rodando
- [ ] `npm install` executado
- [ ] `npm run db:push` executado
- [ ] `npm run dev` funcionando
- [ ] Frontend acessível via Expo Go
- [ ] Backend respondendo em http://localhost:3000
- [ ] Secrets configurados no GitHub
- [ ] CI/CD workflow ativado
- [ ] Deploy configurado (Railway/Heroku/etc)
- [ ] README atualizado
- [ ] `.gitignore` configurado

---

## 🆘 Troubleshooting

### "PostgreSQL connection refused"
```bash
# Verifique se está rodando
pg_isready

# Inicie se necessário
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

### "npm install fails"
```bash
# Limpe cache
npm cache clean --force

# Reinstale
rm -rf node_modules
npm install
```

### "Database migration fails"
```bash
# Verifique DATABASE_URL
echo $DATABASE_URL

# Rode migrations novamente
npm run db:push
```

### "Port 3000 already in use"
```bash
# Mude a porta em .env.local
PORT=3001

# Ou mate o processo
lsof -i :3000
kill -9 <PID>
```

---

## 📚 Próximas Etapas

1. ✅ Teste o app localmente
2. ✅ Faça push para GitHub
3. ✅ Configure deploy automático
4. ✅ Monitore logs em produção
5. ✅ Adicione mais funcionalidades
6. ✅ Convide colaboradores

---

## 📖 Documentação Completa

- [README_GITHUB.md](./README_GITHUB.md) - Visão geral do projeto
- [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) - Guia de deploy detalhado
- [server/README.md](./server/README.md) - Documentação do backend
- [Expo Docs](https://docs.expo.dev) - Documentação do Expo
- [tRPC Docs](https://trpc.io) - Documentação do tRPC

---

**Seu app está pronto para GitHub! 🎉**

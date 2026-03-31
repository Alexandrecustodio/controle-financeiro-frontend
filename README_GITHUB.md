# 💰 Finance Manager

Um aplicativo completo de gestão financeira pessoal com **React Native** (frontend), **Node.js + Express** (backend) e **PostgreSQL** (banco de dados).

**Funcionalidades:**
- 📊 Dashboard com resumo financeiro
- 💳 Gerenciar transações (renda/despesa)
- 🎯 Definir e acompanhar metas
- 📈 Rastrear investimentos
- ⚙️ Configurações personalizáveis
- 🔄 Sincronização em tempo real com backend

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou pnpm

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/finance-manager.git
cd finance-manager

# Instale dependências
npm install

# Configure banco de dados
createdb finance_manager

# Configure variáveis de ambiente
cp .env.example .env.local

# Rode migrations
npm run db:push

# Inicie o servidor
npm run dev
```

### Acessar o App

- **Frontend (Expo Go):** Escaneie o QR code
- **Backend API:** http://localhost:3000/api
- **Banco de dados:** PostgreSQL em localhost:5432

---

## 📁 Estrutura do Projeto

```
finance-manager/
├── app/                    # Frontend React Native
│   ├── (tabs)/            # Telas principais (tabs)
│   │   ├── index.tsx      # Dashboard
│   │   ├── transactions.tsx
│   │   ├── goals.tsx
│   │   ├── investments.tsx
│   │   └── settings.tsx
│   ├── _layout.tsx        # Root layout com providers
│   └── ...
├── server/                # Backend Node.js + tRPC
│   ├── _core/            # Framework-level code
│   ├── db.ts             # Database queries
│   ├── routers.ts        # tRPC API routes
│   └── README.md         # Backend docs
├── drizzle/              # Database schema
│   ├── schema.ts         # Tabelas do banco
│   └── migrations/       # Migrations automáticas
├── lib/                  # Utilitários
│   ├── trpc.ts          # tRPC client
│   ├── types.ts         # TypeScript types
│   └── ...
├── components/          # Componentes reutilizáveis
├── hooks/              # React hooks customizados
├── package.json
├── app.config.ts       # Configuração Expo
└── GITHUB_DEPLOYMENT.md # Guia de deploy
```

---

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia Metro + Server
npm run dev:metro       # Apenas frontend
npm run dev:server      # Apenas backend

# Banco de dados
npm run db:push         # Cria/atualiza schema
npm run db:studio       # Abre Drizzle Studio

# Build & Deploy
npm run build           # Build para produção
npm start               # Inicia servidor em produção

# Testes
npm run test            # Roda testes
npm run lint            # Lint do código
```

---

## 📱 Frontend (React Native)

### Tecnologias

- **React Native 0.81** - Framework mobile
- **Expo 54** - Toolchain
- **Expo Router 6** - Navegação
- **NativeWind 4** - Tailwind CSS
- **React Query** - State management

### Estrutura de Telas

| Tela | Descrição |
|------|-----------|
| Dashboard | Resumo financeiro mensal |
| Transações | Lista de renda/despesa |
| Metas | Acompanhamento de objetivos |
| Investimentos | Rastreamento de investimentos |
| Configurações | Preferências do app |

### Adicionar Nova Tela

```tsx
// app/(tabs)/nova-tela.tsx
import { ScreenContainer } from "@/components/screen-container";
import { Text, View } from "react-native";

export default function NovaTelaScreen() {
  return (
    <ScreenContainer className="p-4">
      <Text className="text-2xl font-bold text-foreground">
        Minha Nova Tela
      </Text>
    </ScreenContainer>
  );
}
```

---

## 🔌 Backend (Node.js + tRPC)

### Tecnologias

- **Node.js + Express** - Server
- **tRPC** - Type-safe API
- **Drizzle ORM** - Database
- **PostgreSQL** - Banco de dados
- **Zod** - Validação

### Adicionar Nova Rota API

```tsx
// server/routers.ts
import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";

export const appRouter = router({
  transactions: router({
    list: protectedProcedure.query(({ ctx }) => {
      // ctx.user contém dados do usuário autenticado
      return db.getUserTransactions(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        description: z.string(),
        amount: z.number(),
        type: z.enum(["income", "expense"]),
      }))
      .mutation(({ ctx, input }) => {
        return db.createTransaction({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),
});
```

### Usar API no Frontend

```tsx
import { trpc } from "@/lib/trpc";

function TransactionList() {
  const { data: transactions } = trpc.transactions.list.useQuery();
  
  const createMutation = trpc.transactions.create.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <View>
      {/* Renderizar transações */}
    </View>
  );
}
```

---

## 🗄️ Banco de Dados

### Schema

```tsx
// drizzle/schema.ts
import { pgTable, serial, varchar, numeric, timestamp } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: serial("userId").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 10 }).notNull(), // "income" ou "expense"
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

### Migrations

```bash
# Após editar schema.ts
npm run db:push

# Ver status
npm run db:studio
```

---

## 🔐 Autenticação

O app usa **Manus OAuth** para autenticação. Usuários fazem login uma vez e recebem um token.

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyScreen() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return <View>{/* Conteúdo protegido */}</View>;
}
```

---

## 🚀 Deploy

### Railway (Recomendado)

1. Acesse https://railway.app
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente
4. Deploy automático em cada push

**Veja [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) para instruções completas.**

### Alternativas

- Heroku
- Render
- Vercel (frontend)
- AWS (backend)

---

## 📊 Monitoramento

```bash
# Ver logs
railway logs

# Monitorar performance
npm run dev

# Testar API
curl http://localhost:3000/api/trpc/transactions.list
```

---

## 🧪 Testes

```bash
# Rodar testes
npm run test

# Testes com coverage
npm run test -- --coverage

# Watch mode
npm run test -- --watch
```

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

## 📚 Documentação

- [Backend Guide](./server/README.md)
- [GitHub Deployment](./GITHUB_DEPLOYMENT.md)
- [React Native Docs](https://reactnative.dev)
- [tRPC Docs](https://trpc.io)
- [Expo Docs](https://docs.expo.dev)

---

## 🆘 Suporte

- Abra uma [Issue](https://github.com/seu-usuario/finance-manager/issues)
- Consulte a [Documentação](./GITHUB_DEPLOYMENT.md)
- Veja [Troubleshooting](./GITHUB_DEPLOYMENT.md#troubleshooting)

---

**Desenvolvido com ❤️ usando React Native, Node.js e PostgreSQL**

# 🎯 Funcionalidade de Parcelamento de Despesas

## Visão Geral

A funcionalidade de parcelamento permite que os usuários dividam uma despesa em múltiplas parcelas que serão distribuídas nos próximos meses.

**Exemplo:**
- Usuário adiciona uma despesa de **R$ 1.000**
- Seleciona **3 parcelas**
- O sistema cria 3 transações:
  - Parcela 1: R$ 334 (mês atual)
  - Parcela 2: R$ 333 (próximo mês)
  - Parcela 3: R$ 333 (mês seguinte)

---

## 📋 Arquivos Modificados

### 1. `lib/types.ts`
Adicionados campos ao `Transaction`:
```typescript
interface Transaction {
  // ... campos existentes
  isInstallment?: boolean;              // Indica se é uma parcela
  installmentCount?: number;            // Total de parcelas
  installmentNumber?: number;           // Número da parcela atual (1, 2, 3...)
  installmentGroupId?: string;          // ID para agrupar parcelas relacionadas
  originalAmount?: number;              // Valor original antes da divisão
}
```

### 2. `lib/installment-utils.ts` (NOVO)
Funções utilitárias para cálculo de parcelas:
- `generateInstallmentGroupId()` - Gera ID único para grupo
- `calculateInstallmentAmount()` - Calcula valor de cada parcela
- `generateInstallments()` - Cria todas as parcelas
- `getRelatedInstallments()` - Busca parcelas do mesmo grupo
- `validateInstallmentParams()` - Valida parâmetros
- `formatInstallmentText()` - Formata texto "1/3"

### 3. `app/add-transaction.tsx`
Atualizada com:
- Toggle para ativar/desativar parcelamento
- Seletor de número de parcelas (1-60)
- Preview do valor de cada parcela
- Distribuição automática nos próximos meses

### 4. `lib/finance-context.tsx`
Adicionados métodos:
- `deleteInstallmentGroup(groupId)` - Deleta todas as parcelas de um grupo
- `getInstallmentGroup(groupId)` - Busca todas as parcelas de um grupo

---

## 🎨 Interface do Usuário

### Tela de Adicionar Transação

```
┌─────────────────────────────────────────┐
│ Adicionar Transação                  ✕  │
├─────────────────────────────────────────┤
│                                         │
│ Tipo                                    │
│ [Renda] [Despesa] [Transferência]      │
│                                         │
│ Valor                                   │
│ R$ [1000.00________________]            │
│                                         │
│ Data                                    │
│ [01/04/2026________________]            │
│                                         │
│ Descrição (Opcional)                    │
│ [Compra no mercado________]            │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Parcelar Despesa?          [Toggle] │ │
│ │                                     │ │
│ │ Número de Parcelas (máx 60)        │ │
│ │ [−] [3] [+]                        │ │
│ │                                     │ │
│ │ ┌───────────────────────────────┐  │ │
│ │ │ RESUMO                        │  │ │
│ │ │ Valor Total: R$ 1000.00       │  │ │
│ │ │ Parcelas: 3x                  │  │ │
│ │ │ ─────────────────────────────  │  │ │
│ │ │ Valor por Parcela: R$ 333.33  │  │ │
│ │ │                               │  │ │
│ │ │ A despesa será distribuída    │  │ │
│ │ │ nos próximos 3 meses          │  │ │
│ │ └───────────────────────────────┘  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancelar]              [Salvar]        │
└─────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Funcionamento

### 1. Usuário Ativa Parcelamento
```
Usuário toca no toggle "Parcelar Despesa?"
↓
Interface de parcelamento aparece
```

### 2. Usuário Seleciona Número de Parcelas
```
Usuário ajusta o número (1-60)
↓
Preview mostra valor de cada parcela
↓
Texto informa "distribuído nos próximos X meses"
```

### 3. Usuário Clica "Salvar"
```
Sistema valida parâmetros
↓
Gera ID único para o grupo (ex: inst_1704067200000_abc123def)
↓
Cria N transações (uma para cada parcela)
↓
Cada parcela tem:
  - installmentGroupId (mesmo para todas)
  - installmentNumber (1, 2, 3...)
  - installmentCount (total = 3)
  - month (distribuído nos próximos meses)
↓
Todas as parcelas são salvas no AsyncStorage
↓
Usuário vê confirmação
```

### 4. Visualização no Dashboard
```
Mês Atual (Abril/2026):
- Compra no mercado (1/3)    R$ 334

Próximo Mês (Maio/2026):
- Compra no mercado (2/3)    R$ 333

Mês Seguinte (Junho/2026):
- Compra no mercado (3/3)    R$ 333
```

---

## 💡 Cálculo de Parcelas

O sistema distribui o valor de forma inteligente:

**Exemplo: R$ 1000 em 3 parcelas**
```
1000 ÷ 3 = 333.33

Resultado:
- Parcela 1: R$ 334 (recebe o resto)
- Parcela 2: R$ 333
- Parcela 3: R$ 333
Total: R$ 1000 ✓
```

**Algoritmo:**
```
baseAmount = floor(totalAmount / installmentCount)
remainder = totalAmount % installmentCount

Para cada parcela i:
  if i <= remainder:
    amount = baseAmount + 1
  else:
    amount = baseAmount
```

---

## 🛡️ Validações

O sistema valida:
- ✓ Número de parcelas entre 1 e 60
- ✓ Valor maior que zero
- ✓ Valor >= número de parcelas
- ✓ Descrição e data preenchidas

**Mensagens de erro:**
- "Número de parcelas deve ser pelo menos 1"
- "Número máximo de parcelas é 60"
- "Valor deve ser maior que zero"
- "Valor deve ser maior que o número de parcelas"

---

## 🗑️ Deletar Parcelamento

Quando o usuário deleta uma parcela, o sistema oferece opções:
1. **Deletar apenas esta parcela** - Remove 1/3
2. **Deletar todo o parcelamento** - Remove todas as 3 parcelas

```typescript
// Deletar todo o grupo
deleteInstallmentGroup(groupId);

// Deletar apenas uma
deleteTransaction(id);
```

---

## 📊 Dados Armazenados

Cada parcela é armazenada como uma transação completa:

```json
{
  "id": "inst_1704067200000_abc123def_1",
  "date": "2026-04-01T00:00:00Z",
  "category": "expense",
  "amount": 334,
  "description": "Compra no mercado (1/3)",
  "month": "2026-04",
  "isInstallment": true,
  "installmentCount": 3,
  "installmentNumber": 1,
  "installmentGroupId": "inst_1704067200000_abc123def",
  "originalAmount": 1000
}
```

---

## 🔧 Uso no Código

### Adicionar Transação com Parcelamento

```typescript
import { generateInstallments } from '@/lib/installment-utils';

const installments = generateInstallments(
  {
    date: new Date(),
    category: 'expense',
    amount: 1000,
    description: 'Compra',
    month: '2026-04',
  },
  3 // 3 parcelas
);

// Adicionar todas as parcelas
for (const installment of installments) {
  await addTransaction(installment);
}
```

### Buscar Parcelas de um Grupo

```typescript
const groupId = 'inst_1704067200000_abc123def';
const allInstallments = getInstallmentGroup(groupId);
```

### Deletar Todo o Parcelamento

```typescript
await deleteInstallmentGroup(groupId);
```

---

## 🎯 Casos de Uso

### Caso 1: Compra Parcelada
```
Usuário compra um notebook por R$ 3000
Parcela em 12x de R$ 250
Sistema cria 12 transações distribuídas nos próximos 12 meses
```

### Caso 2: Assinatura Anual
```
Usuário paga R$ 1200 de assinatura anual
Parcela em 12x de R$ 100
Cada mês tem R$ 100 de despesa
```

### Caso 3: Aluguel Trimestral
```
Usuário paga R$ 900 de aluguel trimestral
Parcela em 3x de R$ 300
Distribuído nos próximos 3 meses
```

---

## ✅ Testes Recomendados

1. **Criar parcelamento simples**
   - Adicionar R$ 300 em 3 parcelas
   - Verificar se cria 3 transações
   - Verificar se valores estão corretos

2. **Visualizar no dashboard**
   - Verificar se cada parcela aparece no mês correto
   - Verificar se o resumo mensal está correto

3. **Deletar parcelamento**
   - Deletar uma parcela
   - Deletar todo o grupo
   - Verificar se dados foram removidos

4. **Validações**
   - Tentar 0 parcelas
   - Tentar 61 parcelas
   - Tentar valor negativo
   - Tentar valor menor que parcelas

---

## 🚀 Melhorias Futuras

- [ ] Editar parcelamento existente
- [ ] Marcar parcelas como pagas
- [ ] Histórico de parcelas
- [ ] Notificações de vencimento
- [ ] Relatório de parcelamentos ativos
- [ ] Suporte a parcelamentos com juros
- [ ] Sincronização com backend

---

## 📞 Suporte

Para dúvidas sobre a funcionalidade de parcelamento, consulte:
- `lib/installment-utils.ts` - Funções utilitárias
- `app/add-transaction.tsx` - Interface do usuário
- `lib/finance-context.tsx` - Gerenciamento de estado

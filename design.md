# Finance App - Design Document

## Overview
A personal finance management application focused on tracking transactions, setting financial goals, and monitoring investments. The app prioritizes stability, clear data visualization, and intuitive navigation.

## Screen List

1. **Dashboard (Home)** - Overview of financial status
2. **Transactions** - List and manage all transactions
3. **Add Transaction** - Create new transaction
4. **Edit Transaction** - Modify existing transaction
5. **Goals** - View and manage financial goals
6. **Add Goal** - Create new financial goal
7. **Edit Goal** - Modify existing goal
8. **Goal Details** - View detailed goal progress
9. **Investments** - Track investment portfolio
10. **Settings** - App preferences and configuration

## Primary Content and Functionality

### Dashboard (Home)
- **Content**: Summary cards showing total balance, income, expenses, goals progress
- **Functionality**: 
  - Display current month's financial summary
  - Show recent transactions (last 5)
  - Display active goals progress
  - Quick action buttons to add transaction or goal
- **Layout**: ScrollView with stacked cards, each card shows key metric

### Transactions Tab
- **Content**: Paginated list of transactions by month
- **Functionality**:
  - Filter/sort by date, category, amount
  - Month selector to view different periods
  - Swipe to delete or edit
  - Search transactions
- **Layout**: FlatList with month headers, transaction rows showing category, description, amount, date

### Add/Edit Transaction
- **Content**: Form with transaction details
- **Functionality**:
  - Category picker (Income, Expenses, Transfer)
  - Amount input with currency formatting
  - Date picker (defaults to today)
  - Description/notes field
  - Save or cancel
- **Layout**: ScrollView with form fields stacked vertically

### Goals Tab
- **Content**: List of financial goals with progress bars
- **Functionality**:
  - Display goal name, target amount, current amount, deadline
  - Progress visualization (percentage)
  - Filter by status (Active, Completed, Abandoned)
  - Quick add goal button
- **Layout**: FlatList with goal cards showing progress bars

### Add/Edit Goal
- **Content**: Form to create or modify goal
- **Functionality**:
  - Goal name input
  - Target amount input
  - Current amount (auto-filled for edit)
  - Target date picker
  - Category selection
  - Save or cancel
- **Layout**: ScrollView with form fields

### Goal Details
- **Content**: Detailed view of single goal
- **Functionality**:
  - Large progress visualization
  - Timeline of contributions
  - Projected completion date
  - Edit or delete options
  - Add contribution button
- **Layout**: ScrollView with large progress circle, timeline below

### Investments Tab
- **Content**: Portfolio overview and holdings
- **Functionality**:
  - Total portfolio value
  - List of holdings with current value
  - Gain/loss percentage
  - Add investment button
- **Layout**: FlatList with investment cards

## Key User Flows

### Flow 1: Add Transaction
1. User taps "+" button on Dashboard or Transactions tab
2. Add Transaction screen opens
3. User selects category (Income/Expense)
4. User enters amount
5. User selects date (defaults to today)
6. User adds description
7. User taps "Save"
8. Transaction is saved and synced to current month
9. User returns to Dashboard/Transactions with updated data

### Flow 2: Track Goal Progress
1. User navigates to Goals tab
2. User taps on a goal to view details
3. Goal Details screen shows progress and timeline
4. User can add contribution by tapping "Add Contribution"
5. Contribution amount is entered and saved
6. Goal progress updates immediately
7. User can edit or delete goal from this screen

### Flow 3: Monthly Review
1. User navigates to Transactions tab
2. User selects different month from month selector
3. Transactions for that month are displayed
4. User can view spending by category
5. User can drill down into specific transactions

## Color Choices

- **Primary**: #0a7ea4 (Teal) - Action buttons, active states
- **Background**: #ffffff (Light) / #151718 (Dark) - Screen background
- **Surface**: #f5f5f5 (Light) / #1e2022 (Dark) - Cards and elevated surfaces
- **Foreground**: #11181C (Light) / #ECEDEE (Dark) - Primary text
- **Muted**: #687076 (Light) / #9BA1A6 (Dark) - Secondary text
- **Success**: #22C55E (Light) / #4ADE80 (Dark) - Income, positive values
- **Warning**: #F59E0B (Light) / #FBBF24 (Dark) - Pending, caution
- **Error**: #EF4444 (Light) / #F87171 (Dark) - Expenses, negative values
- **Border**: #E5E7EB (Light) / #334155 (Dark) - Dividers and borders

## Data Structure

### Transaction
```typescript
{
  id: string
  date: Date
  category: 'income' | 'expense' | 'transfer'
  amount: number
  description: string
  month: string // YYYY-MM format for month grouping
}
```

### Goal
```typescript
{
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: Date
  category: string
  createdAt: Date
  status: 'active' | 'completed' | 'abandoned'
}
```

### Investment
```typescript
{
  id: string
  name: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  totalValue: number
  category: string
}
```

## Stability Considerations

- **Month Synchronization**: All transactions are tagged with YYYY-MM format month to ensure proper grouping and filtering
- **State Management**: Use React Context with proper memoization to prevent unnecessary re-renders
- **AsyncStorage**: Persist all data locally with proper error handling
- **Performance**: Use FlatList for all long lists, avoid ScrollView with .map()
- **Memory**: Clean up subscriptions and listeners on component unmount
- **Error Handling**: Graceful fallbacks for missing data or failed operations

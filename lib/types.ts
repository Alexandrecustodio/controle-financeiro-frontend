/**
 * Shared types for Finance App
 * Ensures consistency across contexts and components
 */

export type TransactionCategory = 'income' | 'expense' | 'transfer';
export type GoalStatus = 'active' | 'completed' | 'abandoned';

export interface Transaction {
  id: string;
  date: Date;
  category: TransactionCategory;
  amount: number;
  description: string;
  month: string; // YYYY-MM format for proper month grouping
  // Installment fields
  isInstallment?: boolean;
  installmentCount?: number; // Total number of installments
  installmentNumber?: number; // Current installment number (1, 2, 3...)
  installmentGroupId?: string; // ID to group related installments
  originalAmount?: number; // Original amount before division
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
  createdAt: Date;
  status: GoalStatus;
}

export interface Investment {
  id: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  category: string;
}

export interface FinanceSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyNet: number;
}

/**
 * Utility function to get month string in YYYY-MM format
 */
export const getMonthString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

/**
 * Utility function to get month name for display
 */
export const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

/**
 * Utility function to get previous month string
 */
export const getPreviousMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  date.setMonth(date.getMonth() - 1);
  return getMonthString(date);
};

/**
 * Utility function to get next month string
 */
export const getNextMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  date.setMonth(date.getMonth() + 1);
  return getMonthString(date);
};

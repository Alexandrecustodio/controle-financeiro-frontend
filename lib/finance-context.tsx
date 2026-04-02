import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Transaction, FinanceSummary, getMonthString, TransactionCategory } from './types';

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getTransactionsByMonth: (month: string) => Transaction[];
  getSummary: (month: string) => FinanceSummary;
  deleteInstallmentGroup: (groupId: string) => Promise<void>;
  getInstallmentGroup: (groupId: string) => Transaction[];
  isLoading: boolean;
  error: string | null;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const STORAGE_KEY = '@finance_app_transactions';

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load transactions from AsyncStorage on mount
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          // Convert date strings back to Date objects
          const transactions = parsed.map((t: any) => ({
            ...t,
            date: new Date(t.date),
            targetDate: t.targetDate ? new Date(t.targetDate) : undefined,
          }));
          setTransactions(transactions);
        }
      } catch (err) {
        console.error('Failed to load transactions:', err);
        setError('Falha ao carregar transações');
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Save transactions to AsyncStorage whenever they change
  useEffect(() => {
    const saveTransactions = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      } catch (err) {
        console.error('Failed to save transactions:', err);
        setError('Falha ao salvar transações');
      }
    };

    if (!isLoading) {
      saveTransactions();
    }
  }, [transactions, isLoading]);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      setError(null);
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newTransaction: Transaction = {
        ...transaction,
        id,
        month: getMonthString(transaction.date),
      };
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (err) {
      console.error('Failed to add transaction:', err);
      setError('Falha ao adicionar transação');
      throw err;
    }
  }, []);

  const updateTransaction = useCallback(async (id: string, updates: Partial<Transaction>) => {
    try {
      setError(null);
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            const updated = { ...t, ...updates };
            // Ensure month is always in sync with date
            if (updates.date) {
              updated.month = getMonthString(updates.date);
            }
            return updated;
          }
          return t;
        })
      );
    } catch (err) {
      console.error('Failed to update transaction:', err);
      setError('Falha ao atualizar transação');
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setError(null);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete transaction:', err);
      setError('Falha ao deletar transação');
      throw err;
    }
  }, []);

  const getTransactionsByMonth = useCallback((month: string): Transaction[] => {
    return transactions.filter((t) => t.month === month);
  }, [transactions]);

  const getSummary = useCallback((month: string): FinanceSummary => {
    const monthTransactions = getTransactionsByMonth(month);

    const income = monthTransactions
      .filter((t) => t.category === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.category === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions.reduce((sum, t) => {
      if (t.category === 'income') return sum + t.amount;
      if (t.category === 'expense') return sum - t.amount;
      return sum;
    }, 0);

    return {
      totalBalance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      monthlyNet: income - expenses,
    };
  }, [transactions, getTransactionsByMonth]);

  const deleteInstallmentGroup = useCallback(async (groupId: string) => {
    try {
      setError(null);
      setTransactions((prev) =>
        prev.filter((t) => t.installmentGroupId !== groupId)
      );
    } catch (err) {
      console.error('Failed to delete installment group:', err);
      setError('Falha ao deletar grupo de parcelas');
      throw err;
    }
  }, []);

  const getInstallmentGroup = useCallback((groupId: string): Transaction[] => {
    return transactions.filter((t) => t.installmentGroupId === groupId);
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionsByMonth,
      getSummary,
      deleteInstallmentGroup,
      getInstallmentGroup,
      isLoading,
      error,
    }),
    [transactions, addTransaction, updateTransaction, deleteTransaction, getTransactionsByMonth, getSummary, deleteInstallmentGroup, getInstallmentGroup, isLoading, error]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}

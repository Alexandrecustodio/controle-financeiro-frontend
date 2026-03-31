import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Investment } from './types';

interface InvestmentsContextType {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  updateInvestment: (id: string, investment: Partial<Investment>) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  getTotalPortfolioValue: () => number;
  getPortfolioGainLoss: () => { gain: number; percentage: number };
  isLoading: boolean;
  error: string | null;
}

const InvestmentsContext = createContext<InvestmentsContextType | undefined>(undefined);

const STORAGE_KEY = '@finance_app_investments';

export function InvestmentsProvider({ children }: { children: React.ReactNode }) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load investments from AsyncStorage on mount
  useEffect(() => {
    const loadInvestments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          setInvestments(parsed);
        }
      } catch (err) {
        console.error('Failed to load investments:', err);
        setError('Falha ao carregar investimentos');
      } finally {
        setIsLoading(false);
      }
    };

    loadInvestments();
  }, []);

  // Save investments to AsyncStorage whenever they change
  useEffect(() => {
    const saveInvestments = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
      } catch (err) {
        console.error('Failed to save investments:', err);
        setError('Falha ao salvar investimentos');
      }
    };

    if (!isLoading) {
      saveInvestments();
    }
  }, [investments, isLoading]);

  const addInvestment = useCallback(async (investment: Omit<Investment, 'id'>) => {
    try {
      setError(null);
      const id = `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newInvestment: Investment = {
        ...investment,
        id,
      };
      setInvestments((prev) => [...prev, newInvestment]);
    } catch (err) {
      console.error('Failed to add investment:', err);
      setError('Falha ao adicionar investimento');
      throw err;
    }
  }, []);

  const updateInvestment = useCallback(async (id: string, updates: Partial<Investment>) => {
    try {
      setError(null);
      setInvestments((prev) =>
        prev.map((inv) => {
          if (inv.id === id) {
            return { ...inv, ...updates };
          }
          return inv;
        })
      );
    } catch (err) {
      console.error('Failed to update investment:', err);
      setError('Falha ao atualizar investimento');
      throw err;
    }
  }, []);

  const deleteInvestment = useCallback(async (id: string) => {
    try {
      setError(null);
      setInvestments((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error('Failed to delete investment:', err);
      setError('Falha ao deletar investimento');
      throw err;
    }
  }, []);

  const getTotalPortfolioValue = useCallback((): number => {
    return investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  }, [investments]);

  const getPortfolioGainLoss = useCallback((): { gain: number; percentage: number } => {
    const totalCost = investments.reduce((sum, inv) => sum + inv.quantity * inv.purchasePrice, 0);
    const totalValue = getTotalPortfolioValue();
    const gain = totalValue - totalCost;
    const percentage = totalCost === 0 ? 0 : (gain / totalCost) * 100;
    return { gain, percentage };
  }, [investments, getTotalPortfolioValue]);

  const value = useMemo(
    () => ({
      investments,
      addInvestment,
      updateInvestment,
      deleteInvestment,
      getTotalPortfolioValue,
      getPortfolioGainLoss,
      isLoading,
      error,
    }),
    [investments, addInvestment, updateInvestment, deleteInvestment, getTotalPortfolioValue, getPortfolioGainLoss, isLoading, error]
  );

  return <InvestmentsContext.Provider value={value}>{children}</InvestmentsContext.Provider>;
}

export function useInvestments() {
  const context = useContext(InvestmentsContext);
  if (!context) {
    throw new Error('useInvestments must be used within InvestmentsProvider');
  }
  return context;
}

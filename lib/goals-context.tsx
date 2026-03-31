import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Goal, GoalStatus } from './types';

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => Promise<void>;
  updateGoal: (id: string, goal: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  getGoalsByStatus: (status: GoalStatus) => Goal[];
  getGoalProgress: (id: string) => number;
  isLoading: boolean;
  error: string | null;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const STORAGE_KEY = '@finance_app_goals';

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load goals from AsyncStorage on mount
  useEffect(() => {
    const loadGoals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          // Convert date strings back to Date objects
          const goals = parsed.map((g: any) => ({
            ...g,
            targetDate: new Date(g.targetDate),
            createdAt: new Date(g.createdAt),
          }));
          setGoals(goals);
        }
      } catch (err) {
        console.error('Failed to load goals:', err);
        setError('Falha ao carregar metas');
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  // Save goals to AsyncStorage whenever they change
  useEffect(() => {
    const saveGoals = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
      } catch (err) {
        console.error('Failed to save goals:', err);
        setError('Falha ao salvar metas');
      }
    };

    if (!isLoading) {
      saveGoals();
    }
  }, [goals, isLoading]);

  const addGoal = useCallback(async (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    try {
      setError(null);
      const id = `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newGoal: Goal = {
        ...goal,
        id,
        createdAt: new Date(),
      };
      setGoals((prev) => [...prev, newGoal]);
    } catch (err) {
      console.error('Failed to add goal:', err);
      setError('Falha ao adicionar meta');
      throw err;
    }
  }, []);

  const updateGoal = useCallback(async (id: string, updates: Partial<Goal>) => {
    try {
      setError(null);
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id === id) {
            return { ...g, ...updates };
          }
          return g;
        })
      );
    } catch (err) {
      console.error('Failed to update goal:', err);
      setError('Falha ao atualizar meta');
      throw err;
    }
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    try {
      setError(null);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error('Failed to delete goal:', err);
      setError('Falha ao deletar meta');
      throw err;
    }
  }, []);

  const getGoalsByStatus = useCallback((status: GoalStatus): Goal[] => {
    return goals.filter((g) => g.status === status);
  }, [goals]);

  const getGoalProgress = useCallback((id: string): number => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return 0;
    if (goal.targetAmount === 0) return 0;
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  }, [goals]);

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      getGoalsByStatus,
      getGoalProgress,
      isLoading,
      error,
    }),
    [goals, addGoal, updateGoal, deleteGoal, getGoalsByStatus, getGoalProgress, isLoading, error]
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within GoalsProvider');
  }
  return context;
}

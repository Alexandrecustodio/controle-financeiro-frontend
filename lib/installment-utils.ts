/**
 * Utility functions for handling installment calculations
 * Handles dividing expenses into multiple months
 */

import { Transaction, getMonthString, getNextMonth } from './types';

/**
 * Generate a unique ID for grouping related installments
 */
export const generateInstallmentGroupId = (): string => {
  return `inst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate individual installment amount
 * Handles rounding to avoid floating point issues
 */
export const calculateInstallmentAmount = (
  totalAmount: number,
  installmentCount: number,
  installmentNumber: number
): number => {
  const baseAmount = Math.floor(totalAmount / installmentCount);
  const remainder = totalAmount % installmentCount;

  // Distribute remainder across first installments
  if (installmentNumber <= remainder) {
    return baseAmount + 1;
  }
  return baseAmount;
};

/**
 * Generate installment transactions for a given expense
 * Creates separate transactions for each month
 */
export const generateInstallments = (
  originalTransaction: Omit<Transaction, 'id' | 'isInstallment' | 'installmentCount' | 'installmentNumber' | 'installmentGroupId' | 'originalAmount'>,
  installmentCount: number
): Transaction[] => {
  const installments: Transaction[] = [];
  const groupId = generateInstallmentGroupId();
  let currentMonth = originalTransaction.month;

  for (let i = 1; i <= installmentCount; i++) {
    const installmentAmount = calculateInstallmentAmount(
      originalTransaction.amount,
      installmentCount,
      i
    );

    const installment: Transaction = {
      id: `${groupId}_${i}`,
      date: new Date(originalTransaction.date),
      category: originalTransaction.category,
      amount: installmentAmount,
      description: `${originalTransaction.description} (${i}/${installmentCount})`,
      month: currentMonth,
      isInstallment: true,
      installmentCount,
      installmentNumber: i,
      installmentGroupId: groupId,
      originalAmount: originalTransaction.amount,
    };

    installments.push(installment);

    // Move to next month for next installment
    if (i < installmentCount) {
      currentMonth = getNextMonth(currentMonth);
    }
  }

  return installments;
};

/**
 * Get all installments belonging to the same group
 */
export const getRelatedInstallments = (
  transactions: Transaction[],
  groupId: string
): Transaction[] => {
  return transactions.filter((t) => t.installmentGroupId === groupId);
};

/**
 * Calculate total paid for an installment group
 */
export const calculateInstallmentGroupTotal = (
  transactions: Transaction[],
  groupId: string
): number => {
  return getRelatedInstallments(transactions, groupId).reduce(
    (sum, t) => sum + t.amount,
    0
  );
};

/**
 * Check if a transaction is part of an installment
 */
export const isPartOfInstallment = (transaction: Transaction): boolean => {
  return transaction.isInstallment === true && !!transaction.installmentGroupId;
};

/**
 * Format installment display text
 * Example: "1/3" for first of three installments
 */
export const formatInstallmentText = (transaction: Transaction): string => {
  if (!isPartOfInstallment(transaction)) {
    return '';
  }
  return `${transaction.installmentNumber}/${transaction.installmentCount}`;
};

/**
 * Validate installment parameters
 */
export const validateInstallmentParams = (
  amount: number,
  installmentCount: number
): { valid: boolean; error?: string } => {
  if (installmentCount < 1) {
    return { valid: false, error: 'Número de parcelas deve ser pelo menos 1' };
  }

  if (installmentCount > 60) {
    return { valid: false, error: 'Número máximo de parcelas é 60' };
  }

  if (amount <= 0) {
    return { valid: false, error: 'Valor deve ser maior que zero' };
  }

  if (amount < installmentCount) {
    return {
      valid: false,
      error: 'Valor deve ser maior que o número de parcelas',
    };
  }

  return { valid: true };
};

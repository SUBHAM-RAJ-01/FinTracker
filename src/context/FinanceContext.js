import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const FinanceContext = createContext();

// Default categories
const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Food', icon: '🍔', color: '#FF6384' },
  { id: '2', name: 'Transport', icon: '🚗', color: '#36A2EB' },
  { id: '3', name: 'Housing', icon: '🏠', color: '#FFCE56' },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#4BC0C0' },
  { id: '5', name: 'Other', icon: '📦', color: '#9966FF' }
];

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState(DEFAULT_CATEGORIES);
  const [budgets, setBudgets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true);

        // Load transactions
        const storedTransactions = typeof window !== 'undefined' 
          ? localStorage.getItem('finance_transactions')
          : null;
        const parsedTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        // Normalize: convert `_id` to `id` if needed
        const normalizedTransactions = parsedTransactions.map(t => ({
          ...t,
          id: t.id || t._id || Date.now().toString() + Math.random().toString().slice(2),
        }));

        setTransactions(normalizedTransactions);

        // Load budgets
        const storedBudgets = typeof window !== 'undefined'
          ? localStorage.getItem('finance_budgets')
          : null;
        setBudgets(storedBudgets ? JSON.parse(storedBudgets) : {});

        setError(null);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save transactions and budgets to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
      localStorage.setItem('finance_budgets', JSON.stringify(budgets));
    }
  }, [transactions, budgets]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      setError('Failed to save transaction');
      console.error(err);
      throw err;
    }
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    try {
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
      throw err;
    }
  };

  // Update a budget
  const updateBudget = (category, amount) => {
    try {
      setBudgets(prev => ({ ...prev, [category]: amount }));
    } catch (err) {
      setError('Failed to update budget');
      console.error(err);
    }
  };

  // Clear all transactions
  const clearAllTransactions = () => {
    try {
      setTransactions([]);
    } catch (err) {
      setError('Failed to clear transactions');
      console.error(err);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        categories,
        budgets,
        isLoading,
        error,
        addTransaction,
        deleteTransaction,
        updateBudget,
        clearAllTransactions
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook for accessing the context
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

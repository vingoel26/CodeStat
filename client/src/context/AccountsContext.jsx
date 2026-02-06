import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { accountsAPI } from '../services/api';
import { useAuth } from './AuthContext';

const AccountsContext = createContext();

export function AccountsProvider({ children }) {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    // Fetch accounts when authenticated
    const fetchAccounts = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            setLoading(true);
            setError(null);
            const response = await accountsAPI.getAll();
            setAccounts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    // Add a new platform account
    const addAccount = async (platform, handle) => {
        try {
            setError(null);
            const response = await accountsAPI.add(platform, handle);
            setAccounts((prev) => [...prev, response.data]);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Remove a platform account
    const removeAccount = async (id) => {
        try {
            setError(null);
            await accountsAPI.remove(id);
            setAccounts((prev) => prev.filter((acc) => acc._id !== id));
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Refresh account data
    const refreshAccount = async (id) => {
        try {
            setError(null);
            const response = await accountsAPI.refresh(id);
            setAccounts((prev) =>
                prev.map((acc) => (acc._id === id ? response.data : acc))
            );
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Get accounts grouped by platform
    const getAccountsByPlatform = () => {
        const grouped = {};
        accounts.forEach((acc) => {
            if (!grouped[acc.platform]) {
                grouped[acc.platform] = [];
            }
            grouped[acc.platform].push(acc);
        });
        return grouped;
    };

    return (
        <AccountsContext.Provider
            value={{
                accounts,
                loading,
                error,
                addAccount,
                removeAccount,
                refreshAccount,
                refetchAccounts: fetchAccounts,
                getAccountsByPlatform,
            }}
        >
            {children}
        </AccountsContext.Provider>
    );
}

export function useAccounts() {
    const context = useContext(AccountsContext);
    if (!context) {
        throw new Error('useAccounts must be used within an AccountsProvider');
    }
    return context;
}

import React, { createContext, useState, useContext } from 'react';

const BudgetContext = createContext({
    budgets: {}, 
    saveBudget: () => {},
    deleteBudget: () => {}
});

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState({}); 

    const saveBudget = (values) => {
        setBudgets(prev => ({ ...prev, [values.category]: values }));
    };

    const deleteBudget = (category) => {
        setBudgets(prev => {
            const updatedBudgets = { ...prev };
            delete updatedBudgets[category];
            return updatedBudgets;
        });
    };

    return (
        <BudgetContext.Provider value={{ budgets, saveBudget, deleteBudget }}>
            {children}
        </BudgetContext.Provider>
    );
};

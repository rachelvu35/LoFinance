import React, { useState, useEffect } from "react";
import { Progress, Button, Space, message } from "antd";
import "../resources/analytics.css";
import Budget from "./Budget";
import { useBudget } from "../context/BudgetContext";

function Analytics({ transactions }) {
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const { budgets, saveBudget, deleteBudget } = useBudget();

  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncomeTurnover = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnover = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalProfit = (totalIncomeTurnover - totalExpenseTurnover).toFixed(2);

  const overallBudget = budgets["all"]?.amount ?? 0;
  const overallProgress =
    overallBudget > 0
      ? ((totalExpenseTurnover / overallBudget) * 100).toFixed(0)
      : null;
  const remainingBudget = overallBudget ?? null ? overallBudget - totalExpenseTurnover : null;

  useEffect(() => {
    if (remainingBudget < 0) {
      message.warning(`You are over budget ${totalExpenseTurnover - overallBudget } overall`);}
      categories.forEach(category => {
        const transactionsForCategory = transactions.filter(
          t => t.type === "expense" && t.category === category
        );
        const amount = transactionsForCategory.reduce(
          (acc, t) => acc + t.amount,
          0
        );
        const budget = budgets[category];
        if (budget && amount > Number(budget.amount)) {
          message.warning(`You are over budget by ${amount - Number(budget.amount)} in ${category}`);
        }
      });
    });
    

  const categories = [
    "salary",
    "freelance",
    "food",
    "travel",
    "entertainment",
    "medical",
    "education",
    "investment",
    "sport",
    "gift",
    "transport",
    "house",
    "government",
  ];

  const handleBudgetClick = () => {
    setIsBudgetModalVisible(true);
  };

  const handleBudgetClose = () => {
    setIsBudgetModalVisible(false);
  };

  const handleBudgetSave = (values) => {
    setIsBudgetModalVisible(false);
    saveBudget(values);
  };

  const handleBudgetDelete = (category) => {
    deleteBudget(category);
  };

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-6 mt-3">
          <div className="transactions-count mx-5">
            <h4>Total Transactions: {totalTransactions}</h4>
            <hr />
            <h5>Income: {totalIncomeTransactions.length}</h5>
            <h5>Expense: {totalExpenseTransactions.length}</h5>

            <Budget
              visible={isBudgetModalVisible}
              onClose={handleBudgetClose}
              onSave={handleBudgetSave}
            />
          </div>
        </div>

        <div className="col-md-6 mt-3">
          <div className="transactions-count mx-5">
            <h4>Analytics</h4>
            <hr />
            <h5>Total Income: {totalIncomeTurnover}</h5>
            <h5>Total Expense: {totalExpenseTurnover}</h5>
            <h5>Total Profit: {totalProfit}</h5>
            <h5>Total Budget: {budgets["all"]?.amount}</h5>{" "}
            
            <h5>Remaining Budget: {remainingBudget}</h5>
            <div className="col-md-6 mt-3">
            {budgets["all"] && (
              <Progress
                type="circle"
                strokeColor={
                  totalExpenseTurnover <= overallBudget ? "#D507FD" : "#FF6347"
                }
                percent={
                  totalExpenseTurnover > overallBudget
                    ? ((overallBudget / totalExpenseTurnover) * 100).toFixed(0)
                    : overallProgress
                }
                status={
                  totalExpenseTurnover <= overallBudget ? "normal" : "active"
                }
                showInfo={true}
              />
            )}
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mt-3">
                <Button className="primary justify-content-between align-items-center mt-3" size="large" onClick={handleBudgetClick}>
                  SET BUDGET
                </Button>
              </div>
              <Space/>
            </div>
            <Button className="primary justify-content-between align-items-center mt-3" size="large" onClick={() => handleBudgetDelete(["all"])}>
              DELETE BUDGET
            </Button>
          </div>
          
          
          
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <h5> total: {amount}</h5>
                    <Progress
                      strokeColor="#D507FD"
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - Category Wise</h4>
            {categories.map((category) => {
              const transactionsForCategory = transactions.filter(
                (t) => t.type === "expense" && t.category === category
              );
              const amount = transactionsForCategory.reduce(
                (acc, t) => acc + t.amount,
                0
              );
              const budget = budgets[category];
              const progressPercentage = budget
                ? amount <= Number(budget.amount)
                  ? ((amount / Number(budget.amount)) * 100).toFixed(0)
                  : (
                      ((amount - Number(budget.amount)) /
                        Number(budget.amount)) *
                      100
                    ).toFixed(0)
                : 0;

              return (
                amount > 0 && (
                  <div className="category-card" key={category}>
                    <h5>{category}</h5>
                    <h5>Expenses: {amount}</h5>
                    {budget && (
                      <>
                        <h5>Budget: {budget.amount}</h5>
                        <Progress
                          strokeColor={
                            amount > Number(budget.amount)
                              ? "#FF6347"
                              : "#D507FD"
                          } 
                          percent={progressPercentage} 
                          status={
                            amount <= Number(budget.amount)
                              ? "normal"
                              : "active"
                          } // 'exception' when amount exceeds budget
                          showInfo={true}
                        />
                        <Button onClick={() => handleBudgetDelete(category)}>
                          Delete Budget
                        </Button>
                      </>
                    )}
                    {!budget && (
                      <Progress
                        strokeColor="#D507FD"
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(
                          0
                        )}
                        status="normal"
                        showInfo={true}
                      />
                    )}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <Budget
        visible={isBudgetModalVisible}
        onClose={handleBudgetClose}
        onSave={handleBudgetSave}
      />
    </div>
  );
}

export default Analytics;

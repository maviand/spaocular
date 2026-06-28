'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import { apiUrl } from '@/utils/api';
import { formatCurrencyDOP } from '@/utils/currency';
import type { Expense } from '@/types/models';

export default function FinanceDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/finance/expenses'))
      .then(res => res.json())
      .then((data: Expense[]) => setExpenses(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Finanzas</h1>
        <p className={styles.subtitle}>Reportes de Gastos y Facturación</p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Gastos Recientes</h2>
          <button className={styles.btnPrimary}>+ Registrar Gasto</button>
        </div>
        <div className={styles.calendarList}>
          {expenses.length > 0 ? expenses.map((expense) => (
            <div key={expense.id} className={styles.appointmentRowWide}>
              <div>{new Date(expense.date).toLocaleDateString()}</div>
              <div>{expense.description}</div>
              <div className={styles.badge}>{expense.category}</div>
              <div className={styles.amount}>{formatCurrencyDOP(expense.amountDop)}</div>
            </div>
          )) : <div className={styles.emptyState}>No se registraron gastos recientes.</div>}
        </div>
      </div>
    </div>
  );
}

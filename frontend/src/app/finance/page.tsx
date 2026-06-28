'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/finance/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
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
          {expenses.length > 0 ? expenses.map((expense: any) => (
            <div key={expense.id} className={styles.appointmentRow}>
              <div>{new Date(expense.date).toLocaleDateString()}</div>
              <div>{expense.description}</div>
              <div className={styles.badge}>{expense.category}</div>
              <div style={{ fontWeight: 'bold' }}>RD$ {expense.amountDop.toLocaleString()}</div>
            </div>
          )) : <div className={styles.emptyState}>No se registraron gastos recientes.</div>}
        </div>
      </div>
    </div>
  );
}

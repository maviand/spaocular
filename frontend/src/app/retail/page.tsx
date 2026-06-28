'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function RetailDashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/retail/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(console.error);

    fetch('http://localhost:4000/api/retail/equipment')
      .then(res => res.json())
      .then(data => setEquipment(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Retail, POS & Inventory</h1>
        <p className={styles.subtitle}>Suppliers, Equipment Maintenance & Stock</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Suppliers & Orders</h2>
            <button className={styles.btnPrimary}>+ New PO</button>
          </div>
          <div className={styles.calendarList}>
            {suppliers.length > 0 ? suppliers.map((sup: any) => (
              <div key={sup.id} className={styles.appointmentRow}>
                <div>{sup.name}</div>
                <div>{sup.contact || 'No contact info'}</div>
              </div>
            )) : <div className={styles.emptyState}>No suppliers configured.</div>}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Equipment Maintenance</h2>
            <button className={styles.btnOutline}>+ Log Calibration</button>
          </div>
          <div className={styles.calendarList}>
            {equipment.length > 0 ? equipment.map((eq: any) => (
              <div key={eq.id} className={styles.appointmentRow}>
                <div>{eq.name}</div>
                <div className={styles.badge}>
                  Next Calibration: {eq.nextCalibration ? new Date(eq.nextCalibration).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            )) : <div className={styles.emptyState}>No equipment tracked.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

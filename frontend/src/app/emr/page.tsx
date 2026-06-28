'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function EMRDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/emr/medical-records')
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Clinical EMR</h1>
        <p className={styles.subtitle}>Electronic Medical Records & Charting</p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Recent Ocular Diagnostics</h2>
          <button className={styles.btnPrimary}>+ New Chart</button>
        </div>
        
        <div className={styles.calendarList}>
          {records.length > 0 ? records.map((record: any) => (
            <div key={record.id} className={styles.appointmentRow}>
              <div>{new Date(record.createdAt).toLocaleDateString()}</div>
              <div>TBUT OD: {record.tbutOD || 'N/A'} | OS: {record.tbutOS || 'N/A'}</div>
              <div>VA OD: {record.visualAcuityOD || 'N/A'} | OS: {record.visualAcuityOS || 'N/A'}</div>
            </div>
          )) : <div className={styles.emptyState}>No medical records found.</div>}
        </div>
      </div>
    </div>
  );
}

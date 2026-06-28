'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import { apiUrl } from '@/utils/api';

export default function EMRDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(apiUrl('/api/emr/medical-records'))
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Historia Clínica (EMR)</h1>
        <p className={styles.subtitle}>Evaluaciones Diagnósticas y Oculares</p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Registros Clínicos Recientes</h2>
          <button className={styles.btnPrimary}>+ Nueva Consulta</button>
        </div>
        
        <div className={styles.calendarList}>
          {records.length > 0 ? records.map((record: any) => (
            <div key={record.id} className={styles.appointmentRow}>
              <div>{new Date(record.createdAt).toLocaleDateString()}</div>
              <div>TBUT OD: {record.tbutOD || 'N/A'} | OS: {record.tbutOS || 'N/A'}</div>
              <div className={styles.badge}>{record.diagnosis || 'Pendiente'}</div>
            </div>
          )) : <div className={styles.emptyState}>No hay registros de pacientes todavía.</div>}
        </div>
      </div>
    </div>
  );
}

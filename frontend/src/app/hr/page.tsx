'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import { apiUrl } from '@/utils/api';
import type { Staff, Shift } from '@/types/models';

export default function HRDashboard() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/hr/staff'))
      .then(res => res.json())
      .then((data: Staff[]) => setStaff(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch(apiUrl('/api/hr/shifts'))
      .then(res => res.json())
      .then((data: Shift[]) => setShifts(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Recursos Humanos</h1>
        <p className={styles.subtitle}>Gestión de Personal y Turnos</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Personal Clínico</h2>
            <button className={styles.btnPrimary}>+ Agregar Personal</button>
          </div>
          <div className={styles.calendarList}>
            {staff.length > 0 ? staff.map((s) => (
              <div key={s.id} className={styles.appointmentRow}>
                <div>{s.name}</div>
                <div className={styles.badge}>{s.role}</div>
              </div>
            )) : <div className={styles.emptyState}>No se encontró personal activo.</div>}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Turnos Asignados</h2>
            <button className={styles.btnOutline}>Asignar Turno</button>
          </div>
          <div className={styles.calendarList}>
            {shifts.length > 0 ? shifts.map((shift) => (
              <div key={shift.id} className={styles.appointmentRow}>
                <div>{shift.staff?.name || 'Personal Desconocido'}</div>
                <div>{new Date(shift.startTime).toLocaleString()} - {new Date(shift.endTime).toLocaleTimeString()}</div>
              </div>
            )) : <div className={styles.emptyState}>No hay turnos programados.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

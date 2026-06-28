'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function HRDashboard() {
  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/hr/staff')
      .then(res => res.json())
      .then(data => setStaff(data))
      .catch(console.error);
      
    fetch('http://localhost:4000/api/hr/shifts')
      .then(res => res.json())
      .then(data => setShifts(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Clinic HR & Operations</h1>
        <p className={styles.subtitle}>Staff Scheduling, Commissions & Attendance</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Staff Directory</h2>
            <button className={styles.btnPrimary}>+ Add Staff</button>
          </div>
          <div className={styles.calendarList}>
            {staff.length > 0 ? staff.map((s: any) => (
              <div key={s.id} className={styles.appointmentRow}>
                <div>{s.name}</div>
                <div className={styles.badge}>{s.role}</div>
              </div>
            )) : <div className={styles.emptyState}>No staff members found.</div>}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Shift Scheduler</h2>
            <button className={styles.btnOutline}>Assign Shift</button>
          </div>
          <div className={styles.calendarList}>
            {shifts.length > 0 ? shifts.map((shift: any) => (
              <div key={shift.id} className={styles.appointmentRow}>
                <div>{shift.staff?.name || 'Unknown Staff'}</div>
                <div>{new Date(shift.startTime).toLocaleString()} - {new Date(shift.endTime).toLocaleTimeString()}</div>
              </div>
            )) : <div className={styles.emptyState}>No shifts scheduled for this week.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

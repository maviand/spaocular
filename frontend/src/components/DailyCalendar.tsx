'use client';
import React, { useState, useEffect } from 'react';
import styles from '../app/dashboard.module.css';

export default function DailyCalendar() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from /api/appointments?date=today
    // Mocking for now to demonstrate the layout
    const timer = setTimeout(() => {
      setAppointments([
        { id: '1', time: '08:00 AM', patientName: 'Maria Perez', reason: 'Dry Eye Follow-up', status: 'pending' },
        { id: '2', time: '09:00 AM', patientName: 'Jose Castillo', reason: 'LipiFlow Treatment', status: 'pending' },
        { id: '3', time: '10:30 AM', patientName: 'Ana Gomez', reason: 'Initial Consultation', status: 'pending' },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Today&apos;s Appointments</h2>
        <button className={styles.btnOutline}>View Full Calendar</button>
      </div>
      
      <div className={styles.calendarList}>
        {appointments.map(apt => (
          <div key={apt.id} className={styles.appointmentRow}>
            <div className={styles.time}>{apt.time}</div>
            <div className={styles.details}>
              <strong>{apt.patientName}</strong>
              <span>{apt.reason}</span>
            </div>
            <div className={styles.badge}>{apt.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

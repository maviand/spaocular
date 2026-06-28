'use client';
import React, { useState, useEffect } from 'react';
import styles from '../app/dashboard.module.css';

interface CalendarAppointment {
  id: string;
  time: string;
  patientName: string;
  reason: string;
  status: string;
}

export default function DailyCalendar() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from /api/appointments?date=today
    // Mocking for now to demonstrate the layout
    const timer = setTimeout(() => {
      setAppointments([
        { id: '1', time: '08:00 AM', patientName: 'Maria Perez', reason: 'Seguimiento Ojo Seco', status: 'pendiente' },
        { id: '2', time: '09:00 AM', patientName: 'Jose Castillo', reason: 'Tratamiento LipiFlow', status: 'pendiente' },
        { id: '3', time: '10:30 AM', patientName: 'Ana Gomez', reason: 'Consulta Inicial', status: 'pendiente' },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Citas de Hoy</h2>
        <button className={styles.btnOutline}>Ver Calendario Completo</button>
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

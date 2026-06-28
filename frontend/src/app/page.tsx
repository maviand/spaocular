import React from 'react';
import styles from './dashboard.module.css';
import DailyCalendar from '../components/DailyCalendar';
import PatientIntakeForm from '../components/PatientIntakeForm';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Spa Ocular Dashboard</h1>
        <p className={styles.subtitle}>Clinic Management System</p>
      </header>

      <div className={styles.dashboardGrid}>
        {/* Left Column: Daily Calendar */}
        <section>
          <DailyCalendar />
        </section>

        {/* Right Column: Intake Form */}
        <section>
          <PatientIntakeForm />
        </section>
      </div>
    </div>
  );
}

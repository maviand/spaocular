'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

export default function CRMDashboard() {
  const [memberships, setMemberships] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/crm/memberships')
      .then(res => res.json())
      .then(data => setMemberships(data))
      .catch(console.error);

    fetch('http://localhost:4000/api/crm/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Patient CRM</h1>
        <p className={styles.subtitle}>Memberships, Subscriptions, & Documents</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Active Memberships</h2>
            <button className={styles.btnPrimary}>+ New Subscription</button>
          </div>
          <div className={styles.calendarList}>
            {memberships.length > 0 ? memberships.map((m: any) => (
              <div key={m.id} className={styles.appointmentRow}>
                <div>{m.patient?.firstName} {m.patient?.lastName}</div>
                <div>{m.planName}</div>
                <div className={styles.badge}>{m.status}</div>
              </div>
            )) : <div className={styles.emptyState}>No active memberships found.</div>}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Patient Documents</h2>
            <button className={styles.btnOutline}>Upload Consent Form</button>
          </div>
          <div className={styles.calendarList}>
            {documents.length > 0 ? documents.map((doc: any) => (
              <div key={doc.id} className={styles.appointmentRow}>
                <div>{doc.patient?.firstName} {doc.patient?.lastName}</div>
                <div>{doc.type}</div>
                <div className={doc.signed ? styles.badge : styles.badgeDanger}>{doc.signed ? 'Signed' : 'Pending'}</div>
              </div>
            )) : <div className={styles.emptyState}>No documents uploaded recently.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

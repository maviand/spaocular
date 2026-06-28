'use client';
import React, { useState } from 'react';
import styles from '../app/dashboard.module.css';

export default function PatientIntakeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cedula: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Patient registered successfully!');
        setFormData({ firstName: '', lastName: '', cedula: '', email: '', phone: '', dob: '' });
      } else {
        alert('Error registering patient');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>New Patient Intake</h2>
        <p className={styles.cardSubtitle}>Register a new patient into the system</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cédula / ID</label>
            <input required type="text" name="cedula" value={formData.cedula} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary}>Register Patient</button>
        </div>
      </form>
    </div>
  );
}

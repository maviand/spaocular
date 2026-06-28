'use client';
import React, { useState } from 'react';
import styles from '../app/dashboard.module.css';
import { apiUrl } from '@/utils/api';

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
      const response = await fetch(apiUrl('/api/patients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('¡Paciente registrado exitosamente!');
        setFormData({ firstName: '', lastName: '', cedula: '', email: '', phone: '', dob: '' });
      } else {
        alert('Error registrando paciente');
      }
    } catch (error) {
      console.error(error);
      alert('Error de red.');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Nuevo Paciente</h2>
        <p className={styles.cardSubtitle}>Registrar un nuevo paciente en el sistema</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombres</label>
            <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Apellidos</label>
            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cédula / ID</label>
            <input required type="text" name="cedula" value={formData.cedula} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de Nacimiento</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Teléfono</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnPrimary}>Registrar Paciente</button>
        </div>
      </form>
    </div>
  );
}

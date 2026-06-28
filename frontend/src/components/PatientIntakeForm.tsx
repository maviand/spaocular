'use client';
import React, { useState } from 'react';
import styles from '../app/dashboard.module.css';
import { apiUrl } from '@/utils/api';
import { useToast } from './Toast';

interface PatientForm {
  firstName: string;
  lastName: string;
  cedula: string;
  email: string;
  phone: string;
  dob: string;
}

const EMPTY_FORM: PatientForm = {
  firstName: '',
  lastName: '',
  cedula: '',
  email: '',
  phone: '',
  dob: '',
};

export default function PatientIntakeForm() {
  const { notify } = useToast();
  const [formData, setFormData] = useState<PatientForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(apiUrl('/api/patients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        notify('¡Paciente registrado exitosamente!', 'success');
        setFormData(EMPTY_FORM);
      } else {
        notify('No se pudo registrar el paciente.', 'error');
      }
    } catch (error) {
      console.error(error);
      notify('Error de red. Verifique su conexión.', 'error');
    } finally {
      setSubmitting(false);
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
          <button type="submit" className={styles.btnPrimary} disabled={submitting}>
            {submitting ? 'Registrando…' : 'Registrar Paciente'}
          </button>
        </div>
      </form>
    </div>
  );
}

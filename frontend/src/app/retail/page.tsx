'use client';
import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import { apiUrl } from '@/utils/api';
import type { Supplier, Equipment } from '@/types/models';

export default function RetailDashboard() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/retail/suppliers'))
      .then(res => res.json())
      .then((data: Supplier[]) => setSuppliers(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch(apiUrl('/api/retail/equipment'))
      .then(res => res.json())
      .then((data: Equipment[]) => setEquipment(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ventas (Retail)</h1>
        <p className={styles.subtitle}>Punto de Venta, Proveedores y Equipos</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Directorio de Proveedores</h2>
            <button className={styles.btnPrimary}>+ Nueva Orden de Compra</button>
          </div>
          <div className={styles.calendarList}>
            {suppliers.length > 0 ? suppliers.map((sup) => (
              <div key={sup.id} className={styles.appointmentRow}>
                <div>{sup.name}</div>
                <div>{sup.contact || 'Sin contacto'}</div>
              </div>
            )) : <div className={styles.emptyState}>No se encontraron proveedores.</div>}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Mantenimiento de Equipos</h2>
            <button className={styles.btnOutline}>+ Registrar Calibración</button>
          </div>
          <div className={styles.calendarList}>
            {equipment.length > 0 ? equipment.map((eq) => (
              <div key={eq.id} className={styles.appointmentRow}>
                <div>{eq.name}</div>
                <div className={styles.badge}>
                  Última Calibración: {eq.lastCalibration ? new Date(eq.lastCalibration).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            )) : <div className={styles.emptyState}>No hay registros de equipos.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

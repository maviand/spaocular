'use client';
import { useEffect, useState } from 'react';
import styles from './inventory.module.css';
import { apiUrl } from '@/utils/api';
import { formatCurrencyDOP } from '@/utils/currency';
import type { InventoryItem } from '@/types/models';

export default function InventoryDashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/inventory'))
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Inventario de Clínica</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.loading}>Cargando inventario…</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Inventario de Clínica</h1>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre del Ítem</th>
              <th>SKU</th>
              <th>Precio (DOP)</th>
              <th>Stock Actual</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isLowStock = item.stock <= item.minStockThreshold;
              return (
                <tr key={item.id} className={isLowStock ? styles.lowStockRow : ''}>
                  <td>{item.name}</td>
                  <td>{item.sku || 'N/A'}</td>
                  <td>{formatCurrencyDOP(item.priceDop)}</td>
                  <td>{item.stock} / {item.minStockThreshold} (min)</td>
                  <td>
                    {isLowStock ? (
                      <span className={`${styles.badge} ${styles.badgeAlert}`}>Bajo Stock</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeOk}`}>Óptimo</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>No hay artículos en el inventario.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

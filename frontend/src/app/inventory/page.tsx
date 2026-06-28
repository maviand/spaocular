'use client';
import { useEffect, useState } from 'react';
import styles from './inventory.module.css';
import { formatCurrencyDOP } from '@/utils/currency';

interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  priceDop: number;
  stock: number;
  minStockThreshold: number;
}

export default function InventoryDashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div className={styles.container}>Loading inventory...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Clinic Inventory</h1>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Price (DOP)</th>
              <th>Current Stock</th>
              <th>Status</th>
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
                      <span className={`${styles.badge} ${styles.badgeAlert}`}>Low Stock</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeOk}`}>Optimal</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>No inventory items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

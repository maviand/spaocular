'use client';
import { useState, useEffect } from 'react';
import styles from './billing.module.css';
import { apiUrl } from '@/utils/api';
import { formatCurrencyDOP } from '@/utils/currency';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceDop: number;
}

export default function BillingDashboard() {
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const subTotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPriceDop), 0);
  const itbis = subTotal * 0.18;
  const total = subTotal + itbis;

  useEffect(() => {
    fetch(apiUrl('/api/patients'))
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);


  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unitPriceDop: 0 }]);
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleGenerateInvoice = async () => {
    if (!patientId || items.length === 0) {
      alert("Por favor seleccione un paciente y agregue al menos un artículo.");
      return;
    }
    try {
      const response = await fetch(apiUrl('/api/invoices'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, items })
      });
      if (response.ok) {
        alert("¡Factura generada con éxito!");
        setItems([]);
      } else {
        alert("Error al generar factura");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Generador de Facturas</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Seleccionar Paciente</label>
          <select 
            className={styles.select} 
            value={patientId} 
            onChange={(e) => setPatientId(e.target.value)}
          >
            <option value="">-- Elegir Paciente --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName} - {p.cedula}</option>
            ))}
          </select>
        </div>

        <div className={styles.flexBetween} style={{ marginTop: '2rem' }}>
          <label className={styles.label}>Artículos de Factura</label>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleAddItem}>
            + Agregar Artículo
          </button>
        </div>

        {items.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Descripción (ej. Consulta, LipiFlow)"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
            />
            <input 
              type="number" 
              className={styles.input} 
              placeholder="Cant"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
            />
            <input 
              type="number" 
              className={styles.input} 
              placeholder="Precio Unitario (DOP)"
              min="0"
              value={item.unitPriceDop || ''}
              onChange={(e) => handleItemChange(item.id, 'unitPriceDop', Number(e.target.value))}
            />
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleRemoveItem(item.id)}>
              Eliminar
            </button>
          </div>
        ))}

        {items.length > 0 && (
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{formatCurrencyDOP(subTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>ITBIS (18%):</span>
              <span>{formatCurrencyDOP(itbis)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total:</span>
              <span>{formatCurrencyDOP(total)}</span>
            </div>
            
            <button 
              className={styles.btn} 
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={handleGenerateInvoice}
            >
              Generar Factura
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

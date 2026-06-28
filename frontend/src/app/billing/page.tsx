'use client';
import { useState, useEffect } from 'react';
import styles from './billing.module.css';
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
    fetch('http://localhost:4000/api/patients')
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
      alert("Please select a patient and add at least one item.");
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, items })
      });
      if (response.ok) {
        alert("Invoice generated successfully!");
        setItems([]);
      } else {
        alert("Error generating invoice");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Invoice Generator</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Patient</label>
          <select 
            className={styles.select} 
            value={patientId} 
            onChange={(e) => setPatientId(e.target.value)}
          >
            <option value="">-- Choose Patient --</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName} - {p.cedula}</option>
            ))}
          </select>
        </div>

        <div className={styles.flexBetween} style={{ marginTop: '2rem' }}>
          <label className={styles.label}>Invoice Items</label>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleAddItem}>
            + Add Line Item
          </button>
        </div>

        {items.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Description (e.g. LipiFlow, Consult)"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
            />
            <input 
              type="number" 
              className={styles.input} 
              placeholder="Qty"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
            />
            <input 
              type="number" 
              className={styles.input} 
              placeholder="Unit Price (DOP)"
              min="0"
              value={item.unitPriceDop || ''}
              onChange={(e) => handleItemChange(item.id, 'unitPriceDop', Number(e.target.value))}
            />
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleRemoveItem(item.id)}>
              Remove
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
              Generate Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

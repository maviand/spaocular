// Shared API model types for the frontend.
// Dates arrive as ISO strings over JSON (Prisma DateTime serialized).

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  cedula?: string | null;
  email?: string | null;
  phone?: string | null;
  dob?: string | null;
}

/** Minimal patient shape returned on nested `include: { patient: true }`. */
export type PatientRef = Pick<Patient, 'firstName' | 'lastName'>;

export interface MedicalRecord {
  id: string;
  createdAt: string;
  visualAcuityOD?: string | null;
  visualAcuityOS?: string | null;
  tbutOD?: number | null;
  tbutOS?: number | null;
  notes?: string | null;
  /** Not yet on the schema — optional display field for a future diagnosis column. */
  diagnosis?: string | null;
}

export interface Membership {
  id: string;
  planName: string;
  status: string;
  renewalDate: string;
  patient?: PatientRef | null;
}

export interface PatientDocument {
  id: string;
  type: string;
  fileUrl: string;
  signed: boolean;
  patient?: PatientRef | null;
}

export interface Supplier {
  id: string;
  name: string;
  contact?: string | null;
}

export interface Equipment {
  id: string;
  name: string;
  lastCalibration?: string | null;
  nextCalibration?: string | null;
}

export interface Expense {
  id: string;
  description: string;
  amountDop: number;
  category: string;
  date: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
}

export interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  staff?: Pick<Staff, 'name'> | null;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  priceDop: number;
  stock: number;
  minStockThreshold: number;
}

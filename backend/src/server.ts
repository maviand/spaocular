import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAstDateString } from './utils/date.js';

import patientRoutes from './routes/patient.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import emrRoutes from './routes/emr.routes.js';
import hrRoutes from './routes/hr.routes.js';
import crmRoutes from './routes/crm.routes.js';
import financeRoutes from './routes/finance.routes.js';
import retailRoutes from './routes/retail.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Set timezone for the Node process
process.env.TZ = 'America/Santo_Domingo';

app.use('/api/patients', patientRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/emr', emrRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/retail', retailRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Spa Ocular API is running',
    currentTime: getAstDateString(),
    timezone: process.env.TZ,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in timezone ${process.env.TZ}`);
});

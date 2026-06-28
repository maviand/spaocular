import prisma from '../lib/prisma.js';
export const getPatients = async (req, res) => {
    try {
        const patients = await prisma.patient.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(patients);
    }
    catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};
export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: true,
                invoices: true,
            },
        });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    }
    catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
};
export const createPatient = async (req, res) => {
    try {
        const data = req.body;
        // Check if cedula already exists
        if (data.cedula) {
            const existing = await prisma.patient.findUnique({
                where: { cedula: data.cedula }
            });
            if (existing) {
                return res.status(400).json({ error: 'Patient with this Cédula already exists.' });
            }
        }
        const patient = await prisma.patient.create({
            data,
        });
        res.status(201).json(patient);
    }
    catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
};
export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const patient = await prisma.patient.update({
            where: { id },
            data,
        });
        res.json(patient);
    }
    catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Failed to update patient' });
    }
};
export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        // Hard delete
        await prisma.patient.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};

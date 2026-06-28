import prisma from '../lib/prisma.js';
export const getMedicalRecords = async (req, res) => {
    try {
        const { patientId } = req.query;
        if (patientId) {
            const records = await prisma.medicalRecord.findMany({
                where: { patientId: String(patientId) },
                orderBy: { createdAt: 'desc' },
            });
            res.json(records);
        }
        else {
            const records = await prisma.medicalRecord.findMany({
                include: { patient: true },
                orderBy: { createdAt: 'desc' },
            });
            res.json(records);
        }
    }
    catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ error: 'Failed to fetch medical records' });
    }
};
export const createMedicalRecord = async (req, res) => {
    try {
        const data = req.body;
        const record = await prisma.medicalRecord.create({ data });
        res.status(201).json(record);
    }
    catch (error) {
        console.error('Error creating medical record:', error);
        res.status(500).json({ error: 'Failed to create medical record' });
    }
};

import prisma from '../lib/prisma.js';
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        res.json(suppliers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
};
export const createSupplier = async (req, res) => {
    try {
        const data = req.body;
        const supplier = await prisma.supplier.create({ data });
        res.status(201).json(supplier);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create supplier' });
    }
};
export const getEquipment = async (req, res) => {
    try {
        const equipment = await prisma.equipment.findMany({ include: { logs: true } });
        res.json(equipment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
};
export const createEquipment = async (req, res) => {
    try {
        const data = req.body;
        const equipment = await prisma.equipment.create({ data });
        res.status(201).json(equipment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create equipment' });
    }
};

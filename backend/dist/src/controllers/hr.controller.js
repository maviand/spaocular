import prisma from '../lib/prisma.js';
export const getStaff = async (req, res) => {
    try {
        const staff = await prisma.staff.findMany();
        res.json(staff);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch staff' });
    }
};
export const createStaff = async (req, res) => {
    try {
        const data = req.body;
        const staff = await prisma.staff.create({ data });
        res.status(201).json(staff);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create staff' });
    }
};
export const getShifts = async (req, res) => {
    try {
        const shifts = await prisma.shift.findMany({ include: { staff: true } });
        res.json(shifts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch shifts' });
    }
};
export const createShift = async (req, res) => {
    try {
        const data = req.body;
        const shift = await prisma.shift.create({ data });
        res.status(201).json(shift);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create shift' });
    }
};

import prisma from '../lib/prisma.js';
export const getMemberships = async (req, res) => {
    try {
        const memberships = await prisma.membership.findMany({ include: { patient: true } });
        res.json(memberships);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch memberships' });
    }
};
export const createMembership = async (req, res) => {
    try {
        const data = req.body;
        const membership = await prisma.membership.create({ data });
        res.status(201).json(membership);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create membership' });
    }
};
export const getDocuments = async (req, res) => {
    try {
        const documents = await prisma.document.findMany({ include: { patient: true } });
        res.json(documents);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
};
export const createDocument = async (req, res) => {
    try {
        const data = req.body;
        const document = await prisma.document.create({ data });
        res.status(201).json(document);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create document' });
    }
};

import prisma from '../lib/prisma.js';
export const getExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({ orderBy: { date: 'desc' } });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};
export const createExpense = async (req, res) => {
    try {
        const data = req.body;
        const expense = await prisma.expense.create({ data });
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

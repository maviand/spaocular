import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getInventoryItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

export const getLowStockAlerts = async (req: Request, res: Response) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      where: {
        stock: {
          lte: prisma.inventoryItem.fields.minStockThreshold,
        },
      },
      orderBy: { stock: 'asc' },
    });
    res.json(items);
  } catch (error) {
    // Note: If prisma.inventoryItem.fields.minStockThreshold is not supported in the current Prisma client for where clause, 
    // we can query all items and filter in memory or write a raw query.
    // Let's do a fallback just in case the above fails.
    console.error('Error fetching alerts, falling back to memory filter:', error);
    try {
        const allItems = await prisma.inventoryItem.findMany();
        const lowStockItems = allItems.filter(item => item.stock <= item.minStockThreshold);
        res.json(lowStockItems);
    } catch(e) {
        res.status(500).json({ error: 'Failed to fetch low stock alerts' });
    }
  }
};

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.inventoryItem.create({ data });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const data = req.body;
    const item = await prisma.inventoryItem.update({
      where: { id },
      data,
    });
    res.json(item);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        patient: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { patientId, items } = req.body;

    // Calculate subtotal
    let subTotalDop = 0;
    const invoiceItemsData = items.map((item: any) => {
      const totalPrice = item.quantity * item.unitPriceDop;
      subTotalDop += totalPrice;
      return {
        description: item.description,
        quantity: item.quantity,
        unitPriceDop: item.unitPriceDop,
        totalPriceDop: totalPrice,
      };
    });

    // Calculate ITBIS (18%)
    const itbisDop = subTotalDop * 0.18;
    const totalDop = subTotalDop + itbisDop;

    const invoice = await prisma.invoice.create({
      data: {
        patientId,
        subTotalDop,
        itbisDop,
        totalDop,
        status: 'PENDING',
        items: {
          create: invoiceItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

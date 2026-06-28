import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getMemberships = async (req: Request, res: Response) => {
  try {
    const memberships = await prisma.membership.findMany({ include: { patient: true } });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
};

export const createMembership = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const membership = await prisma.membership.create({ data });
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create membership' });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await prisma.document.findMany({ include: { patient: true } });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const createDocument = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const document = await prisma.document.create({ data });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document' });
  }
};

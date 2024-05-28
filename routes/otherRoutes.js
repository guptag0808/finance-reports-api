const express= require('express')
const mainRouter = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {authenticateToken} = require("../middleware/authentication")

// Add a new category
mainRouter.post('/categories', authenticateToken, async (req, res) => {
	const { name } = req.body;
	try {
	  const category = await prisma.category.create({
		data: { name },
	  });
	  res.status(201).json(category);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  });
  
  // Get all categories
  mainRouter.get('/categories', authenticateToken, async (req, res) => {
	const categories = await prisma.category.findMany();
	res.json(categories);
  });

//   Implement CRUD Operations for Income and Expenses

//  All Crud operation o transaction
  mainRouter.post('/transactions', authenticateToken, async (req, res) => {
	const { amount, type, categoryId } = req.body;
	const userId = req.user.userId;
  
	try {
	  const transaction = await prisma.transaction.create({
		data: {
		  amount,
		  type,
		  categoryId,
		  userId
		}
	  });
	  res.status(201).json(transaction);
	} catch (error) {
	  res.status(400).json({ error: 'Error creating transaction' });
	}
  });
  

//  get All Transaction 

  mainRouter.get('/transactions', authenticateToken, async (req, res) => {
	const transactions = await prisma.transaction.findMany({
	  where: { userId: req.user.userId },
	});
	res.json(transactions);
  });

//  Get All Transaction By ID
  mainRouter.get('/transactions/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const transaction = await prisma.transaction.findUnique({ where: { id: parseInt(id) } });
	res.json(transaction);
  });


  // Update Transaction
  mainRouter.put('/transactions/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { amount, type, categoryId } = req.body;
	const transaction = await prisma.transaction.update({
	  where: { id: parseInt(id) },
	  data: { amount, type, categoryId },
	});
	res.json(transaction);
  });

// Delete Route for transaction
  mainRouter.delete('/transactions/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	await prisma.transaction.delete({ where: { id: parseInt(id) } });
	res.json({ message: 'Transaction deleted' });
  });

  // Create and track budget
  mainRouter.post('/budgets', authenticateToken, async (req, res) => {
	const { amount, month, year } = req.body;
	try {
	  const budget = await prisma.budget.create({
		data: {
		  amount,
		  month,
		  year,
		  userId: req.user.userId,
		},
	  });
	  res.json(budget);
	} catch (error) {
	  res.status(400).json({ error: 'Error creating budget' });
	}
  });

 //  Get All the budgets
 mainRouter.get('/budgets', authenticateToken, async (req, res) => {
	const budgets = await prisma.budget.findMany({
	  where: { userId: req.user.userId },
	});
	res.json(budgets);
  });


//  get reports
  mainRouter.get('/reports/monthly', authenticateToken, async (req, res) => {
	const { month, year } = req.query;
	const transactions = await prisma.transaction.findMany({
	  where: {
		userId: req.user.userId,
		createdAt: {
		  gte: new Date(`${year}-${month}-01`),
		  lt: new Date(`${year}-${parseInt(month) + 1}-01`),
		},
	  },
	});
	const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
	const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
	res.json({ income, expense, Total: income - expense });
  });

  // Category-wise expense tracking
  mainRouter.get('/reports/category-wise', authenticateToken, async (req, res) => {
	const transactions = await prisma.transaction.findMany({
	  where: {
		userId: req.user.userId,
		type: 'expense',
	  },
	  include: { category: true },
	});
	const expensesByCategory = transactions.reduce((acc, transaction) => {
	  const category = transaction.category.name;
	  if (!acc[category]) {
		acc[category] = 0;
	  }
	  acc[category] += transaction.amount;
	  return acc;
	}, {});
	res.json(expensesByCategory);
  });
  module.exports ={mainRouter}
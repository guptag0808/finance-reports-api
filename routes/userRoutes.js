const express= require('express')
const userRouter = express.Router()
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

userRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;
  
	const user = await prismaClient.user.findUnique({ where: { email } });
  
	if (!user) {
	  return res.status(401).json({ error: 'Invalid email or password' });
	}
  
	const isValidPassword = await bcrypt.compare(password, user.password);
  
	if (!isValidPassword) {
	  return res.status(401).json({ error: 'Invalid email or password' });
	}
  
	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });
  
	res.json({ token });
  });
  
  userRouter.post('/register', async (req, res) => {
	const { email, password, name } = req.body;
  
	const hashedPassword = await bcrypt.hash(password, 10);
	
	try {
	  const user = await prismaClient.user.create({
		data: {
		  email,
		  password: hashedPassword,
		  name
		}
	  });
	  res.status(201).json({ message: 'User created successfully', user });
	} catch (error) {
	  res.status(400).json({ error: 'User already exists' });
	}
  });
  
  module.exports= {userRouter}
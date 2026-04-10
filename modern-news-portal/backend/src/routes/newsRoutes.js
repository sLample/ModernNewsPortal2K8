import express from 'express';
import News from '../models/News.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
});

router.get('/:id', async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'Not found' });
  res.json(news);
});

// Protected routes (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  const news = await News.create(req.body);
  res.status(201).json(news);
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(news);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
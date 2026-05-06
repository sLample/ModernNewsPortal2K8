import express from 'express';
import News from '../models/News.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Lấy tất cả tin tức (public)
router.get('/', async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
});

// Lấy chi tiết 1 bài
router.get('/:id', async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
  res.json(news);
});

// Tạo tin mới (chỉ admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
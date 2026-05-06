import express from 'express'
import { upload } from '../config/cloudinary.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

console.log('uploadRoutes loaded')

router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file.path })
  } catch (err) {
    res.status(500).json({ error: 'Upload that bai' })
  }
})

export default router
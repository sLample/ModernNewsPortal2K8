import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('News', newsSchema);
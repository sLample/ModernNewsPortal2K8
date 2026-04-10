import News from "../models/News.js";

export const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.json(news);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
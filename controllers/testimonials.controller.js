const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (!testi) res.status(404).json({ message: 'Not found' });
    else res.json(testi);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const cleanAuthor = sanitize(req.body.author);
    const cleanText = sanitize(req.body.text);
    const newTestimonial = new Testimonial({ author: cleanAuthor, text: cleanText });
    await newTestimonial.save();
    res.json({ message: 'OK', newTestimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (testi) {
      testi.author = author;
      testi.text = text;
      await testi.save();
      res.json({ message: 'Document changed', testi });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testi = await Testimonial.findById(req.params.id);
    if (testi) {
      await testi.deleteOne({ _id: req.params.id });
      res.json({ message: 'Deleted', testi });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};
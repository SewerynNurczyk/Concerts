const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({ performer: req.params.performer });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts)
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts)
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({ $and: [{ price: { $gte: req.params.price_min } }, { price: { $lte: req.params.price_max } }] });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts)
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day });
    if (!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts)
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK', newConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json({ message: 'Document changed', concert });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'Deleted', concert });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};
const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.concerts.length);
    const randomConcert = db.concerts[randomIndex];
    res.json(randomConcert);
});

router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const concertsId = db.concerts.find((concert) => concert.id === id);
    res.json(concertsId);
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newId = db.concerts.length + 1;
    const newConcert = { id: newId, performer, genre, price, day, image };
    db.concerts.push(newConcert);
    res.status(201).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find((concert) => concert.id === id);

    if (!concert) {
        res.status(404).json({ message: 'Concert not found.' });
    } else {
        concert.performer = performer || concert.performer;
        concert.genre = genre || concert.genre;
        concert.price = price || concert.price;
        concert.day = day || concert.day;
        concert.image = image || concert.image;
        res.json({ message: 'OK' });
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;
    const concertsId = db.concerts.find((concert) => concert.id === id);

    if (concertsId !== -1) {
        db.concerts.splice(concertsId, 1);
        res.status(201).json({ message: 'OK' });
    }
});

module.exports = router;
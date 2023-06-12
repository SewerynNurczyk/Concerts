const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.seats.length);
    const randomSeats = db.seats[randomIndex];
    res.json(randomSeats);
});

router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const seatsId = db.seats.find((seat) => seat.id === id);
    res.json(seatsId);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const newId = db.seats.length + 1;
    const newSeat = { id: newId, day, seat, client, email };
    db.seats.push(newSeat);
    res.status(201).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;
    const seatNumber = db.seats.find((seat) => seat.id === id);

    if (!seatNumber) {
        res.status(404).json({ message: 'Seat not found.' });
    } else {
        seatNumber.day = day || seatNumber.day;
        seatNumber.seat = seat || seatNumber.seat;
        seatNumber.client = client || seatNumber.client;
        seatNumber.email = email || seatNumber.email;
        res.json({ message: 'OK' });
    }
});

router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;
    const seatsId = db.seats.find((seat) => seat.id === id);

    if (seatsId !== -1) {
        db.seats.splice(seatsId, 1);
        res.status(201).json({ message: 'OK' });
    }
});

module.exports = router;
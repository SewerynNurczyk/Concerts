const express = require('express');
const db = require('../db');
const router = express.Router();
const uuid = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((data) => data.id === req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuid.v4();
    const newSeat = { id: id, day, seat, client, email };
    if (db.seats.some((seatCheck) => seatCheck.day == newSeat.day && seatCheck.seat == newSeat.seat)) {
        res.json({ message: 'The slot is already taken' });
        res.status(409).json({ message: 'The slot is already taken' });
    } else {
        db.seats.push(newSeat);
        res.json({ message: 'ok!' });
        req.io.emit('seatsUpdated', db.seats);
    }
});

router.route('/seats/:id').delete((req, res) => {
    const id = +req.params.id;
    db.seats.splice(
        db.seats.findIndex((seat) => seat.id === id),
        1
    );
    res.json({ message: 'Seat deleted' });
},
    (err) => {
        console.log(err);
    }
);

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = +req.params.id;
    const changeSeat = db.seats.find((seat) => seat.id === id);
    changeSeat.day = day;
    changeSeat.seat = seat;
    changeSeat.client = client;
    changeSeat.email = email;
    res.json({ message: 'ok!' });
},
    (err) => {
        console.log(err);
    }
);

module.exports = router;
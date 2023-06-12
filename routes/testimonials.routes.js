const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const testimonialId = db.testimonials.find((testimonial) => testimonial.id === id);
    res.json(testimonialId);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const newId = db.testimonials.length + 1;
    const newTestimonial = { id: newId, author, text };
    db.testimonials.push(newTestimonial);
    res.status(201).json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;
    const testimonial = db.testimonials.find((testimonial) => testimonial.id === id);

    if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found.' });
    } else {
        testimonial.author = author || testimonial.author;
        testimonial.text = text || testimonial.text;
        res.json({ message: 'OK' });
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;
    const testimonialId = db.testimonials.find((testimonial) => testimonial.id === id);

    if (testimonialId !== -1) {
        db.testimonials.splice(testimonialId, 1);
        res.status(201).json({ message: 'OK' });
    }
});

module.exports = router;
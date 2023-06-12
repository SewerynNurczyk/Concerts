const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const testimonialsRoutes = require('./routes/testimonials.routes');
const contersRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

app.use('/api', testimonialsRoutes);
app.use('/api', contersRoutes)
app.use('/api', seatsRoutes)

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...'});
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
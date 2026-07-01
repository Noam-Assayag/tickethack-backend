const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');
const { checkBookingBody } = require('../modules/checkBookingBody');

router.post('/', async (req, res) => {
    try {
        if (!checkBookingBody(req.body)) {
            return res.json({ result: false, error: 'No trips to book', bookings: [] });
        }

        await Booking.insertMany(req.body.trips);

        const data = await Booking.find();

        res.json({ result: true, bookings: data });

    } catch (error) {
        res.json({ result: false, error: error.message, bookings: [] });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Booking.find();
        res.json({ result: true, bookings: data });
    } catch (error) {
        res.json({ result: false, error: error.message, bookings: [] });
    }
});

module.exports = router;
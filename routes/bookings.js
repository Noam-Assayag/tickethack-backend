const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');
const { checkBookingBody } = require('../modules/checkBookingBody');

// Enregistre les trajets payés comme réservations définitives
router.post('/', async (req, res) => {
    try {
        // Vérifie que req.body.trips existe et n'est pas vide
        if (!checkBookingBody(req.body)) {
            return res.json({ result: false, error: 'No trips to book' });
        }

        // Insère tous les trajets du panier
        await Booking.insertMany(req.body.trips);

        // Récupère toutes les réservations
        const data = await Booking.find();

        res.json({ result: true, bookings: data });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

// Récupère toutes les réservations enregistrées
router.get('/', async (req, res) => {
    try {
        const data = await Booking.find();

        res.json({ result: true, bookings: data });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

module.exports = router;
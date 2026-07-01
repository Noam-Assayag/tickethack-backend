const express = require('express');
const router = express.Router();
const Trip = require('../models/trips');

// Recherche des trajets selon le départ, l'arrivée et la date
// Exemple : GET /trips/search?departure=Paris&arrival=Lyon&date=2026-07-01
router.get('/search', async (req, res) => {
    try {
        const { departure, arrival, date } = req.query;

        // Vérification des paramètres
        if (!departure || !arrival || !date) {
            return res.json({
                result: false,
                error: 'Missing search parameters',
                trips: []
            });
        }

        // Plage de 24h
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        // Recherche en BDD
        const data = await Trip.find({
            departure,
            arrival,
            date: { $gte: startDate, $lt: endDate }
        });

        res.json({ result: true, trips: data });

    } catch (error) {
        res.json({ result: false, error: error.message, trips: [] });
    }
});

module.exports = router;
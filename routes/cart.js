const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const { checkCartBody } = require('../modules/checkCartBody');

// Ajoute un trajet au panier
router.post('/', async (req, res) => {
    try {
        // Vérifie que le body contient bien un _id
        if (!checkCartBody(req.body)) {
            return res.json({ result: false, error: 'Missing trip id' });
        }

        // Prépare le document à enregistrer
        const newCartItem = new Cart({
            tripId: req.body._id,
            departure: req.body.departure,
            arrival: req.body.arrival,
            date: req.body.date,
            price: req.body.price,
        });

        // Sauvegarde en BDD
        await newCartItem.save();

        // Récupère tout le panier
        const data = await Cart.find();

        res.json({ result: true, cart: data });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

// Récupère tout le contenu actuel du panier
router.get('/', async (req, res) => {
    try {
        const data = await Cart.find();

        res.json({ result: true, cart: data });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

// Supprime un trajet précis du panier (via son tripId)
router.delete('/:id', async (req, res) => {
    try {
        await Cart.deleteOne({ tripId: req.params.id });

        const data = await Cart.find();

        res.json({ result: true, cart: data });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

// Vide complètement le panier (utilisé après un paiement réussi)
router.delete('/', async (req, res) => {
    try {
        await Cart.deleteMany({});

        res.json({ result: true, cart: [] });

    } catch (error) {
        res.json({ result: false, error: error.message });
    }
});

module.exports = router;
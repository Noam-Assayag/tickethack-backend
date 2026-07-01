const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const { checkCartBody } = require('../modules/checkCartBody');

router.post('/', async (req, res) => {
    try {
        if (!checkCartBody(req.body)) {
            return res.json({ result: false, error: 'Missing trip id', cart: [] });
        }

        const newCartItem = new Cart({
            tripId: req.body._id,
            departure: req.body.departure,
            arrival: req.body.arrival,
            date: req.body.date,
            price: req.body.price,
        });

        await newCartItem.save();

        const data = await Cart.find();

        res.json({ result: true, cart: data });

    } catch (error) {
        res.json({ result: false, error: error.message, cart: [] });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Cart.find();
        res.json({ result: true, cart: data });
    } catch (error) {
        res.json({ result: false, error: error.message, cart: [] });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Cart.deleteOne({ tripId: req.params.id });
        const data = await Cart.find();
        res.json({ result: true, cart: data });
    } catch (error) {
        res.json({ result: false, error: error.message, cart: [] });
    }
});

router.delete('/', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.json({ result: true, cart: [] });
    } catch (error) {
        res.json({ result: false, error: error.message, cart: [] });
    }
});

module.exports = router;
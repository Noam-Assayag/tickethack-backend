const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
//const { checkCartBody } = require('../modules/checkCartBody');

// ========================
// ADD TRIP TO CART
// ========================
router.post('/', async (req, res) => {
  try {

    const newCart = new Cart({
      tripId: req.body.tripId,
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      price: req.body.price,
    });

    await newCart.save();

    const data = await Cart.find();

    res.json({
      result: true,
      cart: data,
    });

  } catch (error) {
    res.json({
      result: false,
      error: error.message,
      cart: [],
    });
  }
});

// ========================
// GET CART
// ========================
router.get('/', async (req, res) => {
  try {

    const data = await Cart.find();

    res.json({
      result: true,
      cart: data,
    });

  } catch (error) {

    res.json({
      result: false,
      error: error.message,
      cart: [],
    });

  }
});

// ========================
// DELETE ONE ITEM
// ========================
router.delete('/:id', async (req, res) => {
  try {

    await Cart.deleteOne({
      _id: req.params.id,
    });

    const data = await Cart.find();

    res.json({
      result: true,
      cart: data,
    });

  } catch (error) {

    res.json({
      result: false,
      error: error.message,
      cart: [],
    });

  }
});

// ========================
// EMPTY CART
// ========================
router.delete('/', async (req, res) => {

  try {

    await Cart.deleteMany({});

    res.json({
      result: true,
      cart: [],
    });

  } catch (error) {

    res.json({
      result: false,
      error: error.message,
      cart: [],
    });

  }

});


const Booking = require('../models/bookings');

router.post('/purchase', async (req, res) => {
  try {
    const cartItems = await Cart.find();

    await Booking.insertMany(cartItems);

    await Cart.deleteMany({});

    res.json({ result: true });

  } catch (error) {
    res.json({ result: false, error: error.message });
  }
});

// route temporaire
router.delete('/clear-test', async (req, res) => {
  await Cart.deleteMany({ tripId: "TEST" });
  res.json({ result: true });
});


module.exports = router;
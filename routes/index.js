var express = require('express');
var router = express.Router();

/* GET home page - simple healthcheck pour l'API */
router.get('/', function(req, res) {
  res.json({ message: 'Tickethack API is running' });
});

module.exports = router;
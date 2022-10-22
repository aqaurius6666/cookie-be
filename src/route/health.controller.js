const { response200 } = require('../util/response');

const router = require('express').Router();


router.get('/', async (req, res) => {
  return response200(res, 'ok');
});

module.exports = router;

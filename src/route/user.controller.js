const { UserUsecase } = require('../usecase');

const router = require('express').Router();


router.get('/', async (req, res) => {
  const user = await UserUsecase.findOne(1);
  res.json(user);
});

module.exports = router;

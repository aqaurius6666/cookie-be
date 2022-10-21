const { UserUsecase } = require('../usecase');
const { response500, response200 } = require('../util/response');

const router = require('express').Router();


router.get('/', async (req, res) => {
  try {
    const user = await UserUsecase.findOne(1);
    return response200(res, user);
  } catch (err) {
    return response500(res, err?.message || err);
  }

});

module.exports = router;

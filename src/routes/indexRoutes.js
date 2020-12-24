const { Router } = require('express');
const router = Router();

const { renderIndex, renderAbout } = require('../controllers/indexController')

router.get('/', renderIndex);

router.get("/about", renderAbout);



module.exports = router;
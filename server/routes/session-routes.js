const router = require('express').Router();
const sessionController = require('../controllers/sessionController');

router.use((req, res, next) => {
    next();
});

router.get('/', sessionController.retrieveSessions);

router.post('/save', sessionController.saveSessions);

module.exports = router;

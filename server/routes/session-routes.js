const router = require('express').Router();
const Session = require('../models/session');

router.use((req, res, next) => {
    next();
});

router.post('/save', async (req, res) => {
    const body = req.body;

    if (!body.notes || !body.notes.text) {
        body.notes = { text: '' };
    }

    if (req.user) {
        const session = new Session({
            userId: req.user.id,
            secondsElapsed: body.secondsElapsed,
            notes: {
                text: body.notes.text,
            },
        });
        await session.save();
        res.json({
            success: true,
        });
    } else {
        res.status(401).json({ success: false });
    }
});

module.exports = router;

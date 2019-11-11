const Session = require('../models/session');

exports.retrieveSessions = async function(req, res) {
    // move auth checks into a helper function
    if (req.user) {
        Session.find(
            { userId: req.user.id },
            null,
            { sort: { date: -1 } },
            (err, sessions) => {
                if (err) {
                    throw err;
                }
                res.json({
                    sessions,
                    success: true,
                });
            }
        );
    } else {
        res.status(401).json({ success: false });
    }
};

exports.saveSessions = async function(req, res) {
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
};
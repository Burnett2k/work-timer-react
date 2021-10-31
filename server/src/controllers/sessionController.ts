import { Session } from '../models/session';
import { Request, Response } from 'express';
import { logger } from '../logger';

export const retrieveSessions = async function(req: Request, res: Response) {
  if (req.user) {
    logger.info('retrieving sessions for user');
    Session.find(
      { userId: req.user.id },
      null,
      { sort: { date: -1 }, limit: 20 },
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

export const saveSessions = async function(req: Request, res: Response) {
  logger.info('saving a user session');
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

export const getSessionSummary = async function(req: Request, res: Response) {
  if (req.user) {
    logger.info('retrieving session summary for user');
    const aggregate = await Session.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: { week: { $week: '$date' }, year: { $year: '$date' } },
          totalSessions: { $sum: 1 },
          totalSeconds: { $sum: '$secondsElapsed' },
          minDate: { $min: '$date' },
          maxDate: { $max: '$date' },
        },
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.week': -1,
        },
      },
    ]);

    res.json({
      aggregate,
      success: true,
    });
  } else {
    res.status(401).json({ success: false });
  }
};

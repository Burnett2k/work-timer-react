import { pino } from 'pino';

export const logger = pino({
  name: 'work-timer',
  timestamp: pino.stdTimeFunctions.isoTime,
});

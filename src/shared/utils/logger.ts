import pino from 'pino';
import pretty from 'pino-pretty';

const prettyLogger = pretty({
  ignore: 'time,pid,hostname',
});

export const logger = pino(prettyLogger as pino.LoggerOptions);

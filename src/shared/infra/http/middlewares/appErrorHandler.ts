/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocaleError } from '@shared/errors/LocaleError';
import { localeErrors } from '@shared/errors/localeErrors';
import { Request, Response, NextFunction } from 'express';

export const appErrorHandler = (
  err: any,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (err instanceof LocaleError) {
    const error = localeErrors[err.type];
    const message = error.message[request.language];
    return response.status(error.status).json({ message, error: err.type });
  }

  const message = err?.message === undefined ? 'Unknown error.' : err.message;
  return response.status(400).json({ message });
};

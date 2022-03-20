import { Request, Response, NextFunction } from 'express';
import {
  defaultLocaleErrorLanguage,
  LocaleErrorLanguage,
  localeErrorLanguage,
} from '@shared/errors/localeErrors';

export const getClientLanguage = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const acceptLanguage = req.header('accept-language') || '';
  const clientLanguages = acceptLanguage
    .split(/[,;]/g)
    .map(lang => lang.slice(0, 2).toLocaleLowerCase());

  const supportedLanguage = clientLanguages.find(lang =>
    localeErrorLanguage.includes(lang as LocaleErrorLanguage),
  );

  req.language = (supportedLanguage ||
    defaultLocaleErrorLanguage) as LocaleErrorLanguage;

  next();
};

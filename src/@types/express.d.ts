declare namespace Express {
  export interface Request {
    language: import('@shared/errors/localeErrors').LocaleErrorLanguage;
  }
}

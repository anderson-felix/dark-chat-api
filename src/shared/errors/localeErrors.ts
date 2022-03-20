export type LocaleErrorType =
  | 'invalidToken'
  | 'missingToken'
  | 'invalidLogin'
  | 'userNotAuthorized'
  | 'operationNotPermitted'
  | 'userAlreadyExists'
  | 'userNotFound';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = typeof localeErrorLanguage[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = {
  status: number;
  message: LocaleErrorMessage;
};

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  invalidToken: {
    status: 401,
    message: {
      pt: 'Token JWT inválido',
      en: 'Invalid JTW token',
    },
  },
  missingToken: {
    status: 401,
    message: {
      pt: 'Token JWT faltando',
      en: 'Missing JWT token',
    },
  },
  invalidLogin: {
    status: 401,
    message: {
      pt: 'Nome de usuário e/ou senha incorretos',
      en: 'Incorrect username/password combination',
    },
  },
  userNotAuthorized: {
    status: 401,
    message: {
      pt: 'Usuário não autorizado',
      en: 'User not authorized',
    },
  },
  operationNotPermitted: {
    status: 403,
    message: {
      pt: 'Operação não permitida',
      en: 'Operation not permitted',
    },
  },
  userAlreadyExists: {
    status: 403,
    message: {
      pt: 'Usuário já cadastrado',
      en: 'User already exists',
    },
  },
  userNotFound: {
    status: 404,
    message: {
      pt: 'Usuário não encontrado',
      en: 'User not found',
    },
  },
};

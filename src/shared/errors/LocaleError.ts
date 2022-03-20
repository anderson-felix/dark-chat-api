import { LocaleErrorType } from './localeErrors';

export class LocaleError {
  constructor(public readonly type: LocaleErrorType) {}
}

import { tKeys, ITranslateKey } from 'services/i18n';

export function isMatchPassword(
  password: string,
  passwordConfirm: string,
): ITranslateKey | undefined {
  return password !== passwordConfirm ? tKeys.utils.validation.isMatchPassword.getKey() : undefined;
}

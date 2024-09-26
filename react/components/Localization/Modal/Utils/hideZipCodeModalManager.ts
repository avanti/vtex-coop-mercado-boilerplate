import { setCookie } from '../../../../utils/cookiesHandler'

export function hideZipCodeModalManager() {
  // 24 horas em milisegundos
  const LocalizationPopupCookieExpiration = 86400000

  setCookie('hide-modalCep', 'hide', LocalizationPopupCookieExpiration)
}

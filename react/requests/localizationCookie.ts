import { getCookie, setCookie } from '../hooks/useCookies'

const setLocalizationCookie = (cookieObject: any) => {
  setCookie('custom-localization', btoa(JSON.stringify(cookieObject)), 1)
}

const getLocalizationCookie = () => {
  try {
    const decoded = atob(getCookie('custom-localization'))
    return decoded
  } catch (err) {
    return false
  }
}

export { setLocalizationCookie, getLocalizationCookie }

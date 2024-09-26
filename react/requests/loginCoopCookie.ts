import { getCookie, setCookie } from '../hooks/useCookies'

const key = 'custom-login-coop-cookie'

const setLoginCoopCookie = (cookieObject: any) => {
  setCookie(key, btoa(JSON.stringify(cookieObject)), 1)
}

const getLoginCoopCookie = () => {
  try {
    const decoded = atob(getCookie(key))
    const json = JSON.parse(decoded)
    return json
  } catch (err) {
    return false
  }
}

export { setLoginCoopCookie, getLoginCoopCookie }

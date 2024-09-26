const setExpirationCookie = (cookieName: string) => {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000)

  const expires = 'expires=' + expirationDate.toUTCString()
  document.cookie = cookieName + '=' + 'active' + ';' + expires + ';path=/'
}

const getExpirationCookie = (cookieName: string) => {
  const cookieString = document.cookie
  const cookies = cookieString.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1)
    }
  }

  return null
}

export { setExpirationCookie, getExpirationCookie }

const setCookie = (
  cookieName: string,
  value: string,
  timeInMiliSeconds: number
) => {
  const expirationDate = new Date()
  expirationDate.setTime(expirationDate.getTime() + timeInMiliSeconds)

  const expires = 'expires=' + expirationDate.toUTCString()
  document.cookie = cookieName + '=' + value + ';' + expires + ';path=/'
}

const getCookie = (cookieName: string) => {
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

export { getCookie, setCookie }

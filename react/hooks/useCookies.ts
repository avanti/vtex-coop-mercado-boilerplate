function setCookie(cname: string, cvalue: string, exHours: number) {
  const d = new Date()
  d.setTime(parseInt(d.getTime().toString(), 10) + exHours * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString().toString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function getCookie(cname: string) {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export { setCookie, getCookie }

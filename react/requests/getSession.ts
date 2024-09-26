const getSession = async () => {
  try {
    const request = await fetch('/api/sessions?items=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default getSession

const getSessionData = async () => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const request = await fetch('/api/sessions?items=*', options)
    if (request.status !== 200) throw new Error('')

    return await request.json()
  } catch (_e) {
    return false
  }
}

export default getSessionData

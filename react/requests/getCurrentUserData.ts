const getCurrentUserData = async () => {
  try {
    const url = `/api/io/safedata/CL/search?_fields=clientProfile,id,document`

    const headers = {
      Accept: '"application/json"',
      'Content-type': 'application/json',
    }
    const options = {
      method: 'GET',
      headers: {
        ...headers,
        'REST-range': `resources=0-1`,
      },
    }
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    const json = await request.json()
    return json?.[0]
  } catch (_e) {
    return false
  }
}

export default getCurrentUserData

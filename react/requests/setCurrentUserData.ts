const setCurrentUserData = async (id: string, body: any) => {
  try {
    const url = `/api/io/safedata/CL/documents/${id}`

    const options = {
      method: 'PATCH',
      headers: {
        Accept: '"application/json"',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    const json = await request.json()
    return json?.[0]
  } catch (_e) {
    return false
  }
}

export default setCurrentUserData

const getAddressByCep = async (cep: string) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const url = `/api/checkout/pub/postal-code/BRA/${cep}`
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('Request error')

    return await request.json()
  } catch (_) {
    return false
  }
}

export default getAddressByCep

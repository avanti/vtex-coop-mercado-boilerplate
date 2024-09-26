const contactUsForm = async (body: any) => {
  try {
    const url = '/api/dataentities/CT/documents'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    }

    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error()

    return await request.json()
  } catch (err) {
    return false
  }
}

export default contactUsForm

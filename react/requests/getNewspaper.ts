const getNewspaper = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'REST-range': 'resources=0-1000',
        Accept: 'application/json',
      },
    }

    const url = `/api/dataentities/ST/search/?_fields=address,city,name,operationOne,operationTwo,telephone,type,newspaperOne,newspaperTwo,newspaperThree,id`
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('Request error')

    return await request.json()
  } catch (_) {
    return false
  }
}

export default getNewspaper

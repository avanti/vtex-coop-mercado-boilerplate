const getPickupPointsByGeocoordinates = async (lat: string, lng: string) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    const url = `/api/checkout/pub/pickup-points?geocoordinates=${lat}%3B${lng}&page=1&pageSize=10`
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('Request error')

    return await request.json()
  } catch (_) {
    return false
  }
}

export default getPickupPointsByGeocoordinates

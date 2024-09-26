const getOrderFormById = async (orderFormId: string) => {
  try {
    const requestOptions = {
      method: 'GET',
    }

    const url = `/api/checkout/pub/orderForm/${orderFormId}`

    const request = await fetch(url, requestOptions)
    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default getOrderFormById

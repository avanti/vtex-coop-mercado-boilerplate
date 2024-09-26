const addToCart = async (orderForm: string, orderItems: any) => {
  try {
    const url = `/api/checkout/pub/orderForm/${orderForm}/items`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ orderItems }),
    }

    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default addToCart

const postRemoveAllCart = async (orderForm: any) => {
  try {
    const url = `/api/checkout/pub/orderForm/${orderForm}/items/removeAll`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ orderForm }),
    }

    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default postRemoveAllCart

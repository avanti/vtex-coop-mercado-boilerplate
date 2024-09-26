const updateOrderForm = async (orderFormId: string, body: any) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    }

    const url = `/api/checkout/pub/orderForm/${orderFormId}/items`
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default updateOrderForm

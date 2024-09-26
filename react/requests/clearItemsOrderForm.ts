const clearItemsOrderForm = async (orderFormId: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    }

    const url = `/api/checkout/pub/orderForm/${orderFormId}/items/removeAll`
    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error('')

    return request.json()
  } catch (_e) {
    return false
  }
}

export default clearItemsOrderForm

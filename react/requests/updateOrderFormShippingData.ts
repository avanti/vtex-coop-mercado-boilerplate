const updateOrderFormShippingData = async (orderformId: string, body: any) => {
  try {
    const request = await fetch(
      `/api/checkout/pub/orderForm/${orderformId}/attachments/shippingData`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/vnd.vtex.ds.v10+json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
    if (request.status !== 200) throw new Error('')

    return await request.json()
  } catch (_e) {
    return false
  }
}

export default updateOrderFormShippingData

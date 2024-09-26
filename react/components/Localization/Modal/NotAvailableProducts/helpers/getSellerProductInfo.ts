export const getSellerProductInfo = async (
  skuId: string,
  sellerId: string,
  qty: number
) => {
  let dataItems
  let logistics: { id: string }[] = []
  const items = [
    {
      id: skuId,
      quantity: qty,
      seller: sellerId,
    },
  ]

  const body = {
    country: 'BRA',
    items,
  }

  await fetch('/api/checkout/pub/orderForms/simulation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) =>
    response.json().then((data) => {
      dataItems = data.items
      logistics = data.logisticsInfo[0].deliveryChannels
    })
  )

  return { dataItems, logistics }
}

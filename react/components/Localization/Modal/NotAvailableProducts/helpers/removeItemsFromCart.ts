export const updateCartItems = async (
  body: CartUpdateType,
  orderFormId: string
) => {
  const updateItemsUrl = `/api/checkout/pub/orderForm/${orderFormId}/items/update`

  await fetch(updateItemsUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json().then((data) => data))
    .catch((error) => {
      console.error(`Error when updating cart items: ${error}`)
      throw new Error(error)
    })
}

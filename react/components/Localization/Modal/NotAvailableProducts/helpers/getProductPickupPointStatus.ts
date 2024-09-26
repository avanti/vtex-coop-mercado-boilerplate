export const getProductPickupPointStatus = (
  productLogistic: { id: string }[]
) => {
  for (let i = 0; i < productLogistic.length; i++) {
    if (productLogistic[i].id === 'pickup-in-point') {
      return true
    }
  }
  return false
}

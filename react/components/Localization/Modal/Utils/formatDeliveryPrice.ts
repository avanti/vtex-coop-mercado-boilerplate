// const formatPrice = (value: number) => {
//   const formatter = new Intl.NumberFormat(undefined, {
//     style: 'currency',
//     currency: 'BRL',
//   })

//   return formatter.format(value)
// }

export const getDeliveryPrice = (deliverySla: SLA | undefined) => {
  // const deliverySla = deliverySeller?.slas.find(
  //   ({ deliveryChannel }: any) => deliveryChannel === 'delivery'
  // )

  const deliveryPrice = deliverySla?.price
    ? 'R$'+(deliverySla?.price / 100)
    : 'R$ 0,00'

  return deliveryPrice
}

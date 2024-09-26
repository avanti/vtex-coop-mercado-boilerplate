import { get } from '../requests/localizationLocalStorage'
import updateOrderFormShippingData from '../requests/updateOrderFormShippingData'

const matchSlaWithLocalStorage = (slas: any[]) => {
  const { selectedDeliveryChannel } = get()
  const found = slas.find((sla: any) => {
    return sla.deliveryChannel === selectedDeliveryChannel
  })

  return found
}

const updateLogisticsInfoAccordingLocalStorageData = async (orderForm: any) => {
  const currentLogisticsInfo = orderForm?.shippingData?.logisticsInfo

  const logisticsInfo = currentLogisticsInfo.map(
    (logisticInfo: any, index: number) => {
      const { deliverySla } = get()

      if (deliverySla) {
        return {
          itemIndex: index,
          selectedDeliveryChannel: deliverySla.deliveryChannel,
          selectedSla: deliverySla.id,
        }
      }

      const foundSla = matchSlaWithLocalStorage(logisticInfo.slas)

      if (!foundSla) return logisticInfo

      return {
        addressId: logisticInfo.addressId,
        itemIndex: index,
        selectedDeliveryChannel: foundSla.deliveryChannel,
        selectedSla: foundSla.id,
      }
    }
  )

  if (!logisticsInfo.length) return

  return updateOrderFormShippingData(orderForm.orderFormId, {
    logisticsInfo,
    selectedAddresses: orderForm?.shippingData?.selectedAddresses,
  })
}

export default updateLogisticsInfoAccordingLocalStorageData

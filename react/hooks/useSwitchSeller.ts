import { useContext } from 'react'

import { LocalizationContextProvider } from '../components/Localization/context'
import { set } from '../requests/localizationLocalStorage'
import { hideZipCodeModalManager } from '../components/Localization/Modal/Utils/hideZipCodeModalManager'

const useSwitchSeller = () => {
  const { setLocalization } = useContext(LocalizationContextProvider)

  const switchSeller = (
    pickupPointName: string,
    localSellerId: string,
    pickUpPointFriendlyName: string | undefined
  ) => {
    set({ deliverySla: null, isDelivery: false, pickupPointName })

    pickUpPointFriendlyName
      ? localStorage.setItem('StoreFriendlyName', pickUpPointFriendlyName)
      : localStorage.setItem('StoreFriendlyName', 'Delivery')

    setLocalization(localSellerId)
    hideZipCodeModalManager()
  }

  return { switchSeller }
}

export default useSwitchSeller

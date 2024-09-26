import React, { useContext } from 'react'

import styles from './styles.module.css'
import { set } from '../../../../requests/localizationLocalStorage'
import { hideZipCodeModalManager } from '../Utils/hideZipCodeModalManager'
import { LocalizationContextProvider } from '../../context'
import CloseButton from '../CloseButton'
import OptionComponent from './OptionComponent'
import deliveryTimeModal from '../Utils/deliveryTimeModal'

const DeliveryOptionStep2 = () => {
  const {
    pickupPoints,
    deliverySeller,
    setStep,
    setLocalization,
    loading,
    setLoading,
    pickupCep,
  } = useContext(LocalizationContextProvider)
  const onChangeDeliveryInputRadio = (isDelivery: boolean) => {
    if (isDelivery) {
      const localDeliverySla = deliverySeller?.slas.find(
        ({ deliveryChannel }: any) => deliveryChannel === 'delivery'
      )

      setLocalization(deliverySeller.id)
      set({
        deliverySla: localDeliverySla,
        isDelivery: true,
        selectedDeliveryChannel: 'delivery',
        pickupPointName: null,
      })
      localStorage.setItem('StoreFriendlyName', 'Delivery')
      hideZipCodeModalManager()
      setLoading(true)
    } else {
      setStep(3)
    }
  }

  const getDeliverys = () => {
    const deliverys = deliverySeller ? deliverySeller.slas.filter((item:any) => (item.deliveryChannel === 'delivery')) : []
    // Ordena a lista de entregas por data mais recente
    const orderedDeliverys = deliverys.length ? deliverys.sort((a:any, b:any)=> (a.availableDeliveryWindows[0].startDateUtc > b.availableDeliveryWindows[0].startDateUtc) ? 1 : ((b.availableDeliveryWindows[0].startDateUtc > a.availableDeliveryWindows[0].startDateUtc) ? -1 : 0)) : []
    return orderedDeliverys
  }
  
  return (
    <div className={styles['Delivery-options--container']}>
      <CloseButton />
      <div className={styles['Delivery-options--header']}>
        <p>
          CEP: <span>{pickupCep}</span>
        </p>
        <button onClick={() => setStep(1)}>Alterar CEP</button>
      </div>
      <p className={styles['Delivery-options--subheader']}>
        Como deseja receber suas compras?
      </p>
      <div className={styles['Delivery-options--body']}>
        {pickupPoints && (
          <OptionComponent
            isDelivery={false}
            onSetStep={onChangeDeliveryInputRadio}
            ctaDesc={deliveryTimeModal(
              deliverySeller?.slas?.filter((item:any) => item.deliveryChannel === 'pickup-in-point')[0]?.availableDeliveryWindows
            )}
          />
        )}
        {getDeliverys().length ? getDeliverys().map((item:any) => {return (
          <OptionComponent
            isDelivery
            deliverySla={item}
            onSetStep={onChangeDeliveryInputRadio}
            loading={loading}
            ctaDesc={deliveryTimeModal(
              item?.availableDeliveryWindows
            )}
          />
        )}) : null}
      </div>
    </div>
  )
}

export default DeliveryOptionStep2

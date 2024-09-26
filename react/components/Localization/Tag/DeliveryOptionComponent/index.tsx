import React, { useState, useEffect } from 'react'

import styles from './styles.module.css'
import { formatCEP } from '../../../../utils/formatCep'
import useMediaQuery from '../../../../hooks/useMediaQuery'

type Props = {
  deliverySpecifications: DeliverySpecificationsType
  onOpenOptionsModal: () => void
}

type DeliveryOptions = {
  option: string
  venue: string
}

const DeliveryOptionComponent = (props: Props) => {
  const { deliverySpecifications, onOpenOptionsModal } = props
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptions>(
    {} as DeliveryOptions
  )
  const matchMedia = useMediaQuery(768, 'max')

  useEffect(() => {
    const { postalCode, pickupPointName, isDelivery } = deliverySpecifications
    const options = {} as DeliveryOptions
    options.option = isDelivery ? 'Entrega em' : 'Retirar em'
    options.venue = isDelivery ? formatCEP(postalCode) : pickupPointName

    setDeliveryOption(options)
  }, [])

  return (
    <div className={styles['Delivery--options-wrapper']}>
      <p className={styles['Delivery--options-text']}>
        {deliveryOption.option}:<br></br>
        <button onClick={onOpenOptionsModal}>
          {deliveryOption.venue}
          {matchMedia && ' - '}
        </button>
      </p>
    </div>
  )
}

export default DeliveryOptionComponent

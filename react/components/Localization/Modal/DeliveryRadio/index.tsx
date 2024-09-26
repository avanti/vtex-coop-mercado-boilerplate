import React from 'react'

import styles from './styles.module.css'
import formatEstimate from '../../../../utils/formatEstimate'

type AvailableDeliveryWindowType = {
  endDateUtc: string
  lisPrice: number
  price: number
  startDateUtc: string
}

type SlaType = {
  id: string
  deliveryChannel: string
  shippingEstimate: string
  availableDeliveryWindows: AvailableDeliveryWindowType[]
}

const DeliveryRadio = ({ sla }: { sla: SlaType }) => {
  if (sla.deliveryChannel !== 'delivery') return <></>

  const { id, shippingEstimate } = sla

  const getDaysRemainingToDelivery = (date: Date) => {
    const today = new Date()

    const diffInMiliseconds = Math.abs(Number(date) - Number(today))

    if (
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    ) {
      const diffDates = date.getDate() - today.getDate()

      if (diffDates < 2) return diffDates
    }

    const diffInDays = diffInMiliseconds / 1000 / 60 / 60 / 24

    return diffInDays
  }

  const extractFriendlyTime = (date: Date) => {
    try {
      if (!date) throw new Error('')

      return `${date.getHours()}:${date
        .getMinutes()
        .toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`
    } catch (_err) {
      return ''
    }
  }

  const convertUtcDateTimeToLocalDateTime = (dateString: string) => {
    const localDateTime = new Date(dateString)

    localDateTime.setHours(
      localDateTime.getHours() + localDateTime.getTimezoneOffset() / 60
    )

    return localDateTime
  }

  const formatDeliveryWindowEstimate = () => {
    try {
      if (sla.id.toLowerCase() !== 'agendada')
        throw new Error(`Invalid delivery type`)

      const { availableDeliveryWindows } = sla

      if (!availableDeliveryWindows?.length)
        throw new Error('Available delivery windows not found')

      const [{ startDateUtc, endDateUtc }] = availableDeliveryWindows

      if (!startDateUtc || !endDateUtc)
        throw new Error('Available delivery windows date/time not found')

      const startDate = convertUtcDateTimeToLocalDateTime(startDateUtc)
      const endDate = convertUtcDateTimeToLocalDateTime(endDateUtc)

      const remainingDaysToDelivery = getDaysRemainingToDelivery(startDate)

      if (remainingDaysToDelivery < 2)
        return `${
          remainingDaysToDelivery === 0 ? 'Hoje' : 'Amanhã'
        } das ${extractFriendlyTime(startDate)} às ${extractFriendlyTime(
          endDate
        )}`

      return `A partir de ${Math.floor(remainingDaysToDelivery)} dias`
    } catch (_err) {
      return false
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.store}>
        <input
          className={styles.inputRadio}
          type="radio"
          name="selectedStore"
          id={id}
          value={id}
          data-sla={btoa(JSON.stringify(sla))}
        />

        <div className={styles.storeText}>
          <span className={styles.storeTitle}>{id}</span>
          {shippingEstimate && (
            <span className={styles.deliveryEstimate}>
              {formatDeliveryWindowEstimate() ||
                formatEstimate(shippingEstimate)}
            </span>
          )}
        </div>
      </label>
    </div>
  )
}

export default DeliveryRadio

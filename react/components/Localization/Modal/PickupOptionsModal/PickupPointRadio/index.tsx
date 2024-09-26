import React from 'react'

import styles from './styles.module.css'
import type { DistantPickupPoints } from '../utils'

type Props = {
  pickupPoint: DistantPickupPoints
  onPickupPoint: (
    e: React.FormEvent<HTMLInputElement>,
    friendlyName: string
  ) => void
  localPickupPoint: string | null | undefined
}

const MapIn = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_21_335)">
        <path
          d="M8 1.33331C5.58125 1.33331 3.625 3.41998 3.625 5.99998C3.625 9.49998 8 14.6666 8 14.6666C8 14.6666 12.375 9.49998 12.375 5.99998C12.375 3.41998 10.4187 1.33331 8 1.33331ZM8 7.66665C7.1375 7.66665 6.4375 6.91998 6.4375 5.99998C6.4375 5.07998 7.1375 4.33331 8 4.33331C8.8625 4.33331 9.5625 5.07998 9.5625 5.99998C9.5625 6.91998 8.8625 7.66665 8 7.66665Z"
          fill="#FA6E50"
        />
      </g>
      <defs>
        <clipPath id="clip0_21_335">
          <rect
            width="15"
            height="16"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const PickupPointRadio = (props: Props) => {
  const { pickupPoint, onPickupPoint, localPickupPoint } = props

  const { friendlyName, address, id } = pickupPoint.pickupPoint
  const { street, number, neighborhood, city, state } = address

  return (
    <div
      className={[
        styles.pickupPointInputWrapper,
        localPickupPoint === id ? styles.inputSelected : null,
      ].join(' ')}
    >
      <label htmlFor={id} className={styles.store}>
        <input
          className={styles.inputRadio}
          type="radio"
          name="selectedStore"
          id={id}
          data-postalCode={address.postalCode}
          data-friendLyName={friendlyName}
          value={id}
          checked={localPickupPoint === id}
          onChange={(e) => onPickupPoint(e, friendlyName)}
        />

        <div className={styles.storeText}>
          <p className={styles.storeDistance}>
            <span>
              <MapIn />
            </span>
            <span>{Math.round(pickupPoint.distanceTo)} km</span>
          </p>
          <span className={styles.storeTitle}>{friendlyName}</span>
          <span className={styles.storeAddress}>
            {`${street}, ${number} - ${neighborhood} - ${city} - ${state}`}
          </span>
        </div>
      </label>
    </div>
  )
}

export default PickupPointRadio

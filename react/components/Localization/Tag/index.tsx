import React, { useContext } from 'react'
import { Spinner } from 'vtex.styleguide'

import styles from './styles.module.css'
import { LocalizationContextProvider } from '../context'
import MarkerLocalizationIcon from './MarkerLocalizationIcon'
import DeliveryOptionComponent from './DeliveryOptionComponent'

const Tag = () => {
  const { loading, setShowModal, deliverySpecifications, setZipCodeChange } =
    useContext(LocalizationContextProvider)

  const onClickHandler = () => {
    setZipCodeChange(true)
    setShowModal(true)
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.tc}>
          <Spinner color="currentColor" size={20} />
        </div>
      ) : (
        <span className={styles.tag}>
          <MarkerLocalizationIcon />
          {deliverySpecifications &&
          deliverySpecifications?.pickupPointName !== undefined ? (
            <DeliveryOptionComponent
              deliverySpecifications={deliverySpecifications}
              onOpenOptionsModal={onClickHandler}
            />
          ) : (
            <button
              className={`${styles.button} ${styles.buttonInsertYourCep}`}
              onClick={onClickHandler}
            >
              Insira seu CEP
            </button>
          )}
        </span>
      )}
    </div>
  )
}

export default Tag

import React, { useContext } from 'react'

import { LocalizationContextProvider } from '../../context'
import styles from './styles.module.css'
import { hideZipCodeModalManager } from '../Utils/hideZipCodeModalManager'

const CloseButton = () => {
  const { setShowModal, setLoading, setStep, skuId } = useContext(
    LocalizationContextProvider
  )

  const onClickHandler = async (
    _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {

    skuId.current = null
    setShowModal(false)
    setLoading(false)
    setStep(1)
    hideZipCodeModalManager()

    setShowModal(false)
    setStep(1)
  }

  return (
    <button className={styles.button} onClick={onClickHandler}>
      fechar
    </button>
  )
}

export default CloseButton

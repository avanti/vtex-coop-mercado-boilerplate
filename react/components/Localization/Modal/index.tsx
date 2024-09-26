import React, { useContext, useEffect, useState } from 'react'

import styles from './styles.module.css'
import { LocalizationContextProvider } from '../context'
import Step1 from './Step1'
import PickupOptionsModal from './PickupOptionsModal'
import DeliveryOptionStep2 from './DeliveryOptionsStep2'
import NotAvailableProducts from './NotAvailableProducts'
import NotLoggedModalMobile from './NotLoggedModalMobile'
import { getCookie } from '../../../utils/cookiesHandler'

const Modal = () => {
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>()
  const { setShowModal, showModal, step, skuId, productContextToGA } =
    useContext(LocalizationContextProvider)

  const openLocalizationModalEventListener = (ev: Event) => {
    skuId.current = (ev as CustomEvent).detail.skuId
    productContextToGA.current = (ev as CustomEvent).detail.product
    setShowModal(true)
  }

  const checkStartLocalizationUrlQuery = () => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    if (params.get('startLocalization') === 'true') {
      setShowModal(true)
    }
  }

  useEffect(() => {
    document.addEventListener(
      'open-localization-modal',
      openLocalizationModalEventListener
    )

    checkStartLocalizationUrlQuery()

    return () => {
      document.removeEventListener(
        'open-localization-modal',
        openLocalizationModalEventListener
      )
    }
  }, [])

  useEffect(() => {
    let element
    switch (step) {
      case 5:
        element = <NotLoggedModalMobile />
        break
      case 4:
        element = <NotAvailableProducts />
        break
      case 3:
        element = <PickupOptionsModal />
        break
      case 2:
        element = <DeliveryOptionStep2 />
        break
      default:
        element = <Step1 />
        break
    }

    setCurrentComponent(element)
  }, [step])

  const sessionValidation = async () => {
    const hideModalCookie = getCookie('hide-modalCep')

    if (!hideModalCookie) {
      setShowModal(true)
    }
  }

  const verifyZipCodeModalDuplication = () => {
    const modalChecker = setInterval(() => {
      const modals = document.querySelectorAll('#modal-cep')
      if (modals.length > 1) {
        // modals[1]?.remove()
        for (let i = 0; i < modals.length; i++) {
          if (i > 0) {
            modals[i].remove()
          }
        }
      }
    }, 500)

    setTimeout(() => clearInterval(modalChecker), 1000)
  }

  useEffect(() => {
    verifyZipCodeModalDuplication()
  }, [showModal])

  useEffect(() => {
    sessionValidation()
  }, [])

  return (
    <>
      {showModal && (
        <div className={styles.container} id="modal-cep">
          <div className={styles.card}>{currentComponent}</div>
        </div>
      )}
    </>
  )
}

export default Modal

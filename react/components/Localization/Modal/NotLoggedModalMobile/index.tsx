import React, { useContext, useEffect } from 'react'

import styles from './styles.module.css'
import { getExpirationCookie } from './helpers/setExpirationDateFunction'
import CloseButton from '../../Modal/CloseButton'
import { LocalizationContextProvider } from '../../context'
import isSalesChannel2 from '../../../../utils/isSalesChannel2'
import isAuthenticated from '../../../../utils/isAuthenticated'
import getSession from '../../../../requests/getSession'
import useMediaQuery from '../../../../hooks/useMediaQuery'
import { setCookie } from '../../../../utils/cookiesHandler'

// 6 horas em milissegundos
const expiracaoCookiePopupCooperado = 21600000

const NotLoggedModalMobile = () => {
  const matchMedia = useMediaQuery(640, 'min')
  const { setShowModal, setLoading, setStep } = useContext(
    LocalizationContextProvider
  )

  const showVtexLoginModal = () => {
    const evt = new Event('click', {
      bubbles: true,
      cancelable: false,
    })
    const btnVtexLogin = document.querySelector(
      '.vtex-login-2-x-container button.vtex-button'
    )
    if (!btnVtexLogin) return
    btnVtexLogin.dispatchEvent(evt)
  }

  const showCooperadoLoginModal = () => {
    const evt = new Event('click', {
      bubbles: true,
      cancelable: false,
    })
    const btnVtexLogin =
      document.querySelector(
        '.vtex-sticky-layout-0-x-container--stick-1-mobile button.btn-cooperado-login'
      ) ||
      document.querySelector(
        '.coopsp-store-theme-GRB_i3dX_4sQy_-W2G7r6--status-wrapper button.coopsp-store-theme-3WdcCxWJMLizdTfCA0or-c--user-status'
      )

    if (!btnVtexLogin) return
    btnVtexLogin.dispatchEvent(evt)
  }

  const scrollToTop = () => {
    if (matchMedia) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleBtnLoginClick = async () => {
    setLoading(true)
    const sessionData = await getSession()
    const localIsSalesChannel2 = isSalesChannel2(sessionData)
    const localIsAuthenticated = isAuthenticated(sessionData)
    const localIsAuthenticatedAndNotCooperado =
      localIsAuthenticated && !localIsSalesChannel2

    setLoading(false)
    setShowModal(false)
    setStep(1)
    scrollToTop()

    if (!localIsAuthenticated) {
      showVtexLoginModal()
      return
    }

    if (localIsAuthenticatedAndNotCooperado) {
      showCooperadoLoginModal()
    }
  }

  useEffect(() => {
    setCookie(
      'dont-show-cooperado-popup',
      'active',
      expiracaoCookiePopupCooperado
    )
  }, [])

  return (
    <>
      {!getExpirationCookie('not-logged-modal-deadline') && (
        <>
          <div
            className={[
              styles['Login-failed--component-wrapper'],
              styles['Fixed-modal'],
            ].join(' ')}
          >
            <CloseButton />
            <img
              src="/arquivos/coop_supuerm-logo-cooperado.png"
              alt="coop-logo"
            />
            <p className={styles['Login-failed--message']}>
              Você ainda não está aproveitando dos benefícios de ser Cooperado
            </p>
            <p className={styles['Login-failed-links-title']}>
              Faça o login e aproveite
            </p>
            <div className={styles['Login-failed--links-wrapper']}>
              <button
                className={styles['Login-failed--register']}
                onClick={handleBtnLoginClick}
              >
                Fazer login
              </button>
              <a
                className={styles['Login-failed--contact']}
                href="https://sforms-coop.simply.com.br/#/inicial"
                target="_blank"
                rel="noreferrer"
              >
                Quero ser um Cooperado
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default NotLoggedModalMobile

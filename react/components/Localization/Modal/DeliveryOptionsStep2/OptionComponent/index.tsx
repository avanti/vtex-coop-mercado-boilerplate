import React, { useState, useEffect } from 'react'
import { Spinner } from 'vtex.styleguide'
import { useDevice } from 'vtex.device-detector'
import styles from './styles.module.css'
import { getDeliveryPrice } from '../../Utils/formatDeliveryPrice'

type Props = {
  isDelivery: boolean
  // deliverySeller?: SLAS
  deliverySla?: SLA
  onSetStep: (isDelivery: boolean) => void
  loading?: boolean
  ctaDesc: {
    title: string,
    time: string
  } | undefined
}

const deliveryDetails = {
  img: 'iconDelivery',
  iconButton: '../../../../../../assets/images/localization-icons/icon-calendario-claro.svg',
  header1: 'Entrega',
  buttonText: 'Receba'
}

const deliveryExpressDetails = {
  img: 'iconDeliveryExpress',
  iconButton: '../../../../../../assets/images/localization-icons/icon-calendario-claro.svg',
  header1: 'Entrega',
  buttonText: 'Receba'
}

const getInStoreDetails = {
  img: 'iconGetInStore',
  // iconButton: '../../../../../../assets/images/localization-icons/icon-relogio-claro.svg',
  iconButton: '../../../../../../assets/images/localization-icons/icon-calendario-claro.svg',
  header1: 'Retire',
  buttonText: 'Retire'
}

const OptionComponent = (props: Props) => {
  const { isDelivery, deliverySla, onSetStep, loading, ctaDesc } = props
  const [details, setDetails] = useState(getInStoreDetails)
  const { device } = useDevice()
  const isDeliveryExpress = deliverySla?.name?.includes('Expressa') || false

  const renderDeliveryEl = () => {
    const isFreeDeliveryTax = isDelivery ? getDeliveryPrice(deliverySla) === 'R$ 0,00' : true

    const textEl = (
      <div className={styles['Delivery-options-shippingValue-container']}>
        {!isFreeDeliveryTax && (
          <span className={styles['Delivery-options-shippingValue-container--text']}>
            a partir de
          </span>
        )}
        <span className={styles['Delivery-options-shippingValue-container--price']}>
          {isFreeDeliveryTax ? 'Grátis' : getDeliveryPrice(deliverySla)}
        </span>
      </div>
    )

    return textEl
  }

  useEffect(() => {
    if (isDelivery) setDetails(isDeliveryExpress ? deliveryExpressDetails : deliveryDetails)
  }, [])

  // console.log("isDelivery", isDelivery);
  // console.log("deliverySla", deliverySla);

  return (
    <>
      { device != 'phone' ? (
        <div className={styles['Delivery-options--wrapper']}>
          <div className={styles['Delivery-options--container']}>
            <div className={styles['Delivery-options--blocks']}>
              <div className={styles['Delivery-options--block1']}>
                <img src={details.img} alt="shipping" />
              </div>
              <div className={styles['Delivery-options--block2']}>
                <p className={styles['Delivery-options--header1']}>{details.header1}</p>
                <p className={styles['Delivery-options--header2']}>{deliverySla?.name ? (isDeliveryExpress ? 'Expressa' : deliverySla?.name) : 'na Loja'}</p>
              </div>
              <div className={styles['Delivery-options--block3']}>
                {renderDeliveryEl()}
              </div>
                <div className={styles['Delivery-options--block4']}>
                  {loading ? (
                    <div className="tc pt6">
                      <Spinner color="currentColor" size={20} />
                    </div>
                  ) : (
                    <button onClick={() => onSetStep(isDelivery)}>
                      {isDelivery && ctaDesc && (
                        <div className={styles['Delivery-options--ctaDesc']}>
                          <img src={'iconCalendar'} alt="shipping" />
                          <span>
                            <p>Receba {ctaDesc.title}</p>
                            {ctaDesc.time && (<p>{ctaDesc.time}</p>)}
                          </span>
                        </div>
                      )}
                      {!isDelivery && ctaDesc && (
                        <div className={styles['Delivery-options--ctaDesc']}>
                          <img src={'iconClock'} alt="shipping" />
                          <span>
                            <p>Retire {ctaDesc.title}</p>
                            {ctaDesc.time && (<p>{ctaDesc.time}</p>)}
                          </span>
                        </div>
                      )}
                      {!ctaDesc && (
                        <div className={styles['Delivery-options--ctaDesc']}>
                          <img src={'iconClock'} alt="shipping" />
                          <span>
                            <p>Retire na Loja</p>
                          </span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
            </div>
            {isDelivery && (
              <p className={styles['Delivery-options--deliveryMessage']}>
                *Prazo de entrega conforme agendamento
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles['Delivery-options--wrapper']}>
          <div className={styles['Delivery-options--container']}>
            <div className={styles['Delivery-options--blocks']}>
              <div className={styles['Delivery-options--block1']}>
                <img src={details.img} alt="shipping" />
              </div>
              <div className={styles['Delivery-options--block2']}>
                <p className={styles['Delivery-options--header1']}>{details.header1}</p>
                <p className={styles['Delivery-options--header2']}>{deliverySla?.name ? (isDeliveryExpress ? 'Expressa' : deliverySla?.name) : 'na Loja'}</p>
              </div>
              <div className={styles['Delivery-options--block3']}>
                {renderDeliveryEl()}
              </div>
            </div>
              <div className={styles['Delivery-options--block4']}>
                {loading ? (
                  <div className="tc pt5 pb5">
                    <Spinner color="currentColor" size={20} />
                  </div>
                ) : (
                  <button onClick={() => onSetStep(isDelivery)}>
                    {isDelivery && ctaDesc && (
                      <div className={styles['Delivery-options--ctaDesc']}>
                        <img src={'iconCalendar'} alt="shipping" />
                        <span>
                          <p>Receba {ctaDesc.title}</p>
                          {ctaDesc.time && (<p>{ctaDesc.time}</p>)}
                        </span>
                      </div>
                    )}
                    {!isDelivery && ctaDesc && (
                      <div className={styles['Delivery-options--ctaDesc']}>
                        <img src={'iconClock'} alt="shipping" />
                        <span>
                          <p>Retire {ctaDesc.title}</p>
                          {ctaDesc.time && (<p>{ctaDesc.time}</p>)}
                        </span>
                      </div>
                    )}
                    {!ctaDesc && (
                      <div className={styles['Delivery-options--ctaDesc']}>
                        <img src={'iconClock'} alt="shipping" />
                        <span>
                          <p>Retire</p>
                          <p>na Loja</p>
                        </span>
                      </div>
                    )}
                  </button>
                )}
              </div>
            {isDelivery && (
              <p className={styles['Delivery-options--deliveryMessage']}>
                *Prazo de entrega conforme agendamento
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default OptionComponent

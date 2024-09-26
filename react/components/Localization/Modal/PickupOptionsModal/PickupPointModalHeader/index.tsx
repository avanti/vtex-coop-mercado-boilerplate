import React from 'react'

import styles from './styles.module.css'

type Props = {
  onSetStep: (step: number) => void
}

const PickupPointModalHeader = (props: Props) => {
  const { onSetStep } = props

  return (
    <div className={styles['Pickup-point-header--wrapper']}>
      <img src="/arquivos/pickupinpoint-image-localization.svg" alt="loja" />
      <div className={styles['Pickup-point-header--container']}>
        <p>Em qual loja você quer retirar?</p>
        <button onClick={() => onSetStep(2)}>Voltar</button>
      </div>
    </div>
  )
}

export default PickupPointModalHeader

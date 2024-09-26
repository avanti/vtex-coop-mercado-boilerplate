import React, { useEffect, useState } from 'react'
import { Spinner } from 'vtex.styleguide'

import Tag from './Tag'
import Modal from './Modal/index'
import LocalizationContext from './context'
import styles from './styles.module.css'

const Localization = () => {
  const [initRender, setInitRender] = useState(false)

  useEffect(() => {
    // timeout para liberar a main thread
    setTimeout(() => {
      setInitRender(true)
    }, 1000)
  }, [])

  return (
    <div id={styles['localizationContainer']}>
      {initRender ? (
        <LocalizationContext>
          <div className={styles.container}>
            <Tag />
            <Modal />
          </div>
        </LocalizationContext>
      ) : (
        <Spinner color="currentColor" size={20} />
      )}
    </div>
  )
}

export default Localization

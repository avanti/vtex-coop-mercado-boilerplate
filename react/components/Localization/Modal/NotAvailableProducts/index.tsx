import React, { useContext } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner } from 'vtex.styleguide'

import styles from './styles.module.css'
import CloseButton from '../CloseButton'
import { LocalizationContextProvider } from '../../context'
import useSwitchSeller from '../../../../hooks/useSwitchSeller'
import { updateCartItems } from './helpers/removeItemsFromCart'

const NotAvailableProducts = () => {
  const { notAvailableProducts, setStep, setLoading, loading } = useContext(
    LocalizationContextProvider
  )
  const { switchSeller } = useSwitchSeller()
  const { orderForm } = useOrderForm()

  const removeItemsHandler = () => {
    setLoading(true)
    updateCartItems(notAvailableProducts.orderItems, orderForm.id).then(() =>
      switchSeller(
        notAvailableProducts.sellerName,
        notAvailableProducts.sellerId,
        notAvailableProducts.sellerName
      )
    )
  }

  return (
    <div className={styles['Not-available--container']}>
      <CloseButton />
      <p className={styles['Not-available--title']}>
        Ops, produtos indisponíveis!
      </p>
      <p className={styles['Not-available--warning']}>
        Você está alterando a loja para {notAvailableProducts.sellerName}, e os
        seguintes produtos serão excluídos do seu carrinho por não estarem
        disponíveis nessa loja.{' '}
      </p>
      <div className={styles['Not-available--products-wrapper']}>
        {notAvailableProducts.products.map((product: ProductType) => {
          return (
            <div
              key={`${product.productName}-${product.productQty}`}
              className={styles['Not-available--products-list']}
            >
              <img src={product.productImg} alt="produto" />
              <p className={styles['Not-available--product-name']}>
                {product.productName}
              </p>
              <p className={styles['Not-available--product-qty']}>
                {product.productQty} un
              </p>
            </div>
          )
        })}
      </div>
      <div className={styles['Not-available--footer']}>
        <p>
          Ao continuar com a troca da loja e esses produtos serão excluídos do
          eu carrinho
        </p>

        {loading ? (
          <div className="tc pt6">
            <Spinner color="currentColor" size={20} />
          </div>
        ) : (
          <div className={styles['Not-available--footer-buttons']}>
            <button
              className={styles['Not-available--cancel']}
              onClick={() => setStep(3)}
            >
              Cancelar
            </button>
            <button
              className={styles['Not-available--continue']}
              onClick={removeItemsHandler}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotAvailableProducts

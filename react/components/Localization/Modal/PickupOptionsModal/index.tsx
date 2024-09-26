import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spinner } from 'vtex.styleguide'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import styles from './styles.module.css'
import CloseButton from '../CloseButton/index'
import PickupPointModalHeader from './PickupPointModalHeader'
import { LocalizationContextProvider } from '../../context'
import PickupPointRadio from './PickupPointRadio'
import { getSellerProductInfo } from '../NotAvailableProducts/helpers/getSellerProductInfo'
import { getProductPickupPointStatus } from '../NotAvailableProducts/helpers/getProductPickupPointStatus'
import useSwitchSeller from '../../../../hooks/useSwitchSeller'
import { distanceFromPickupPoints } from './utils'

const PickupOptionsModal = () => {
  const {
    setPickupCep,
    setStep,
    pickupPoints,
    loading,
    setIsDelivery,
    deliverySpecifications,
    setNotAvailableProducts,
    setLoading,
    address,
  } = useContext(LocalizationContextProvider)

  const [localPickupPoint, setLocalPickupPoint] = useState<string | null>()
  const [pickupPointName, setPickupPointName] = useState('')
  const [localSellerId, setLocalSellerId] = useState<string>('')
  const [pickUpPointFriendlyName, setPickUpPointFriendlyName] =
    useState<string>()

  const localDeliverySla = useRef<any>()

  const deliveriesListRef = useRef<HTMLDivElement | null>(null)

  const { orderForm } = useOrderForm()
  const { switchSeller } = useSwitchSeller()

  const clearDeliveriesInputs = () => {
    deliveriesListRef.current
      ?.querySelectorAll('input')
      .forEach((input: HTMLInputElement) => (input.checked = false))
  }

  const onChangePickupInputRadio = (
    ev: React.FormEvent<HTMLInputElement>,
    friendlyName: string
  ) => {
    clearDeliveriesInputs()
    const inputPostalCode = (ev.target as HTMLInputElement).getAttribute(
      'data-postalcode'
    )

    const inputFriendlyName = (ev.target as HTMLInputElement).getAttribute(
      'data-friendlyname'
    ) as string

    if (inputPostalCode) setPickupCep(inputPostalCode.replace('-', ''))

    localDeliverySla.current = null
    setIsDelivery(false)
    setLocalSellerId((ev.target as HTMLFormElement).value)
    setLocalPickupPoint((ev.target as HTMLFormElement).value)
    setPickupPointName(friendlyName)
    setPickUpPointFriendlyName(inputFriendlyName)
  }

  const buildOrderFormProductsArrays = async () => {
    const productsList = await orderForm.items.map(
      (product: any, index: number) => {
        const productObj = {} as ProductType

        productObj.productImg = product.imageUrls.at1x
        productObj.productName = product.skuName
        productObj.productQty = product.quantity
        productObj.productId = product.id
        productObj.index = index

        return productObj
      }
    )

    return productsList
  }

  const mountNotAvailableProductsList = async (
    notAvailableProductsList: ProductType[]
  ) => {
    const notAvailableProductsObj = {} as NotAvailableProductType

    const orderItems = notAvailableProductsList.map((product: ProductType) => {
      const itemObj = {} as OrderItemsType

      itemObj.index = product.index
      itemObj.quantity = 0

      return itemObj
    })

    notAvailableProductsObj.sellerName = pickupPointName
    notAvailableProductsObj.sellerId = localSellerId
    notAvailableProductsObj.products = notAvailableProductsList
    notAvailableProductsObj.orderItems = { orderItems }

    setNotAvailableProducts(notAvailableProductsObj)
  }

  const onClickContinueHandler = async () => {
    if (!localSellerId) return

    setLoading(true)

    const productsList = await buildOrderFormProductsArrays()
    const notAvailableProductsList: ProductType[] = []

    await Promise.all(
      productsList.map(async (product: ProductType) => {
        const { dataItems, logistics } = await getSellerProductInfo(
          product.productId,
          localSellerId,
          product.productQty
        )

        if (
          (dataItems as any)?.length === 0 ||
          !getProductPickupPointStatus(logistics)
        ) {
          notAvailableProductsList.push(product)
        }
      })
    )

    if (notAvailableProductsList.length > 0) {
      await mountNotAvailableProductsList(notAvailableProductsList)
      setStep(4)
      setLoading(false)
    } else {
      switchSeller(pickupPointName, localSellerId, pickUpPointFriendlyName)
    }
  }

  const autoUpdatePickupDataHandler = () => {
    setPickupPointName(deliverySpecifications?.pickupPointName)
    setPickUpPointFriendlyName(deliverySpecifications?.pickupPointName)
    setLocalPickupPoint(deliverySpecifications?.sellerId)
    setLocalSellerId(deliverySpecifications?.sellerId)
  }

  useEffect(() => {
    deliverySpecifications?.pickupPointName?.length &&
      autoUpdatePickupDataHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addressCoordinates = {
    long: address.geoCoordinates[0],
    lat: address.geoCoordinates[1],
  }

  const pickupPointsWithDistance = distanceFromPickupPoints(
    addressCoordinates,
    pickupPoints
  )

  return (
    <div className={styles.container}>
      <CloseButton />
      <PickupPointModalHeader onSetStep={setStep} />
      {pickupPointsWithDistance && (
        <div className={styles.modeList}>
          {pickupPointsWithDistance.map((point) => (
            <PickupPointRadio
              key={point.pickupPoint.id}
              pickupPoint={point}
              onPickupPoint={onChangePickupInputRadio}
              localPickupPoint={localPickupPoint}
            />
          ))}
        </div>
      )}

      {loading ? (
        <div className="tc pt6">
          <Spinner color="currentColor" size={20} />
        </div>
      ) : (
        <button
          className={styles.button}
          onClick={onClickContinueHandler}
          disabled={!localSellerId}
        >
          Continuar
        </button>
      )}
    </div>
  )
}

export default PickupOptionsModal

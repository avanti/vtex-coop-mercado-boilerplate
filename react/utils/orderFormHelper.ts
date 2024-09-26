interface CustomMinicartOrderFormItem extends OrderFormItem {
  customSkuUnification?: {
    // isDividedByPromo: boolean
    unifiedQuantity: number
  }
}

interface AddToCartPayload {
  id: string
  quantity: number
  seller: string
  index?: number
}

const calcDuplicatedSkuAvarageSellingPrice = (
  orderForm: OrderForm,
  skuId: string
): number => {
  const { items } = orderForm
  let sellingPricesSum = 0
  let count = 0
  for (const item of items) {
    if (item.id === skuId) {
      count += item.quantity
      sellingPricesSum += item.sellingPrice * item.quantity
    }
  }
  return sellingPricesSum / count
}

const calcTotalPerSku = (orderFormItem: OrderFormItem): number | null => {
  const total = orderFormItem?.priceDefinition?.total || null
  return total
}

const calcSkusTotalPrice = (orderForm: OrderForm): number | null => {
  const { items } = orderForm
  let total = 0
  for (const item of items) {
    const totalPerSku = calcTotalPerSku(item)
    if (!totalPerSku) {
      return null
    }
    total += totalPerSku
  }
  return total
}

const getItemByIdFromTotalizers = (
  id: string,
  orderForm: OrderForm
): null | Totalizer => {
  const { totalizers } = orderForm
  const totalizer = totalizers.find((item) => item.id === id)
  if (!totalizer) {
    return null
  }

  return totalizer
}

/**
 * This method joins split skus in the orderForm. A sku can be split in two when some kinds of promotions are applied
 */
const unifyOrderFormItemsOfTheSameSku = (
  orderFormItems: OrderFormItem[]
): CustomMinicartOrderFormItem[] => {
  const newOf = [...orderFormItems]
  const filteredItems = newOf.reduce(
    (
      nonDuplicatedItems: CustomMinicartOrderFormItem[],
      item: OrderFormItem
    ) => {
      const alreadyExistingItem = nonDuplicatedItems.find(
        (nonDuplicatedItem) => nonDuplicatedItem.id === item.id
      )
      if (!alreadyExistingItem) {
        nonDuplicatedItems.push(item)
      } else {
        alreadyExistingItem.customSkuUnification = {
          unifiedQuantity: alreadyExistingItem.quantity + item.quantity,
        }
      }
      return nonDuplicatedItems
    },
    []
  )
  return filteredItems
}

const mapOrderFormItemToAddToCartPayload = (
  orderFormItem: OrderFormItem
): AddToCartPayload => {
  return {
    id: orderFormItem.id,
    quantity: orderFormItem.quantity,
    seller: orderFormItem.seller,
  }
}

const mapOrderFormItemsFromApiToHook = (
  apiOrderFormItems: any[]
): OrderFormItem[] => {
  return apiOrderFormItems.map((item) => {
    const imageId = item.imageUrl.substring(
      Number(item.imageUrl.indexOf('/ids/')) + 5,
      item.imageUrl.search(/-(\d){2,}-(\d){2,}\//)
    )
    return {
      additionalInfo: {
        brandName: item.brandName,
        __typename: 'ItemAdditionalInfo',
      },
      attachments: item.attachments,
      attachmentOfferings: item.attachmentOfferings,
      bundleItems: item.bundleItems,
      parentAssemblyBinding: item.parentAssemblyBinding,
      parentItemIndex: item.parentItemIndex,
      sellingPriceWithAssemblies: item.sellingPriceWithAssemblies,
      options: item.options,
      availability: item.availability,
      detailUrl: item.detailUrl,
      id: item.id,
      imageUrls: {
        at1x: `//coopsp.vteximg.com.br/arquivos/ids/${imageId}-96-auto`,
        at2x: `//coopsp.vteximg.com.br/arquivos/ids/${imageId}-192-auto`,
        at3x: `//coopsp.vteximg.com.br/arquivos/ids/${imageId}-288-auto`,
        __typename: 'ImageUrls',
      },
      listPrice: item.listPrice,
      manualPrice: item.manualPrice,
      measurementUnit: item.measurementUnit,
      modalType: item.modalType,
      name: item.name,
      offerings: item.offerings,
      price: item.price,
      priceTags: item.priceTags,
      productCategories: item.productCategories,
      productCategoryIds: item.productCategoryIds,
      productRefId: item.productRefId,
      productId: item.productId,
      quantity: item.quantity,
      seller: item.seller,
      sellingPrice: item.sellingPrice,
      skuName: item.skuName,
      skuSpecifications: item.skuSpecifications,
      unitMultiplier: item.unitMultiplier,
      uniqueId: item.uniqueId,
      refId: item.refId,
      isGift: item.isGift,
      priceDefinition: item.priceDefinition,
      imageUrl: item.imageUrl,
    }
  })
}

export {
  CustomMinicartOrderFormItem,
  AddToCartPayload,
  calcTotalPerSku,
  calcSkusTotalPrice,
  getItemByIdFromTotalizers,
  unifyOrderFormItemsOfTheSameSku,
  mapOrderFormItemToAddToCartPayload,
  mapOrderFormItemsFromApiToHook,
  calcDuplicatedSkuAvarageSellingPrice,
}

type ThirdLevelType = {
  __editorItemTitle: string
  link?: string
}

type SecondLevelType = {
  __editorItemTitle: string
  link?: string
  thirdLevel: ThirdLevelType[]
  showAllSwitch: boolean
}

type FirstLevelType = {
  __editorItemTitle: string
  banner: string
  icon: string
  link?: string
  secondLevel: SecondLevelType[]
}
type ProductAndQueryCustom = {
  query: Record<string, any>
  product: MaybeProduct
  children: JSX.Element[] | JSX.Element
}

type ListContextPropsCustom = {
  list: JSX.Element[]
  children: JSX.Element[] | JSX.Element
}

type TimeLinePointType = {
  __editorItemTitle: string
  description: string
  image: string
  slideTitle: string
  year: string
}

type PickupPointAddress = {
  addressId: string
  addressType: string
  city: string
  complement: string
  country: string
  geoCoordinates: [string, string]
  isDisposable: boolean
  neighborhood: string
  number: string
  postalCode: string
  receiverName: string
  reference: string
  state: string
  street: string
}

type PickupPointBusinessHours = {
  ClosingTime: string
  DayOfWeek: number
  OpeningTime: string
}

type PickupPointType = {
  address: PickupPointAddress
  id: string
  isActive: boolean
  friendlyName: string
}

type DeliverySellerType = {
  id: string
  logo: string
  name: string
  price: string
}

type DeliverySpecificationsType = {
  postalCode: string
  isDelivery: boolean
  pickupPointName: string
  sellerId: string
}

type SLAS = {
  slas: {
    price: number
    deliveryChannel: string
    availableDeliveryWindows: any
  }[]
}

type SLA = {
  price: number
  deliveryChannel: string
  name: string
  availableDeliveryWindows: any
}

type ProductType = {
  productImg: string
  productName: string
  productQty: number
  productId: string
  index: number
}

type OrderItemsType = {
  index: number
  quantity: number
}

type CartUpdateType = {
  orderItems: OrderItemsType[]
}

type NotAvailableProductType = {
  sellerId: string
  sellerName: string
  products: ProductType[]
  orderItems: CartUpdateType
}

declare function fbq(s: string, t: string, o?: any): void
declare module '*.gql'

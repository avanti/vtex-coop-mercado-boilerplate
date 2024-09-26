export interface PickupPoint {
  id: string
  isActive: boolean
  friendlyName: string
  address: Address
  __typename: string
}
export interface Address {
  city: string
  number: string
  street: string
  state: string
  postalCode: string
  neighborhood: string
  geoCoordinates: number[]
  __typename: string
}

type CoordinatePoint = {
  lat: number
  long: number
}

export type DistantPickupPoints = {
  pickupPoint: PickupPoint
  distanceTo: number
}

const degreesToRadians = (deg: number) => (deg * Math.PI) / 180

export const distanceBetweenTwoGeoCoordinates = (
  point1: CoordinatePoint,
  point2: CoordinatePoint
) => {
  const earthRadius = 6371
  const diffLat = degreesToRadians(point2.lat - point1.lat)
  const diffLong = degreesToRadians(point2.long - point1.long)

  const aux =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(degreesToRadians(point1.lat)) *
      Math.cos(degreesToRadians(point2.lat)) *
      Math.sin(diffLong / 2) *
      Math.sin(diffLong / 2)

  const aux2 = 2 * Math.atan2(Math.sqrt(aux), Math.sqrt(1 - aux))

  return earthRadius * aux2
}

export const distanceFromPickupPoints = (
  currentCoordinate: CoordinatePoint,
  pickupPoints: PickupPoint[]
) => {
  const formattedPickupPoints = pickupPoints.reduce((acc, curr) => {
    const [long, lat] = curr.address.geoCoordinates

    acc.push({
      pickupPoint: curr,
      distanceTo: distanceBetweenTwoGeoCoordinates(currentCoordinate, {
        lat,
        long,
      }),
    })

    return acc
  }, [] as DistantPickupPoints[])

  return formattedPickupPoints.sort((a, b) => a.distanceTo - b.distanceTo)
}

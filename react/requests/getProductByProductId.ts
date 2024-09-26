const getProductByProductId = async (productId: string) => {
  try {
    const apiUrl = `/api/catalog_system/pub/products/search?fq=productId:${productId}`
    const options = { method: 'GET', headers: { Accept: 'application/json' } }

    const request = await fetch(apiUrl, options)
    const allowedStatus = [200, 201, 204]

    if (!allowedStatus.includes(request.status)) throw new Error('')

    return request.json()
  } catch (_) {
    return false
  }
}

export default getProductByProductId

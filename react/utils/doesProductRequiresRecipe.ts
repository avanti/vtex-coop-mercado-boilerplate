import { Product } from 'vtex.product-context/react/ProductTypes'

const doesProductRequiresRecipe = (product: Product) => {
  if (!product) return false

  const recipeSpecification = product?.properties?.find(
    (property:any) =>
      property.name.toLowerCase() === 'receita obrigatória' &&
      property.values?.[0].toLowerCase() === 'exige envio de receita'
  )

  return !!recipeSpecification
}

export default doesProductRequiresRecipe

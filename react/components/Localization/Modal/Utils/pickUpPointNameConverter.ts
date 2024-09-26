export function pickUpPointNameConverter(storeName: string) {
  let convertedName = storeName

  if (storeName.toLocaleLowerCase().includes('coop')) {
    const name = storeName.split('Coop')[1].trim()
    convertedName = `Coop - ${name}`
  }

  return convertedName
}

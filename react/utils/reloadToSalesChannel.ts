const reloadToSalesChannel = (salesChannel: string): void => {
  window.location.href = `/?sc=${salesChannel}`
}

export { reloadToSalesChannel }

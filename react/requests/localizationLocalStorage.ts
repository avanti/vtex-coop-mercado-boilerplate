const localizationKey = 'custom-localization'

const get = () => {
  const data = localStorage.getItem(localizationKey)
  if (!data) return
  const localizationLocalStorage = JSON.parse(data)

  return localizationLocalStorage
}

const set = (data: any) => {
  const local = get()
  const newData = {
    ...local,
    ...data,
  }

  localStorage.setItem(localizationKey, JSON.stringify(newData))
}

export { get, set }

const setRegionIdInSession = async (regionId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      public: {
        regionId: {
          value: regionId,
        },
      },
    }),
  }

  return fetch('/api/sessions', options)
}

export default setRegionIdInSession

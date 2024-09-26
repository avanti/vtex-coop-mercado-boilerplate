const checkIfUserIsCooperado = async (email: string): Promise<boolean> => {
  // try {
  const url = '/verifycoop'

  const data = { email }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  }

  const request = await fetch(url, options)
  const parsedResult = await request.json()
  // console.log('parsedResult', parsedResult)

  if (parsedResult.errorCode === 'CPFNOTFOUND')
    throw new Error(parsedResult.errorCode)
  if (request.status !== 200) throw new Error('')

  if (parsedResult.isCooperado) {
    return true
  }

  return false

  /* } catch (_e) {
    console.log(_e)
    //return false
  } */
}

export default checkIfUserIsCooperado

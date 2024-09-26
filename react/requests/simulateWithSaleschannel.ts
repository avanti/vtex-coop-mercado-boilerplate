type SimulateWithSaleschannelType = {
  salesChannel: string
  body: any
}

const simulateWithSaleschannel = async ({
  salesChannel,
  body,
}: SimulateWithSaleschannelType) => {
  try {
    const url = `/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=${salesChannel}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    }

    const request = await fetch(url, options)
    if (request.status !== 200) throw new Error()

    return await request.json()
  } catch (_err) {
    return false
  }
}

export default simulateWithSaleschannel

const deliveryTimeModal = (availableDeliveryWindows: any) => {
  if (!availableDeliveryWindows) return
  const todayDate = new Date()
  const nextWindow = availableDeliveryWindows[0]
  const nextWindowDateStart = new Date(nextWindow?.startDateUtc?.replace('+00:00', ''))
  const nextWindowDateEnd = new Date(nextWindow?.endDateUtc?.replace('+00:00', ''))
  // const calcDeliveryMinutes = Math.floor(
  //   ((nextWindowDateEnd.getTime() - todayDate.getTime()) % (1000 * 60 * 60)) /
  //     (1000 * 60)
  // )
  // const calcDeliveryHours =
  //   calcDeliveryMinutes <= 30
  //     ? Math.floor(
  //         ((nextWindowDateEnd.getTime() - todayDate.getTime()) / (1000 * 60 * 60)) % 24
  //       )
  //     : Math.ceil(
  //         ((nextWindowDateEnd.getTime() - todayDate.getTime()) / (1000 * 60 * 60)) % 24
  //       )
  const differenceDays = nextWindowDateEnd.getDate() - todayDate.getDate()

  if (differenceDays === 0) {
    return {
      title: 'Hoje',
      time: `das ${nextWindowDateStart.getHours()}h às ${nextWindowDateEnd.getHours()}h`
    }
  } else if (differenceDays === 1) {
    return {
      title: 'Amanhã',
      time: `das ${nextWindowDateStart.getHours()}h às ${nextWindowDateEnd.getHours()}h`
    }
  } else {
    return {
      title: 'em',
      time: `${nextWindowDateStart.toLocaleDateString('pt-BR', {day: 'numeric', month: "long"})}`
    }
  }
}

export default deliveryTimeModal

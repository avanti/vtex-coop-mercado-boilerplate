import { useState, useEffect } from 'react'

import getSession from '../requests/getSession'
import isAuthenticated from '../utils/isAuthenticated'
import isSalesChannel2 from '../utils/isSalesChannel2'

const useVerifyUserStatus = () => {
  const [userStatus, setUserStatus] = useState(0)

  const verifyUserStatusHandler = async () => {
    const sessionData = await getSession()
    const isRegisteredOnCoopPolicy = isSalesChannel2(sessionData)
    const userIsAuthenticated = isAuthenticated(sessionData)

    if (userIsAuthenticated) {
      if (isRegisteredOnCoopPolicy) {
        setUserStatus(2)
      } else {
        setUserStatus(1)
      }
    }
  }

  useEffect(() => {
    verifyUserStatusHandler()
  }, [])

  return userStatus
}

export default useVerifyUserStatus

import { useState, useEffect } from 'react'

const useMediaQuery = (width: number, query: 'min' | 'max') => {
  const [mediaStatus, setMediaStatus] = useState(false)

  const validateQuery = (): boolean => {
    const screenWidth = window.innerWidth
    let status = false

    if (query === 'min') {
      if (screenWidth >= width) status = true
    }

    if (query === 'max') {
      if (screenWidth <= width) status = true
    }

    return status
  }

  useEffect(() => {
    const status = validateQuery()
    setMediaStatus(status)
  }, [window.innerWidth])

  return mediaStatus
}

export default useMediaQuery

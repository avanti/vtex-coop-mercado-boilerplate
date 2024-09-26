import React from 'react'

import useMediaQuery from '../../../../hooks/useMediaQuery'

const MarkerLocalizationIcon = () => {
  const matchMedia = useMediaQuery(768, 'max')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={matchMedia ? 15 : 25}
      height={matchMedia ? 25 : 35}
      fill="none"
      viewBox="0 0 12 17"
    >
      <path
        fill={matchMedia ? '#fa6e50' : '#002846'}
        fillRule="evenodd"
        d="M10.5 6.42c0 2.375-1.095 4.58-2.377 6.244a12.412 12.412 0 01-1.798 1.905c-.12.101-.23.187-.325.257a6.788 6.788 0 01-.325-.257 12.412 12.412 0 01-1.798-1.905C2.595 10.999 1.5 8.795 1.5 6.42c0-2.224 1.934-4.17 4.5-4.17s4.5 1.946 4.5 4.17zm1.5 0C12 12.07 6.831 16.5 6 16.5c-.831 0-6-4.429-6-10.08C0 3.288 2.686.75 6 .75s6 2.538 6 5.67zm-4.5.33a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm1.5 0a3 3 0 11-6 0 3 3 0 016 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default MarkerLocalizationIcon

import IntlMessageFormat from 'intl-messageformat'

function formatMessage(message: string, locales?: string) {
  const messageFormat = new IntlMessageFormat(message, locales || 'pt-BR')

  return messageFormat.format()
}

export default formatMessage

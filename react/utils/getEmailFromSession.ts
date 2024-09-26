export interface Session {
  id: string
  namespaces: {
    [key: string]: Record<string, unknown>
    profile: Record<string, { value: string }>
    store: Record<string, { value: string }>
    authentication: Record<string, { value: string }>
  }
}

const getEmailFromSession = (session: Session) => {
  return session?.namespaces?.authentication?.storeUserEmail?.value
}

export default getEmailFromSession

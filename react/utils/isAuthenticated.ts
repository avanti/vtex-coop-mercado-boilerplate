export interface Session {
  id: string
  namespaces: {
    [key: string]: Record<string, unknown>
    profile: Record<string, { value: string }>
    store: Record<string, { value: string }>
  }
}

const isAuthenticated = (session: Session) => {
  return session?.namespaces?.profile?.isAuthenticated?.value === 'true'
}

export default isAuthenticated

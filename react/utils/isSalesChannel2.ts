export interface Session {
  id: string
  namespaces: {
    [key: string]: Record<string, unknown>
    public: Record<string, { value: string }>
    store: Record<string, { value: string }>
  }
}

const isSalesChannel2 = (session: Session | undefined) => {
  return session?.namespaces?.store?.channel?.value === '2'
}

export default isSalesChannel2

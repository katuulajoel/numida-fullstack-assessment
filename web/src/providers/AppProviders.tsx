import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'
import { apolloClient } from '../graphql/client'

interface AppProvidersProps {
  children: ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AppProviders

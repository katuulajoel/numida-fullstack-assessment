import { ApolloClient, InMemoryCache } from '@apollo/client'
import env from '../config/env'

export const apolloClient = new ApolloClient({
  uri: env.graphqlUrl,
  cache: new InMemoryCache(),
})

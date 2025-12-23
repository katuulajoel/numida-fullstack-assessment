const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:2024'
const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:2024/graphql'

const env = {
  apiUrl,
  graphqlUrl,
}

export default env

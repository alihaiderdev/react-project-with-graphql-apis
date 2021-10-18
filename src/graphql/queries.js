import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

export const GET_USER_LIST = gql`
  query {
    usersList {
      id
      name
      email
      gender
      status
      createdAt
      updatedAt
    }
  }
`;

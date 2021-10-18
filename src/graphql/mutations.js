import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $gender: String!, $status: Int!) {
    createUser(name: $name, email: $email, gender: $gender, status: $status) {
      success
      message
      error
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $name: String!, $email: String!, $gender: String!, $status: Int!) {
    updateUser(id: $id, name: $name, email: $email, gender: $gender, status: $status) {
      success
      message
      error
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      success
      message
      error
    }
  }
`;

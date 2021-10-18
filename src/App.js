import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/' component={AddUser} />
          <Route exact path='/home' component={AddUser} />
          <Route exact path='/user-list' component={UserList} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;

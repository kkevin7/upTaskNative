import {Platform} from 'react-native';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';

const httpLink = createHttpLink({
  uri:
    Platform.OS === 'ios'
      ? 'http://localhost:4000/'
      : 'http://192.168.1.17:4000/',
});

const authLink = setContext(async (_, {headers}) => {
  //Leer token
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;

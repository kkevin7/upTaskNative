import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {Platform} from 'react-native';

const uri = Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://192.168.1.17:4000/';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri
    })
});

export default client;
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
const HTTP_HOST = 'https://cintanegrasamuel.herokuapp.com/';
const httpLink = new createUploadLink({
  uri: HTTP_HOST
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    httpLink,
  ]),
  cache,
});
export default client;
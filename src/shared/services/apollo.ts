import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { getToken } from '@/shared/utils';
import { GRAPHQL_URL } from '@/shared/constant';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = new SetContextLink(({ headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client };

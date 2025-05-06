import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const AUTH_TOKEN = '__drops_token';
const httpLink = new HttpLink({ uri: 'http://localhost:8080/api/graphql' });
  
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token || null,
        },
    };
});

const link = authLink.concat(httpLink);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export function setGraphqlHeaders(_token: string | undefined) {
    const token = _token ?? localStorage.getItem(AUTH_TOKEN);
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token || null,
            },
        };
    });

    client.setLink(authLink.concat(httpLink));
}

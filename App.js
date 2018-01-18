import React, {PureComponent} from 'react';
import {AsyncStorage} from "react-native";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {persistCache} from "apollo-cache-persist";
import {ApolloProvider} from "react-apollo";
import AppContainer from "./src/container/app";
import {setContext} from "apollo-link-context";
import {getToken} from "./src/feature/login/utils/loginToken";

const httpLink = new HttpLink({
    uri: "http://localhost:3000/api"
});

const authLink = setContext(async (req, { headers }) => {
    let token = await getToken();
    token = JSON.parse(token);

    return {
        ...headers,
        headers: {
            authentication: token ? `${token.access_token}` : null,
            "x-refresh-token": token ? token.refresh_token : null
        },
    };
});

const cache = new InMemoryCache();

persistCache({
    cache,
    storage: AsyncStorage,
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
});

export {client};

export default class AppRoot extends PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <AppContainer/>
            </ApolloProvider>
        )
    }
}
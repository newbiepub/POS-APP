import React, {PureComponent} from 'react';
import {AsyncStorage} from "react-native";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {InMemoryCache, IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./src/utils/fragmentMatcher.json";
import {persistCache} from "apollo-cache-persist";
import {ApolloProvider} from "react-apollo";
import AppContainer from "./src/container/app";
import {setContext} from "apollo-link-context";
import {getToken} from "./src/feature/login/utils/loginToken";
import { Provider } from "react-redux";
import store from "./src/store/store";

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
}); // Fragment Matcher

const httpLink = new HttpLink({
    uri: "http://localhost:3000/api"
});

const authLink = setContext(async (req, {headers}) => {
    try {
        let token = await getToken();

        return {
            ...headers,
            headers: {
                authentication: token ? `${token.access_token}` : null,
                "x-refresh-token": token ? token.refresh_token : null
            },
        };
    }
    catch (e) {
        console.log(e);
        console.warn("error - authLink");
        return {
            ...headers
        }
    }
});

const cache = new InMemoryCache({fragmentMatcher});

persistCache({
    cache,
    storage: AsyncStorage,
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
});

// Popup Configs


export {client};

export default class AppRoot extends PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </ApolloProvider>
        )
    }
}
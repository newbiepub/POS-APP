import React, {PureComponent} from 'react';
import {AsyncStorage} from "react-native";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {InMemoryCache, IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import {toIdValue} from "apollo-utilities";
import introspectionQueryResultData from "./src/utils/fragmentMatcher.json";
import {persistCache} from "apollo-cache-persist";
import {ApolloProvider} from "react-apollo";
import AppContainer from "./src/container/app";
import {setContext} from "apollo-link-context";
import {getToken, removeToken} from "./src/feature/login/utils/loginToken";
import {Provider} from "react-redux";
import store from "./src/store/store";
import {onError} from "apollo-link-error";
import { Alert } from "react-native";

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
                "Authentication": token ? token.access_token : null,
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

const errorLink = onError(({graphQLErrors, networkError, response}) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
            console.warn("MESSAGE - ", message);
            // Catch Error Unauthorized
            if(message === "Unauthorized" || message === "Token is expired" || message === "Topology was destroyed") {
                // Remove token
                Alert.alert('Thông báo', "Phiên đăng nhập hết hạn mời đăng nhập lại", [{
                    text: "OK", onPress: () => {
                        removeToken(); // Remove Token
                        client.resetStore(); // Reset store when user logout
                    }
                }]);
            }
        });

    if (networkError) console.warn(`[Network error]: ${networkError}`);
});

/**
 * Cache Resolvers
 * @type {InMemoryCache}
 */

function dataIdFromObject(result) {
    if (result.__typename) {
        if (result._id !== undefined) {
            return `${result.__typename}:${result.id}`;
        }
    }
    return null;
}

function inventoryHistoryFromObject (result) {
    console.warn(JSON.stringify(result, null, 4));
    if (result.__typename) {
        if (result._id !== undefined) {
            return `${result.__typename}:${result._id}:${result.type}`;
        }
    }
    return null;
}

const cache = new InMemoryCache({
    fragmentMatcher
});

persistCache({
    cache,
    storage: AsyncStorage,
});

const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache
});
// Popup Configs


export {client};

export default class AppRoot extends PureComponent {
    constructor(props) {
        super(props);
    }

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
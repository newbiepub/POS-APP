import React, {PureComponent} from 'react';
import {AsyncStorage} from "react-native";
import App from "./feature/app.js";
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {persistCache} from 'apollo-cache-persist';
import {ASYNC_STORAGE} from './constant/constant';
import {setContext} from "apollo-link-context";
import {ApolloClient} from "apollo-client";
import {Provider} from "react-redux";
import configureStore from './store/store';
const { persistor, store } = configureStore();
import introspectionQueryResultData from './util/fragmentTypes.json';
import Config from './config';
import {PersistGate} from 'redux-persist/integration/react'

const authLink = setContext(async (req, {headers}) => {
    let authToken = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN);

    authToken = JSON.parse(authToken);
    return {
        ...headers,
        headers: {
            authentication: authToken ? `${authToken.access_token}` : null,
            "x-refresh-token": authToken ? authToken.refresh_token : null
        },
    };
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});
const cache = new InMemoryCache({
    fragmentMatcher, dataIdFromObject: object => {
        switch (object.__typename) {
            case "ProductInventoryEmployee": {
                return object._id
            }
            default: {
                return object._id
            }
        }
    }
});
const httpLink = new HttpLink({
    uri: `${Config.api}/api`
});

persistCache({
    cache,
    storage: AsyncStorage,
});
const client = new ApolloClient({

    link: authLink.concat(httpLink),
    cache: cache,
});

export default class AppRoot extends PureComponent {
    render() {

        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App client={client}/>
                    </PersistGate>
                </Provider>
            </ApolloProvider>
        )
    }
}

export {client}
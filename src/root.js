import React, {PureComponent} from 'react';
import {AsyncStorage} from "react-native";
import App from "./feature/app.js";
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache,IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {persistCache} from 'apollo-cache-persist';
import {ASYNC_STORAGE} from './constant/constant';
import {setContext} from "apollo-link-context";
import {ApolloClient} from "apollo-client";
import {Provider} from "react-redux";
import store from './store/store';
import introspectionQueryResultData from './util/fragmentTypes.json';

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
const cache = new InMemoryCache({ fragmentMatcher,dataIdFromObject: object => {
    switch(object.__typename)
    {

        case "ProductInventoryEmployee": {
            return object.product._id
        }
        default:{
            return object._id
        }
    }
}  });
const httpLink = new HttpLink({
    uri: "http://localhost:3000/api"
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
                    <App client={client}/>
                </Provider>
            </ApolloProvider>
        )
    }
}

export {client}
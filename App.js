import React, {PureComponent} from 'react';
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {InMemoryCache, IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./src/utils/fragmentMatcher.json";
import AppContainer from "./src/container/app";
import {setContext} from "apollo-link-context";
import {getToken, removeToken} from "./src/feature/login/utils/loginToken";
import {Provider} from "react-redux";
import store from "./src/store/store";
import {onError} from "apollo-link-error";
import { Alert } from "react-native";
import config from "./src/configs";

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
}); // Fragment Matcher

const httpLink = new HttpLink({
    uri: config.api + '/api'
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

    if (networkError) Alert.alert("Thông báo", "Lỗi kết nối vui lòng kiểm tra lại kết nối");
});

const cache = new InMemoryCache({
    fragmentMatcher
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
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        )
    }
}
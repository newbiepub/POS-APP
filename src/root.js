import React, {PureComponent} from 'react';
import { Provider } from 'react-redux';
import App from "./component/app.js";
import store from "./store/configureStore";

export default class AppRoot extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
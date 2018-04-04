import {createStore, applyMiddleware,compose} from "redux"
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStoreWithMiddleware(rootReducer);
export default () => {
    let store = createStore(
        persistedReducer,
        {},
        compose(
            applyMiddleware(thunk),
        )
    )
    let persistor = persistStore(store);
    return { store, persistor }
}
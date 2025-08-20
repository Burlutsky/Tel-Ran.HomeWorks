import { combineReducers, compose, createStore } from "redux";
import { calcReducer } from "../reducers/calc";

const rootReducer = combineReducers({
    calc: calcReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Redux DevTools (classic)
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const store = createStore(rootReducer, composeEnhancers());

export default store;

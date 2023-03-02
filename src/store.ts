import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import TokenMiddleware from './middlewares/TokenMiddleware';
import reducers from './ducks';

console.log('env ', process.env.NODE_ENV)
const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...[
            thunk, 
            // createLogger({ predicate: () => process.env.NODE_ENV !== 'production' }),
            TokenMiddleware
        ])
    )
);

export default store;

import { createStore } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares'; 

const configureStore = () => {
    const store = createStore(
        reducers, middlewares
    );
 
    return store;
}

export default configureStore;
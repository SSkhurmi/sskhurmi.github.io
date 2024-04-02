import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./redux/reducers/IndexReducer";
import createSagaMiddleware from 'redux-saga';
import mySaga from "./redux/sagas/BooksSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});


// then run the saga
sagaMiddleware.run(mySaga);
export default store;
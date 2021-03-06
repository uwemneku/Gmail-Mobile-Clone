import { configureStore } from '@reduxjs/toolkit';
import selectEmailsReducer from './reducers/selectEmailsSlice';
import recievedEmailReducer from './reducers/recievedEmailSlice';
import globalModalSlice from './reducers/globalModalsSlice';

export default configureStore({
    reducer: {
        selectEmailSlice: selectEmailsReducer,
        recievedEmailSlice : recievedEmailReducer,
    }
})
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../app/features/registerSlice';
import messageReducer  from '../app/features/messageSlice';


export const store = configureStore({
    reducer: {
        register: registerReducer,
        message: messageReducer ,
    },
});

export default store;

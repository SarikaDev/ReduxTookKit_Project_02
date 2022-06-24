import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/Users/UserSlice';
import postReducer from '../Features/Posts/PostSlice'


export  const  store = configureStore({
    reducer:{

        posts: postReducer,
        users: userReducer,
    }
});

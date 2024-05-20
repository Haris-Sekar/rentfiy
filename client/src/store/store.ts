import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserReducer } from "./Reducers/UserReducers";
import { PropertyReducer } from "./Reducers/PropertyReducers";

export const store = configureStore({
    reducer: {
        user: UserReducer.reducer,
        property: PropertyReducer.reducer
    }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
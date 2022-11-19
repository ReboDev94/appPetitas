import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers,
});

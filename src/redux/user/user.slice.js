import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setGlobalError: (state, action) => {
            state.error = action.payload;
        }
        

    }
});


export const {
    setUser,
    setGlobalError
} = userSlice.actions;
export default userSlice.reducer;
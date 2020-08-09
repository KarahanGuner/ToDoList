import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        error: null
    },
    reducers: {}
});



export default userSlice.reducers;
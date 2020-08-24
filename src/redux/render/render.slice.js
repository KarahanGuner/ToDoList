import { createSlice } from '@reduxjs/toolkit';
import {  } from '../../firebase/firebase.utils';

const renderSlice = createSlice({
    name: 'renderSlice',
    initialState: {
        render: {
            lists: true,
            contents: '',
            settings: ''
        }
    },
    reducers: {
        setRender: (state, action) => {
            state.render = action.payload;
        }
    }
});


export const {
    setRender
} = renderSlice.actions;
export default renderSlice.reducer;
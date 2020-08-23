import { createSlice } from '@reduxjs/toolkit';
import {  } from '../../firebase/firebase.utils';

const renderSlice = createSlice({
    name: 'renderSlice',
    initialState: {
        lists: true,
        contents: '',
        settings: ''
    },
    reducers: {
        renderLists: (state) => {

        },
        renderContents: (state, action) => {

        },
        renderSettings: (state, action) => {

        }

    }
});


export const {
    renderLists,
    renderContents,
    renderSettings
} = renderSlice.actions;
export default renderSlice.reducer;
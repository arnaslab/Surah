import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestAyah } from './request';
import {
    STATUS_FETCHING,
    STATUS_ERROR,
    STATUS_READY
} from './constants';

export const fetchAyah = createAsyncThunk('fetchAyah', async (number) => await requestAyah(number));

const ayahSlice = createSlice({
    name: 'ayah',
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchAyah.pending, (state, action) => {
            state[action.meta.arg] = {}
            state[action.meta.arg].status = STATUS_FETCHING
        })
        .addCase(fetchAyah.fulfilled, (state, action) => {
            state[action.meta.arg].status = STATUS_READY
            state[action.meta.arg].data = action.payload
        })
        .addCase(fetchAyah.rejected, (state, action) => {
            state[action.meta.arg].status = STATUS_ERROR
            state[action.meta.arg].error = action.error.message
        })
    }
})

export default ayahSlice.reducer
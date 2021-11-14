import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestSurah } from './request';
import {
    STATUS_FETCHING,
    STATUS_ERROR,
    STATUS_READY
} from './constants';

export const fetchSurah = createAsyncThunk('fetchSurah', async (number) => await requestSurah(number));

const surahSlice = createSlice({
    name: 'surah',
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchSurah.pending, (state, action) => {
            state[action.meta.arg] = {}
            state[action.meta.arg].status = STATUS_FETCHING
        })
        .addCase(fetchSurah.fulfilled, (state, action) => {
            state[action.meta.arg].status = STATUS_READY
            state[action.meta.arg].data = action.payload
        })
        .addCase(fetchSurah.rejected, (state, action) => {
            state[action.meta.arg].status = STATUS_ERROR
            state[action.meta.arg].error = action.error.message
        })
    }
})

export default surahSlice.reducer
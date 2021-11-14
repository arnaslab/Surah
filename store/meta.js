import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestMeta } from './request';
import {
    STATUS_IDLE,
    STATUS_FETCHING,
    STATUS_ERROR,
    STATUS_READY
} from './constants';

export const fetchMeta = createAsyncThunk('fetchMeta', async () => await requestMeta());

const metaSlice = createSlice({
    name: 'meta',
    initialState: {
        status: STATUS_IDLE,
        data: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchMeta.pending, (state, action) => {
            state.status = STATUS_FETCHING
        })
        .addCase(fetchMeta.fulfilled, (state, action) => {
            state.status = STATUS_READY
            state.data = action.payload
        })
        .addCase(fetchMeta.rejected, (state, action) => {
            state.status = STATUS_ERROR
            state.error = action.error.message
        })
    }
})

export default metaSlice.reducer
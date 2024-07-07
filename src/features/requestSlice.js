import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  requests: [],
  status: null,
  error: null,
};

export const requestBook = createAsyncThunk('requests/requestBook', async (requestData) => {
  try {
    const response = await axios.post('/api/requests/request', requestData);
    console.log('Request Book Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const changeRequestStatus = createAsyncThunk('requests/changeStatus', async (requestData) => {
  try {
    const response = await axios.post('/api/requests/changeStatus', requestData);
    console.log('Request Status Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async (donorId) => {
  try {
    const response = await axios.get(`/api/requests/all/${donorId}`);
    console.log('Fetch Requests Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    clearStatus(state) {
      state.status = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestBook.pending, (state) => {
        state.status = 'Sending request...';
        toast.loading(state.status);
      })
      .addCase(requestBook.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(requestBook.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(changeRequestStatus.pending, (state) => {
        state.status = 'Changing request status...';
        toast.loading(state.status);
      })
      .addCase(changeRequestStatus.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          window.location.reload();
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(changeRequestStatus.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'Fetching requests...';
        toast.loading(state.status);
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.requests = action.payload.data;
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }

      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      });
  },
});

export default requestSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from "react-router-dom";
import { getUser } from '../utils/Utils';

const initialState = {
  user: getUser(),
  status: null,
  error: null,
  navigateTo: null,
  accountVerified: false
};

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  try {
    const response = await axios.post('/api/users/register', userData);
    console.log('Register Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
  try {
    const response = await axios.post('/api/users/login', userData);
    console.log('Login Response : ', response.data);
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const verifyAccount = createAsyncThunk('user/verifyAcc', async (userData) => {
  console.log(userData)
  try {
    const response = await axios.post('/api/users/verifyAcc', userData);
    console.log('Verify Acc Response : ', response.data);
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const changePassword = createAsyncThunk('user/changePassword', async (userData) => {
  try {
    const response = await axios.post('/api/users/changePassword', userData);
    console.log('Change Password Response : ', response.data);
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    clearStatus(state) {
      state.status = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'Registering...';
        toast.loading(state.status);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          state.navigateTo = '/login';
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'Logging in ...';
        toast.loading(state.status);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          state.user = action.payload.data.user;
          state.navigateTo = '/';
          toast.success(state.status);
          if(action.payload.data.token) {
            localStorage.setItem('user', JSON.stringify(action.payload.data.user));
            localStorage.setItem('token', action.payload.data.token);
            localStorage.setItem('isLoggedIn', true);
          }
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'Login failed, please try again';
        state.error = action.error.message;
        toast.remove();
        toast.error(state.status);
      })
      .addCase(verifyAccount.pending, (state) => {
        state.status = 'Verifying...';
        toast.loading(state.status);
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          state.accountVerified = true;
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'Changing password...';
        toast.loading(state.status);
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          state.navigateTo = '/login';
          state.accountVerified = false;
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
  },
});

export const { logout, clearStatus } = userSlice.actions;

export default userSlice.reducer;

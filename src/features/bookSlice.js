import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  books: [],
  orgBooks: [],
  status: null,
  error: null,
  navigateTo: null,
};

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
  try {
    const response = await axios.post('/api/books/add', bookData);
    console.log('Add Book Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  try {
    const response = await axios.get('/api/books/all');
    console.log('Get Books Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

export const markBookAsSold = createAsyncThunk('books/markBookAsSold', async (bookId) => {
  try {
    const response = await axios.put(`/api/books/mark-sold/${bookId}`);
    console.log('Mark Book as Sold Response : ', response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { data: error.data ?? error.response.data, status: error.status }
  }
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearStatus(state) {
      state.status = null;
      state.error = null;
    },
    filterBooks(state, action) {
      toast.loading('Filtering books...');
      const {gradeFilter, subjectFilter} = action.payload;
      try {
        const filteredBooks = state.books.filter((e) => {
          if(gradeFilter.includes(e.grade) && subjectFilter.includes(e.subject.toLowerCase())) {
            return e
          }
        })
        state.books = (gradeFilter.length > 0 && subjectFilter.length > 0) ? filteredBooks : state.orgBooks;
      } catch (error) {
        state.books = state.orgBooks;
      }
      toast.remove();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.status = 'Adding book...';
        toast.loading(state.status);
      })
      .addCase(addBook.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          state.books.push(action.payload.data.book);
          state.orgBooks = state.books;
          state.navigateTo = '/';
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'Fetching books';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.books = action.payload.data;
          state.orgBooks = state.books;
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      })
      .addCase(markBookAsSold.pending, (state) => {
        state.status = 'Marking book as sold...';
        toast.loading(state.status);
      })
      .addCase(markBookAsSold.fulfilled, (state, action) => {
        toast.remove();
        if(action.payload.status === 200 || action.payload.status === 201) {
          state.status = action.payload.data.message;
          const bookId = action.payload.id;
          state.books = state.books.filter((book) => book.id !== bookId);
          state.orgBooks = state.books;
          toast.success(state.status);
        } else {
          state.status = action.payload.data.message;
          toast.error(state.status);
        }
      })
      .addCase(markBookAsSold.rejected, (state, action) => {
        state.status = action.payload?.data?.message ?? 'Server Error! Please try again after sometime';
        state.error = action.error?.message ?? 'Server Error! Please try again after sometime';
        toast.remove();
        toast.error(state.status);
      });
  },
});

export const { filterBooks } = bookSlice.actions;
export default bookSlice.reducer;

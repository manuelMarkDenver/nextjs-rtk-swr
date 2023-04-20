import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usePosts, { baseUrl } from './usePosts';
import axios from 'axios';
import { RootState } from '@/store/store';

const initialState = {
  posts: <Post[]>[],
};

// export const fetchPostsById = createAsyncThunk(
//   'posts/fetchPostsById',
//   async (id: string) => {
//     const response = await axios
//       .get(`${baseUrl}/posts/${id}`)
//       .then((response) => response.data);
//     return response;
//   }
// );

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchPostsById.fulfilled, (state, action) => {
  //     //@ts-ignore
  //     state.posts.push(action.payload);
  //   });
  // },
});

export const { getPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;

'use client';

import React, { useMemo, useRef, useState } from 'react';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';


import usePosts, { baseUrl } from '@/features/posts/usePosts';
import { preload } from 'swr';
import { fetcher } from '@/lib/common/fetcher';
import { getPosts } from '@/features/posts/postsSlice';

import { CircularProgress } from '@mui/material';
import PostTable from '@/features/posts/PostTable';

preload(`${baseUrl}/posts`, fetcher);

const PostsContainer = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState('');

  // const inputRef = useRef(null);

  const dispatch = useDispatch();

  const {
    data,
    total,
    error,
    isLoading,
    mutate,
    pageIndex,
    setPageIndex,
    rowsPerPage,
    setRowsPerPage,
  } = usePosts(postId);

  // const handleChange = (e: any) => {
  //   setPostId(e.target.value);
  // };

  // const handleSearchClick = () => {
  //   //@ts-ignore
  //   const inputValue = inputRef.current.value ?? '';
  //   setPostId(inputValue);
  // };

  const memoizedArray = useMemo(() => {
    //@ts-ignore
    // setPosts(data);
    dispatch(getPosts(data));
    return data;
  }, [data]);
  // useEffect(() => {
  //   const fetchData = () => {
  //     //@ts-ignore
  //     console.log('here at useeffect')
  //     setPosts(memoizedArray);
  //     dispatch(getPosts(memoizedArray));
  //   };
  //   if (memoizedArray?.length) fetchData();
  // }, [memoizedArray]);

  // const handlePreviousPageClick = () => {
  //   setPageIndex(pageIndex - 1);
  // };

  // const handleNextPageClick = () => {
  //   setPageIndex(pageIndex + 1);
  // };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(0);
  };

  const handlePostChange = (e: any) => {
    setPostId(e.target.value);
    
  };

  // Table

  // headers

  if (error)
    return (
      <>
        <p className='text-red-500 mb-4'>
          Failed to fetch data. Post ${postId} not found.
        </p>

        <button onClick={() => location.reload()}>Back</button>
      </>
    );

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <PostTable
        props={{
          postId: postId,
          total: total,
          setPostId: setPostId,
          posts: memoizedArray,
          pageIndex: pageIndex,
          setPageIndex: setPageIndex,
          onPageChange: handleChangePage,
          rowsPerPage: rowsPerPage,
          onRowsPerPageChange: handleChangeRowsPerPage,
        }}
      />
    </>
  );
};

export default PostsContainer;

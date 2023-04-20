'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from '@/features/counters/counterSlice';

import usePosts, { baseUrl } from '@/features/posts/usePosts';
import { preload } from 'swr';
import { fetcher } from '@/lib/common/fetcher';
import FetchGlobalState from './fetchGlobalState';
import { getPosts } from '@/features/posts/postsSlice';

preload(`${baseUrl}/posts`, fetcher)

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [incrementAmount, setIncrementAmount] = useState('2');
  //@
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState('');
  
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount)));
  };

  const { data, error, isLoading, mutate } = usePosts(postId);


  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      setPosts(data);
      dispatch(getPosts(data));
    };
    if (data) fetchData();
  }, [data]);

  if (error)
    return (
      <>
        <p className='text-red-500 mb-4'>
          Failed to fetch data. Post ${postId} not found.
        </p>

        <button onClick={() => location.reload()}>Back</button>
      </>
    );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <br />
        <span>{count}</span>
        <br />
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <br />
        <div>
          <input
            type='text'
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            className='border border-solid border-black mr-4 text-center'
          />
          <button
            onClick={handleIncrementByAmount}
            className='bg-black text-white py-2 px-4 rounded-md'
          >
            Increment By Amount
          </button>

          <div className='my-4'>
            <input
              type='text'
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              className='border border-solid border-black mr-4 text-center'
              placeholder='enter an id here to search for a post/s'
            />
          </div>
        </div>
        {/* {posts ? (
          <p>{JSON.stringify(posts)}</p>
        ) : (
          <p>No post/s</p>
        )} */}
      </div>

      <br/>

      {/* Another Component / To fetch global state */}
      <FetchGlobalState />
    </>
  );
};

export default Counter;

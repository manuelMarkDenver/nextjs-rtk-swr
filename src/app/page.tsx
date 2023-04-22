'use client';

import React, { Suspense, useRef, useState } from 'react';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from '@/features/counters/counterSlice';

import { baseUrl } from '@/features/posts/usePosts';
import { preload } from 'swr';
import { fetcher } from '@/lib/common/fetcher';
import PostsContainer from '@/features/posts/PostsContainer';
import { CircularProgress } from '@mui/material';

preload(`${baseUrl}/posts`, fetcher);

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [incrementAmount, setIncrementAmount] = useState('2');

  const dispatch = useDispatch();

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount)));
  };

  return (
    <>
      <div className='container max-w-[1100px] mx-auto py-10'>
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
        </div>

        {/* Posts */}
        {/* {posts ? <p>{JSON.stringify(posts)}</p> : <p>No post/s</p>}
        <CustomButton
          props={{
            className: 'bg-black text-white px-3 py-1 rounded-lg mr-2 w-[100px]',
            text: 'Previous',
            onClick: handlePreviousPageClick,
          }}
        />
        <CustomButton
          props={{
            className: 'bg-black text-white px-3 py-1 rounded-lg mr-2 w-[100px]',
            text: 'Next',
            onClick: handleNextPageClick,
          }}
        /> */}

        <Suspense fallback={<CircularProgress />}>
          <PostsContainer />
        </Suspense>
      </div>
      {/* Another Component / To fetch global state */}
      {/* <FetchGlobalState /> */}
    </>
  );
};

export default Counter;

// embedded components

// type ButtonProps = {
//   className: string;
//   text: string;
//   onClick: () => void;
// };

// const CustomButton = ({ props }: { props: ButtonProps }) => {
//   return (
//     <button className={props.className} onClick={props.onClick}>
//       {props.text}
//     </button>
//   );
// };

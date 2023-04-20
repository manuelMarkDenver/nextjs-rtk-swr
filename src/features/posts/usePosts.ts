import { fetcher } from '@/lib/common/fetcher';
import { useAppDispatch } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';



export const baseUrl = 'https://jsonplaceholder.typicode.com';

const usePosts = (id: string) => {
  const postsApi = `${baseUrl}/posts/${id}`;

  const { data: posts, error, isLoading, mutate } = useSWR(postsApi, fetcher);

  return {
    data: posts,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;

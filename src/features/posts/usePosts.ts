import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetcher } from '@/lib/common/fetcher';
import { useAppDispatch } from '@/store/hooks';
import useSWR from 'swr';

export const baseUrl = 'https://jsonplaceholder.typicode.com';

const usePosts = (id: string) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const postsApi = `${baseUrl}/posts`;

  const getKey = (pageIndex: number) => {
    let endPointUrl = '';

    if (id) {
      endPointUrl = `${postsApi}/${id}`;
    }

    if (!id) {
      endPointUrl = `${postsApi}?_page=${pageIndex + 1}&_limit=${rowsPerPage}`;
    }
    return endPointUrl;
  };

  const { data, error, isLoading, mutate } = useSWR(getKey(pageIndex), fetcher);

  const flatData = data?.posts && [].concat(data?.posts);
  return {
    data: flatData,
    total: data?.totalCount,
    error,
    isLoading,
    mutate,
    pageIndex,
    setPageIndex,
    rowsPerPage,
    setRowsPerPage,
  };
};

export default usePosts;

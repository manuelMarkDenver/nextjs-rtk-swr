import axios from 'axios';

export const fetcher = (url: string) => {
  try {
    const response = axios.get(url).then((res) => {
      const posts = res.data;
      const totalCount = res?.headers['x-total-count']
        ? parseInt(res?.headers['x-total-count'])
        : 0;
      return { posts, totalCount };
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

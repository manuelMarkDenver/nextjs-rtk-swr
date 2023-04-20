import { useSelector } from 'react-redux';

const FetchGlobalState = () => {
  //@ts-ignore
  const posts = useSelector((state) => state.posts.posts);
  console.log('🚀 ~ file: index.tsx:6 ~ FetchGlobalState ~ posts:', posts);

  return (
    <>
      <div className='margin: 30px'>
        {posts ? JSON.stringify(posts.slice(0, 5)) : 'no data'}
      </div>
    </>
  );
};

export default FetchGlobalState;

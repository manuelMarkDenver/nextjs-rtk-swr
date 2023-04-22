import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import TablePagination from '@mui/material/TablePagination';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  postId: any;
  total: any;
  setPostId: (e: any) => void;
  posts: Post[];
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const PostTable = ({ props }: { props: Props }) => {
  const {
    postId,
    total,
    setPostId,
    posts,
    pageIndex,
    setPageIndex,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
  } = props;
  console.log('🚀 ~ file: PostTable.tsx:30 ~ pageIndex:', pageIndex);
  // Table comps
  const tableHeaders = posts?.length
    ? Object.keys(posts[0]).map((headers: string, index: number) => {
        return (
          <TableCell key={index} align='left' variant='head'>
            {headers.toUpperCase()}
          </TableCell>
        );
      })
    : [];

  const tableBody = posts?.map((post: Post, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell>{post.userId}</TableCell>
        <TableCell>{post.id}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.body}</TableCell>
      </TableRow>
    );
  });

  const handlePostChange = (e: any) => {
    setPostId(e.target.value);
    setPageIndex(0);
  };

  return (
    <>
      {posts ? (
        <>
          <div className='my-4'>
            <input
              type='text'
              value={postId}
              onChange={handlePostChange}
              className='border border-solid border-black mr-4 text-center'
              placeholder='enter an id here to search for a post/s'
            />
          </div>

          <TableContainer
            component={Paper}
            sx={{ maxWidth: 700, margin: 'auto' }}
          >
            <Table>
              <TableHead>
                <TableRow>{tableHeaders}</TableRow>
              </TableHead>
              <TableBody>{tableBody}</TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={total}
                    page={pageIndex}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChange}
                    showFirstButton={true}
                    showLastButton={true}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant='h3'>No Posts.</Typography>
      )}
    </>
  );
};

export default PostTable;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { PaginatedAuthors, AuthorResponse } from '../types/api';
import Pagination from './PaginationProp';

const AuthorList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching } = useQuery<PaginatedAuthors>({
    queryKey: ['authors', page],
    queryFn: () => api.getAuthors(page, pageSize),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error) return <div>Error loading authors: {error.message}</div>;
  if (!data || !data.authors || data.authors.length === 0) return <div>No authors found</div>;

  return (
    <div className="author-list">
      <h2>Authors</h2>
      {isFetching && <div>Refreshing...</div>}
      <div>
        {data.authors.map((author: AuthorResponse) => (
          <div key={author.author_id} className="author-item">
            <div className="author-name">
              <Link to={`/authors/${author.author_id}`}>{author.name}</Link>
            </div>
            <div>Quotes: {author.total_quotes}</div>
          </div>
        ))}
      </div>
      <Pagination page={page} isFetching={isFetching} data={data} setPage={setPage} />
    </div>
  );
};

export default AuthorList;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { TagResponse, PaginatedTags } from '../types/api';
import Pagination from './PaginationProp';

const TagList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching } = useQuery<PaginatedTags>({
    queryKey: ['tags', page],
    queryFn: () => api.getTags(page, pageSize),
  });

  if (isLoading) return <div>Loading tags...</div>;
  if (isError && error instanceof Error) return <div>Error loading tags: {error.message}</div>;
  if (!data || !data.tags || data.tags.length === 0) return <div>No tags found</div>;

  return (
    <div className="tag-list">
      <h2>Tags</h2>
      {isFetching && <div>Refreshing...</div>}
      <ul>
        {data.tags.map((tag: TagResponse) => (
          <li key={tag.tag_id}>
            <Link to={`/tags/${tag.tag_id}`}>
              {tag.name} ({tag.total_quotes} quotes)
            </Link>
          </li>
        ))}
      </ul>
      <Pagination page={page} isFetching={isFetching} data={data} setPage={setPage} />
    </div>
  );
};

export default TagList;

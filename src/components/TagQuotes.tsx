import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { PaginatedQuotes, ResponseQuote } from '../types/api';
import QuoteListItem from './QuoteListItem';
import { useNavigation } from '../services/navigation';
import Pagination from './PaginationProp';

const TagQuotes = () => {
  const { handleIdClick, handleAuthorClick, handleTagClick } = useNavigation();
  const { tagId } = useParams<{ tagId: string }>();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching } = useQuery<PaginatedQuotes>({
    queryKey: ['tagQuotes', tagId, page],
    queryFn: () => api.getQuotesByTag(tagId || '', page, pageSize),
    enabled: !!tagId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error) return <div>Error loading quotes: {error.message}</div>;
  if (!data || !data.quotes || data.quotes.length === 0) {
    return <div>No quotes found for this tag</div>;
  }

  return (
    <div className="tag-quotes">
      <h2>Quotes for Tag: {tagId}</h2>
      {isFetching && <div>Refreshing...</div>}
      <div>
        {data.quotes.map((quote: ResponseQuote) => (
          <QuoteListItem
            key={quote.id}
            id={quote.id}
            text={quote.text}
            author={quote.author}
            authorId={quote.author_id}
            tags={quote.tags}
            onIdClick={handleIdClick}
            onAuthorClick={handleAuthorClick}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
      <Pagination page={page} isFetching={isFetching} data={data} setPage={setPage} />
    </div>
  );
};
export default TagQuotes;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { ResponseQuote, PaginatedQuotes } from '../types/api';
import { useNavigation } from '../services/navigation';
import QuoteListItem from './QuoteListItem';
import Pagination from './PaginationProp';

const QuoteList = () => {
  const { handleIdClick, handleAuthorClick, handleTagClick } = useNavigation();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching } = useQuery<PaginatedQuotes>({
    queryKey: ['quotes', page],
    queryFn: () => api.getQuotes(page, pageSize),
  });

  if (isLoading) return <div>Loading quotes...</div>;
  if (isError && error instanceof Error) return <div>Error loading quotes: {error.message}</div>;
  if (!data || !data.quotes || data.quotes.length === 0) return <div>No quotes found</div>;

  return (
    <div className="quote-list">
      <h2>All Quotes</h2>
      {isFetching && <div>Refreshing...</div>}
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
      <Pagination page={page} isFetching={isFetching} data={data} setPage={setPage} />
    </div>
  );
};

export default QuoteList;

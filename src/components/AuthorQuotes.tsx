import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useNavigation } from '../services/navigation';
import { AuthorQuotes as AuthorQuotesType, ResponseQuote } from '../types/api';
import QuoteListItem from './QuoteListItem';

const AuthorQuotes = () => {
  const { handleIdClick, handleAuthorClick, handleTagClick } = useNavigation();
  const { authorId } = useParams<{ authorId: string }>();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isFetching } = useQuery<AuthorQuotesType>({
    queryKey: ['authorQuotes', authorId, page],
    queryFn: () => api.getQuotesByAuthor(authorId || '', page, pageSize),
    enabled: !!authorId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error) return <div>Error loading quotes: {error.message}</div>;
  if (!data) return <div>No quotes found for this author</div>;

  return (
    <div className="author-quotes">
      <h2>Quotes by {data.author}</h2>
      <p>Total Quotes: {data.total_quotes}</p>
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
      {data.pagination && (
        <div className="pagination">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1 || isFetching}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {page} of {data.pagination.pages}
          </span>
          <button
            onClick={() => setPage(Math.min(data.pagination.pages, page + 1))}
            disabled={page === data.pagination.pages || isFetching}
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorQuotes;

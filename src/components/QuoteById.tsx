import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useNavigation } from '../services/navigation';
import { ResponseQuote } from '../types/api';
import Quote from './Quote';

const QuoteById = () => {
  const { handleIdClick, handleAuthorClick, handleTagClick } = useNavigation();
  const { quoteId } = useParams();

  const {
    data: quote,
    isLoading,
    isError,
    error,
  } = useQuery<ResponseQuote>({
    queryKey: ['quote', quoteId],
    queryFn: async () => {
      if (!quoteId) throw new Error('Quote ID is required');
      const response = await api.getQuoteById(parseInt(quoteId));
      return response as ResponseQuote;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!quote) {
    return <div>No quote found</div>;
  }

  return (
    <Quote
      id={quote.id}
      text={quote.text}
      author={quote.author}
      authorId={quote.author_id}
      tags={quote.tags || []}
      onIdClick={handleIdClick}
      onAuthorClick={handleAuthorClick}
      onTagClick={handleTagClick}
    />
  );
};

export default QuoteById;

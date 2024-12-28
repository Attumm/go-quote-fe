import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ResponseQuote } from '../types/api';
import Quote from './Quote';
import { useNavigation } from '../services/navigation';

const RandomQuote: React.FC = () => {
  const { handleIdClick, handleAuthorClick, handleTagClick } = useNavigation();
  const [quote, setQuote] = useState<ResponseQuote | null>(null);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await api.getRandomQuote();
      setQuote(response);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  if (!quote) return <div>Loading...</div>;

  return (
    <div className="random-quote">
      <h2>Random Quote</h2>
      <Quote
        id={quote.id}
        text={quote.text}
        author={quote.author}
        authorId={quote.author_id}
        tags={quote.tags}
        onIdClick={handleIdClick}
        onAuthorClick={handleAuthorClick}
        onTagClick={handleTagClick}
      />
      <button onClick={fetchRandomQuote}>New Quote</button>
    </div>
  );
};

export default RandomQuote;

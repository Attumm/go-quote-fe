import React from 'react';

interface QuoteListItemProps {
  id: number;
  text: string;
  author: string;
  authorId: string;
  tags: string[];
  onIdClick?: (id: number) => void;
  onAuthorClick?: (authorId: string) => void;
  onTagClick?: (tag: string) => void;
}

const QuoteListItem: React.FC<QuoteListItemProps> = ({
  id,
  text,
  author,
  authorId,
  tags,
  onIdClick,
  onAuthorClick,
  onTagClick,
}) => {
  const truncateText = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
  };

  return (
    <div className="quote-list-item">
      <span
        onClick={() => onIdClick && onIdClick(id)}
        className="quote-id"
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        #{id}
      </span>
      <span className="quote-text">{truncateText(text, 100)}</span>
      <span
        onClick={() => onAuthorClick && onAuthorClick(authorId)}
        className="quote-author"
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        {author}
      </span>
      <span className="quote-tags">
        {tags.slice(0, 3).map((tag, index) => (
          <React.Fragment key={tag}>
            {index > 0 && ', '}
            <span
              onClick={() => onTagClick && onTagClick(tag)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {tag}
            </span>
          </React.Fragment>
        ))}
        {tags.length > 3 && '...'}
      </span>
    </div>
  );
};

export default QuoteListItem;

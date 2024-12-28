import React from 'react';

interface QuoteProps {
  id: number;
  text: string;
  author: string;
  authorId: string;
  tags: string[];
  onIdClick?: (id: number) => void;
  onAuthorClick?: (authorId: string) => void;
  onTagClick?: (tag: string) => void;
}

const Quote: React.FC<QuoteProps> = ({
  id,
  text,
  author,
  authorId,
  tags,
  onIdClick,
  onAuthorClick,
  onTagClick,
}) => {
  return (
    <div className="quote">
      <h2>
        Quote #
        <span
          onClick={() => onIdClick && onIdClick(id)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {id}
        </span>
      </h2>
      <blockquote>{text}</blockquote>
      <p>
        -
        <span
          onClick={() => onAuthorClick && onAuthorClick(authorId)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {author}
        </span>
      </p>
      <p>
        Tags:
        {tags &&
          tags.map((tag, index) => (
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
      </p>
    </div>
  );
};

export default Quote;

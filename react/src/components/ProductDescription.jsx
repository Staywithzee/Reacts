import { useState } from 'react';

function ProductDescription({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 65;

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayedText = isExpanded || !shouldTruncate ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div className={`product-description ${isExpanded ? 'expanded' : ''}`}>
      <p className="description-text">
        {displayedText}
      </p>
      {shouldTruncate && (
        <button 
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Show Less' : 'Details'}
          <span className={`chevron ${isExpanded ? 'up' : 'down'}`}>
            {isExpanded ? '▴' : '▾'}
          </span>
        </button>
      )}
    </div>
  );
}

export default ProductDescription;

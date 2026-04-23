import RatingStars from "./RatingStars";
import ProductDescription from "./ProductDescription";

function ProductCard({ name, price, discountPercentage, rating, reviews, inStock, category, image, description }) {
  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount ? price * (1 - discountPercentage / 100) : price;

  function handleAddToCart() {
    if (inStock) { 
      alert(`Added "${name}" to cart!\nPrice: $${discountedPrice.toFixed(2)}`); 
    }
  }

  return (
    <div className={`product-card ${!inStock ? "unavailable" : ""}`}>
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="product-img" loading="lazy" />
        
        {/* Availability Badge */}
        <div className={`status-pill ${inStock ? "in-stock" : "out-of-stock"}`}>
          {inStock ? "Available" : "Sold Out"}
        </div>

        {/* Sale Badge */}
        {hasDiscount && inStock && (
          <div className="sale-tag">-{discountPercentage}%</div>
        )}
      </div>

      <div className="card-content">
        <span className="category-label">{category}</span>
        <h3 className="product-name">{name}</h3>
        
        <RatingStars rating={rating} reviews={reviews} />

        <ProductDescription text={description} />
        
        <div className="card-action-bar">
          <div className="price-stack">
            {hasDiscount && (
              <span className="old-price">${price.toFixed(2)}</span>
            )}
            <span className="current-price">${discountedPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleAddToCart} 
            disabled={!inStock} 
            className="buy-button"
            aria-label={`Add ${name} to cart`}
          >
            {inStock ? "Add" : "Empty"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

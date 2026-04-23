import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

function App() {
  const availableCount = products.filter(p => p.inStock).length;
  
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Tech<span>Shop</span></h1>
          <div className="stats-badge">
            <span className="dot"></span>
            {products.length} Products | {availableCount} In Stock
          </div>
        </div>
        <p className="header-subtitle">Premium equipment for modern professionals</p>
      </header>
      
      <main className="gallery-section">
        <div className="gallery-grid">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 TechShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

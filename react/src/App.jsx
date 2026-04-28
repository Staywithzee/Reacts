import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

const API = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

function App() {
  const { data: countries, loading, error } = useFetch(API);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading countries...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className='app'>
      <header className="app-header">
        <h1>World Explorer</h1>
        <p>Explore countries across the globe</p>
      </header>

      <div className="controls">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        
        <div className="regions-filter">
          {regions.map(r => (
            <button 
              key={r} 
              onClick={() => setSelectedRegion(r)}
              className={selectedRegion === r ? 'active' : ''}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="stats">
        <p>Showing <strong>{filtered.length}</strong> of <strong>{countries.length}</strong> countries</p>
      </div>

      <div className='country-grid'>
        {filtered
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map(c => <CountryCard key={c.name.common} country={c} />)
        }
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import MealSearchList from './MealSearchList';
import { fetchRecipeSearchResults } from '../../util/ApiUtil';
import NavBar from '../../landing/NavBar';
import * as SearchFilters from './searchFilterHelper';
import '../../../styles/mealSearch.css';

export default function MealSearch() {

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    cuisine: "",
    diet: "",
    instructionsRequired: true,
    number: 100
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async e => {
    setSearchResults([]);
    setLoading(true);
    e.preventDefault();
    if (searchQuery.length > 0) {
        const results = await fetchRecipeSearchResults(searchQuery, searchFilters);
        setSearchResults(results);
    }
    setLoading(false);
  }

  return (
    <>
      <NavBar />
      <div className='search-container'>
          <section className='recipe-search-input-section'>
              <input placeholder="Search recipes" className='search-input' onChange={(e) => setSearchQuery(e.target.value)} name='recipe-search' type="text"></input>
          </section>
          <section className='recipe-search-filters-section'>
            <select name="cuisine-filter-select" className='search-filter-select' onChange={(e) => setSearchFilters(searchFilters => ({ ...searchFilters, 'cuisine': e.target.value}))}>
              <option>All Cuisines</option>
              {SearchFilters.cuisines.map((cuisine, i) => <option key={i} value={cuisine}>{cuisine}</option>)} 
            </select>

            <select name="diet-filter-select" className='search-filter-select' onChange={(e) => setSearchFilters(searchFilters => ({ ...searchFilters, 'diet': e.target.value}))}>
              <option>No Diet Restrictions</option>
              {SearchFilters.diets.map((diet, i) => <option key={i} value={diet}>{diet}</option>)}
            </select>
          </section>
          <section className='search-button-section'>
            <button className='nav-button search-button' onClick={handleSearch}>Search</button>
          </section>
        </div> 
        {loading && 
                <div className='loading-container'>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>}
        <MealSearchList recipes={searchResults} />
    </>
  )
}

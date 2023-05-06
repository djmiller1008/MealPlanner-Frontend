import React from 'react';
import MealSearchListItem from './MealSearchListItem';

export default function MealSearchList({ recipes }) {
  if (recipes.message) {
    return (
      <div className='error-div'>
        {recipes.message}
      </div>
    )
  } else if (recipes.length > 0)
    return (
      <div className='search-results-div'>
          {recipes.map((recipe, idx) => <MealSearchListItem key={idx} recipe={recipe} />)}
      </div>
  )
}

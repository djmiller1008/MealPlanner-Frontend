import React from 'react'
import { Link } from 'react-router-dom';

export default function MealPlanDisplayItem({ mealPlan }) {

  const renderNumberOfMeals = () => {
    if (mealPlan.numberOfMeals === 1) {
      return "1 meal";
    } else {
      return `${mealPlan.numberOfMeals} meals`;
    }
  }

  return (
    <Link to={`/mealPlan/${mealPlan.id}`}>
      <div className='mealplan-display-item-container'>
        <h3 className='mealplan-item-title'>{mealPlan.name.slice(1, -1)}</h3>
        <p>{renderNumberOfMeals()}</p>
      </div>
    </Link>
  )
}

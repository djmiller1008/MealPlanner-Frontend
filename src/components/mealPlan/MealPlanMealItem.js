import React from 'react'
import { useHistory } from 'react-router-dom'
import { deleteMealFromMealPlan } from '../util/ApiUtil';
import { useUser } from '../userProvider/UserProvider';

export default function MealPlanMealItem({ mealPlanId, meal }) {
  const history = useHistory();
  const user = useUser();

  const handleClick = () => {
    history.replace(`/meal/${mealPlanId}/${meal.spoonacularId}`, {meal: meal});
  }

  const handleDelete = () => {
    deleteMealFromMealPlan(mealPlanId, meal.id, user.jwt).then(response => {
      if (response.status === 200) {
        const item = document.getElementById(`meal-${meal.id}`);
        item.style.display = 'none';
      }
    })
  }

  return (
    <div id={`meal-${meal.id}`} className='mealplan-item-container'>
        <img onClick={handleClick} className='mealplan-item-image' src={meal.imageUrl} alt={meal.name} />
        <section className='mealplan-item-text-section'>
            <h2 className='mealplan-item-text' onClick={handleClick}>{meal.name}</h2>
            <p onClick={handleDelete} className='delete-meal-button'>&times;</p>
        </section>
    </div>
  )
}

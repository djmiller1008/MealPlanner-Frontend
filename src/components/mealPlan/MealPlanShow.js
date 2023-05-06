import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import NavBar from '../landing/NavBar';
import { deleteMealPlan, fetchUserMealPlanMeals } from '../util/ApiUtil';
import MealPlanMealItem from './MealPlanMealItem';
import { useUser } from '../userProvider/UserProvider';

export default function MealPlanShow() {
  const params = useParams();
  const history = useHistory();
  const user = useUser();
  const [meals, setMeals] = useState(null);
  const [mealPlan, setMealPlan] = useState("");

  useEffect(() => {
    fetchUserMealPlanMeals(params.id, user.jwt).then(result => {
      setMeals(result.data.userMealsResponse);
      setMealPlan(result.data.userMealPlanResponse);
    })
  }, [])

  const handleDelete = e => {
    e.preventDefault();
    deleteMealPlan(mealPlan.id, user.jwt).then(response => {
      if (response.status === 200) {
        history.replace("/");
      }
    })
  }

  const renderName = () => {
    if (mealPlan.name) {
      return mealPlan.name.slice(1, -1);
    }
    return "";
  }

  return (
    <>
      <NavBar />
      <div className='mealplan-show-container'>
          <section className='mealplan-show-title-container'>
            <h1 className='mealplans-display-title'>{renderName()}</h1>
            <Link className='nav-button mealplan-show-button' to={'/search'} >Add New Recipe</Link>
          </section>
          <div className='meals-display-container'>
            {meals ? meals.map((meal, idx) => <MealPlanMealItem mealPlanId={mealPlan.id} key={idx} meal={meal} />) : ""}
          </div>
          <div className='delete-mealplan-div'>
            <button onClick={handleDelete} className='delete-mealplan-button'>Delete Meal Plan</button>
          </div>
      </div>
    </>
  )
}
 
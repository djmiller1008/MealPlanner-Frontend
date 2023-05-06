import React from 'react'
import NavBar from '../../landing/NavBar'
import { useHistory } from 'react-router-dom';
import UserMealItemToggleInfo from './UserMealItemToggleInfo';

export default function UserMealItem(props) {
    const history = useHistory();
    const mealItem = props.history.location.state.meal;

    const handleBackArrowClick = e => {
        e.preventDefault();
        const mealPlanId = props.history.location.state.meal.userMealPlan.id;
        history.replace(`/mealPlan/${mealPlanId}`);
    }

    return (
        <>
            <NavBar />
            <div className='meal-item-container'>
                <div className='meal-item-title-div'>
                    <button className='back-arrow' onClick={handleBackArrowClick}>←</button>
                    <h1 className='meal-item-title'>{mealItem.name}</h1>
                </div>
                <div className='meal-item-info-div'>
                    <div className='meal-item-info-wrapper'>
                        <section className='minutes-and-servings'>
                            <p className='minutes'>{mealItem.readyInMinutes} minutes</p>
                            <p>{mealItem.servings} servings</p>
                        </section>
                    </div>
                        <section className='meal-item-image-section'>
                            <img className='meal-item-image' src={mealItem.imageUrl} alt={mealItem.name}></img>
                        </section>
                    <UserMealItemToggleInfo mealItem={mealItem} />
                </div>
            </div>
        </>
    )
}

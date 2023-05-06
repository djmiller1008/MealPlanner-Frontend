import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { fetchRecipeInfo, 
         fetchRecipeNutritionInfo,
         parseRecipeInstructions } from '../../util/ApiUtil';
import NavBar from '../../landing/NavBar';
import MealItemToggleInfo from './MealItemToggleInfo';
import '../../../styles/mealItem.css';

export default function MealItem() {
  const history = useHistory();
  const params = useParams();
  const [recipeInfo, setRecipeInfo] = useState(false);
  const [recipeNutritionInfo, setRecipeNutritionInfo] = useState({});
  const [parsedInstructions, setParsedInstructions] = useState("");
  
  useEffect(() => {
    async function getRecipeInfo() {
        const recipeInfoResponse = await fetchRecipeInfo(params.id);
        setRecipeInfo(recipeInfoResponse);
        const parsedInstructions = await parseRecipeInstructions(recipeInfoResponse.id);
        setParsedInstructions(parsedInstructions);
    }

    async function getRecipeNutritionInfo() {
      const recipeNutritionInfo = await fetchRecipeNutritionInfo(params.id);
      setRecipeNutritionInfo(recipeNutritionInfo);
    }

    getRecipeInfo();
    getRecipeNutritionInfo();
  }, [params.id]);

  const handleBackArrowClick = e => {
    e.preventDefault();
    history.replace("/search");
  }
 
  if (!recipeInfo) {
    return (   
      <>
      <NavBar />
        <div className='loading-container'>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    )
  } else if (recipeInfo.message) {
      return (
        <>
          <NavBar />
          <div className='error-div'>
            {recipeInfo.message}
          </div>
        </>
      )
  } else {
    return (
      <>
        <NavBar />
        <div className='meal-item-container'>
          <div className='meal-item-title-div'>
            <button className='back-arrow'  onClick={handleBackArrowClick}>←</button>
            <h1 className='meal-item-title'>{recipeInfo.title}</h1>
          </div>
          <div className='meal-item-info-div'>
            <div className='meal-item-info-wrapper'>
              <section className='minutes-and-servings'>
                <p className='minutes'>{recipeInfo.readyInMinutes} minutes</p>
                <p>{recipeInfo.servings} servings</p>
              </section>
              <section className='add-to-meal-plan-section'>
                <Link className='nav-button' to={{ pathname: '/addMeal',
                      state: { recipeInfo: recipeInfo,
                               recipeNutritionInfo: recipeNutritionInfo,
                               recipeInstructions: parsedInstructions }}}>
                        Add To Meal Plan</Link>
              </section>
            </div>
            <section className='meal-item-image-section'>
              <img className='meal-item-image' src={recipeInfo.image} alt={recipeInfo.title}></img>
            </section>
            <MealItemToggleInfo recipeInfo={recipeInfo} parsedInstructions={parsedInstructions} />
          </div>
        </div>
      </>
    )
  } 
}

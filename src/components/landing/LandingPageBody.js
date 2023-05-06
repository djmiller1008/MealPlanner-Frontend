import React from 'react';
import SearchImage from '../../styles/images/MealSearch.png';
import MealPlanShowImage from '../../styles/images/MealPlanShow.png';
import MealItemShowTopImage from '../../styles/images/MealItemShow.png';
import MealItemShowIngredientsImage from '../../styles/images/MealItemIngredients.png';
import MealItemShowInstructionsImage from '../../styles/images/MealItemInstructions.png';

export default function LandingPageBody() {
  return (
    <div className='body-container'>
        <section className='landing-top-section'>
            <h1 className='landing-body-title'>Meal Planning The Easy Way</h1>
        </section>
        <section className='content-section first-content'>
          <h2 className='content-section-title first-title'>Build Your Meal Plans</h2>
          <img src={SearchImage} 
                alt='Several chicken dishes being displayed after a user has typed chicken in the search bar' 
                className='landing-image imgBorder'></img>
        </section>
        <section className='content-section second-content'>
          <h2 className='content-section-title'>Plan & Organize</h2>
          <img src={MealPlanShowImage}
                alt='User dashboard featuring links to several meal plans'
                className='landing-image'></img>
        </section>
        <section className='content-section'>
          <h2 className='content-section-title'>Shop & Cook</h2>
            <div className='landing-image-container'>
              <img src={MealItemShowTopImage}
                    alt='Information to cook shrimp tacos'
                    className='landing-side-image' />
              <img src={MealItemShowIngredientsImage}
                    alt='List of ingredients to cook shrimp tacos'
                    className='landing-side-image' />
            </div>
            <img src={MealItemShowInstructionsImage}
                  alt='List of instructions to cook shrimp tacos'
                  className='landing-center-small-image' />
        </section>
        <footer>
          <div className='footer-content-div'>
            Project Developed By David Miller
          </div>
        </footer>
    </div>
  );
};

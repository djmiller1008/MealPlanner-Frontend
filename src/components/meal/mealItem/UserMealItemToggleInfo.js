import React, { useState } from 'react'

export default function UserMealItemToggleInfo({ mealItem }) {
    const [selected, setSelected] = useState('ingredients');
    const ingredients = mealItem.ingredients.slice(1, -1).split(/, (?=[\d/])/);

    const toggleInfo = (e, info) => {
        e.preventDefault();
        if (info === 'ingredients') {
            setSelected('ingredients');
        } else {
            setSelected('instructions');
        }
    }

    const renderInstructions = () => {
        return Object.values(JSON.parse(mealItem.instructions)).map((instruction, idx) => {
            return (
                <li key={idx} className='list-item instruction'>
                    <p className='instruction-number'>{idx + 1}</p>
                    {instruction}
                </li>
            )
        });
    }

    if (selected === 'ingredients') {
        return (
            <div className='meal-item-extended-info-div'>
                <section className='toggle-buttons-section'>
                    <button onClick={e => toggleInfo(e, 'ingredients')} className='toggle-info selected-toggle-info'>Ingredients</button>
                    <button onClick={e => toggleInfo(e, 'instructions')} className='toggle-info'>Instructions</button>
                </section>
                <section className='info-list-section'>
                    <ul className='info-list'>
                        {ingredients.map((ingredient, idx) => <li className='list-item' key={idx}>{ingredient}</li>)}
                    </ul>
                </section>
            </div>
        )
    } else {
        return (
            <div className='meal-item-extended-info-div'>
                <section className='toggle-buttons-section'>
                    <button onClick={e => toggleInfo(e, 'ingredients')} id='ingredients' className='toggle-info'>Ingredients</button>
                    <button onClick={e => toggleInfo(e, 'instructions')} id='instructions' className='toggle-info selected-toggle-info'>Instructions</button>
                </section>
                <section className='info-list-section'>
                    {renderInstructions()}
                </section>
            </div>
        )
    }
}

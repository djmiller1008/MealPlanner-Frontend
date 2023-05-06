import React from 'react'
import { Link } from 'react-router-dom'

export default function MealSearchListItem({ recipe }) {
  return (
    <div className='searchlist-item-div'>
        <Link className='searchlist-item-link' to={`meal/${recipe.id}`}>
          <img className='searchlist-item-image' src={recipe.image} alt={recipe.title}></img>
          <section className='searchlist-item-text-section'>
            <h3 className='searchlist-item-text'>{recipe.title}</h3>
          </section>
        </Link>
    </div>
  )
}

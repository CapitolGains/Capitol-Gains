import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Placeholder from './images/placeholder.jpg'

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={Placeholder}
              text='Politician Name'
              path='/PoliticianBio'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
import React from 'react';
import './styles.scss';

function Card(props) {
    const {id, types, name, img, evolves} = props;
    return(
      <div className='Pokemon'>
        <div className='PkmImg' style={{backgroundImage: `url(${img})`}} alt={name}>
        <p className='Id'>ID/{id}</p>
        </div>
        <h2 className="Name">{name}</h2>
        <ul className="ListType">
          {types.map((item, index) => {
            return (
              <li className="Type" key={index}>
                {item.type.name}
              </li>
            );
          })}
        </ul>
        {evolves !== 'none'
          ? <p className='Evolves'>Evolves from: <span className='Evolution'>{evolves}</span></p> 
          : <div className='NoEvol'> </div> }
      </div>
    );
}

export default Card;
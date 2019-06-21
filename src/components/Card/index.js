import React from 'react';
import './styles.scss';

function Card(props) {
    const {id, types, name, img, evolves} = props;
    return(
      <div className='Pokemon'>
        <img src={img} alt={name} />
        <p className='Id'>ID/{id}</p>
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
        {evolves !== 'none'? <p>Evolves from: {evolves}</p> : <p> </p> }
      </div>
    );
}

export default Card;
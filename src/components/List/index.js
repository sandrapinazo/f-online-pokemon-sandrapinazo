import React from 'react';
import './styles.scss'
import Card from '../Card';

function List(props) {
    return(
        <ul className='PokemonUl'>
            {props.pokemons.map(pokemon => {
                const {id, name, types, sprites, evolvesFrom} = pokemon;
                return (
                    <li key={id}>
              <Card id={id} name={name} types={types} img={sprites.front_default} evolves={evolvesFrom}/>
            </li>
                );}
            )}
        </ul>
    );
}

export default List;
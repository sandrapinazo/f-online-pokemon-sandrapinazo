import React from 'react';
import './styles.scss'
import Card from '../Card';

function List(props) {
    const filteredPkm = props.pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(props.filter.toUpperCase()));
    return(
        <ul className='PokemonUl'>
            { filteredPkm.length===0
                ? 'No matching results found.'
                : filteredPkm.map(pokemon => {
                    const {id, name, types, sprites, evolvesFrom} = pokemon;
                    return (
                        <li key={id}>
                            <Card id={id} name={name} types={types} img={sprites.front_default} evolves={evolvesFrom}/>
                        </li>);
                    }) 
                
                }
        </ul>
    );
}

export default List;
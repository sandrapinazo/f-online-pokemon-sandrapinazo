import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import Card from '../Card';

function List(props) {
    const pokemons = props.pokemons;
    return(
        <ul className='PokemonUl'>
            { pokemons.length===0
                ? 'No matching results found.'
                : pokemons.map(pokemon => {
                    const {id, name, types, sprites, evolvesFrom} = pokemon;
                    return (
                        <li key={id}>
                            <Link to={`/${id}`} className="List__link">
                                <Card id={id} name={name} types={types} img={sprites.front_default} evolves={evolvesFrom}/>
                            </Link>
                        </li>);
                    }) 
                
                }
        </ul>
    );
}

export default List;
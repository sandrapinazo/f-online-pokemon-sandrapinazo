import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss'

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            evolutions: '',
        }
        this.fetchEvols = this.fetchEvols.bind(this);
    }
    
    fetchEvols(data) {
        fetch(this.props.data.evsUrl)
        .then(response => response.json())
        .then(data => {
            const evolutionChain = [data.chain.species.name];
            evolutionChain.push(data.chain.evolves_to[0].species.name);
            evolutionChain.push(data.chain.evolves_to[0].evolves_to[0].species.name);
            this.setState({
                evolutions: evolutionChain,
            });
        })
    }
        
    

    render() {
        const pokemonData = this.props.data;            
        if (pokemonData) {
            const {name, sprites, abilities, height, weight}= pokemonData;
            const evolutions = this.state.evolutions;
            this.fetchEvols(pokemonData);
            return (   <div>
                        <img src={sprites.front_default} alt={name} />
                        <h1>{name}</h1>
                        <p>Height: {height} | Weight: {weight}</p>
                        <p>Abilities:</p>
                        <ul>
                        {abilities.map((item, index) => {
                            return (
                                <li key={index+1}>{item.ability.name}</li>
                            );
                        })}
                        </ul>
                        <p>Evolution chain: {evolutions? `${evolutions[0]} >> ${evolutions[1]} >> ${evolutions[2]}` : 'Loading...' }</p>   
                        <Link to='/'>༄  Go back</Link>
                    </div> );
        } else {
            return 'Loading...' 
        }
    }
}

export default Details
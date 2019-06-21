import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss'

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            evolutions: '',
            fetchError: '',
        }
        this.fetchEvols = this.fetchEvols.bind(this);
        this.checkEvs = this.checkEvs.bind(this);
    }
    
    fetchEvols(data) {
        fetch(this.props.data.evsUrl)
        .then(response => response.json())
        .then(data => {
            const evolutionChain = [data.chain.species.name];
            this.checkEvs(evolutionChain, data.chain.evolves_to[0]);
            console.log(data.chain.evolves_to[0]);

            this.setState({
                evolutions: evolutionChain,
            });

        })
        .catch(error => this.setState({fetchError: error}));
    }
        
    checkEvs(acc, location){
        console.log(location);
       if (location) {
           console.log(location.species.name);
           acc.push(location.species.name);
           this.checkEvs(acc, location.evolves_to[0]);
       }
    }

    render() {
        const pokemonData = this.props.data;            
        if (pokemonData) {
            const {name, sprites, abilities, height, weight}= pokemonData;
            const {evolutions, fetchError} = this.state;
            if(!this.state.evolutions){this.fetchEvols(pokemonData)};
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
                        <p>Evolution chain: { fetchError?  'An error occured.' : evolutions.length? evolutions.reduce((acc,evolution)=> acc += ` << ${evolution}`) : 'Loading...' }</p>   
                        <Link to='/'>༄  Go back</Link>
                    </div> );
        } else {
            return 'Loading...' 
        }
    }
}

export default Details
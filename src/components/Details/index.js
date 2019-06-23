import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRuler, faWeight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

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
            const evolutionChain = [[data.chain.species.name]];
            this.checkEvs(evolutionChain, data.chain.evolves_to[0]);
            this.setState({
                evolutions: evolutionChain,
            });
        })
        .catch(error => this.setState({fetchError: error}));
    }
        
    checkEvs(acc, location){
       if (location) {
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
            return ( <div className='Details_card' >
                        <Link className='Back' to='/'><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        <img className='Space' src={sprites.front_default} alt={name} />
                        <img src={sprites.back_default} alt={name} />
                        <h1>{name}</h1>
                        <span className='Space' ><FontAwesomeIcon className='Icon' icon={faRuler} /> {height} </span>
                        <span className='Space' ><FontAwesomeIcon className='Icon' icon={faWeight} /> {weight}</span>
                        <p className='Title'>Abilities</p>
                        <ul className='Abilities_list'>
                            {abilities.map((item, index) => {
                                return (
                                    <li key={index+1} className='Ability' >{item.ability.name}</li>
                                );
                            })}
                        </ul>
                        <p className='Title'>Evolution chain:</p>
                        <p>{ fetchError
                                ?  'An error occured.' 
                                : evolutions.length
                            ? evolutions.reduce((acc, evolution, index)=> acc=[...acc, <span key={index+1}><FontAwesomeIcon className='Icon' icon={faArrowRight} />{evolution}</span>]) 
                                    : 'Loading...' }
                        </p>   
                    </div> );
        } else {
            return 'Loading...' 
        }
    }
}

export default Details
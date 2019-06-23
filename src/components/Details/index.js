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
            evolutionsImgs: [],
            fetchError: '',
            fetchImgError: '',
            isLoading: true,
        }
        this.fetchEvols = this.fetchEvols.bind(this);
        this.checkEvs = this.checkEvs.bind(this);
        this.fetchImg = this.fetchImg.bind(this);
    }
    
    fetchEvols(data) {
        fetch(this.props.data.evsUrl)
        .then(response => response.json())
        .then(data => {
            const evolutionChain = [];
            const evolutionImg = [];
            this.checkEvs(evolutionChain, evolutionImg, data.chain);
            this.setState({
                evolutions: evolutionChain,
                evolutionsImgs: evolutionImg, 
            });
        })
        .catch(error => this.setState({fetchError: error}));
    }
        
    checkEvs(acc1,acc2, location){
       if (location) {
           acc1.push(location.species.name);
           this.checkEvs(acc1,acc2, location.evolves_to[0]);
           this.fetchImg(acc2,location);
           
       }
    }

    fetchImg(acc2, location){
        const arr= location.species.url.split('/');
        const id= arr[arr.length-2];
        const pkmUrl= `https://pokeapi.co/api/v2/pokemon/${id}/`;
        fetch(pkmUrl)
        .then(response => response.json())
        .then(data => {
            acc2.push(data.sprites.front_default);
            this.setState({isLoading: false});
        })
        .catch(error => this.setState({fetchImgError: error}));
    }

    render() {
        const pokemonData = this.props.data;            
        if (pokemonData) {
            const {name, sprites, abilities, height, weight}= pokemonData;
            const {evolutions, evolutionsImgs, fetchError, fetchImgError, isLoading} = this.state;
            const animation = isLoading? 'No' : 'Animate';
            if(!this.state.evolutions){this.fetchEvols(pokemonData)};
            return ( <div className={`Details_card ${animation}`} >
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
                        <ul className='Evolutions_list'>
                            { fetchImgError
                                ? 'An error occured.'
                                : !isLoading
                                    ? evolutionsImgs
                                        .sort()
                                        .map((item, index) => {
                                            return (
                                                <li key={index+1} className='Space' >
                                                    <img src={item} alt={name} />
                                                </li>
                                            );
                                         })
                                    : 'Loading...'}
                        </ul> 
                    </div> );
        } else {
            return 'Loading...' 
        }
    }
}

export default Details
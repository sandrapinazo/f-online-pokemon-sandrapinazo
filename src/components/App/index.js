import React from 'react';
import { Route, Switch } from "react-router-dom";
import Filter from '../Filter';
import List from '../List';
import Details from '../Details';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemons: [],
      isLoading: true,
      filter: '',
      fetchError: '',
    }
    this.handlerFilter = this.handlerFilter.bind(this)
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=25')
  .then(response => response.json())
  .then(data => {
    const pokemons = data.results;
    const pokemonData = pokemons.map(pokemon => {
      let thisPokemon = {};
      return fetch(pokemon.url)
        .then(response => response.json())
        .then(dataPkm => {
          thisPokemon = dataPkm;
          return fetch(dataPkm.species.url)
        })
        .then(response => response.json())
        .then(data => {
          const evolves = data.evolves_from_species;
          evolves? thisPokemon.evolvesFrom= evolves.name : thisPokemon.evolvesFrom= 'none';
          const evChain = data.evolution_chain.url;
          evChain? thisPokemon.evsUrl= evChain : thisPokemon.evsUrl= 'none';
          return thisPokemon;
        })
      }
    )
    
    Promise.all(pokemonData)
    .then(responses => {
      this.setState({
        allPokemons: responses,
        isLoading: false,
      })
    });    
  })
  .catch(error => this.setState({fetchError: error}));
  }

  handlerFilter(e) {
    this.setState({filter: e.target.value});
  }

  render() {
    const {allPokemons, isLoading, filter, fetchError}= this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact path ="/"
            render = { routerProps => (
              <React.Fragment>
                <Filter handler={this.handlerFilter} value={filter}/>
                {fetchError
                  ? 'An error occured.' 
                  :isLoading
                    ? <p>Loading...</p>
                    : <List pokemons={allPokemons.filter(pokemon => pokemon.name.toUpperCase().includes(filter.toUpperCase()))}/>
                }
              </React.Fragment>
            )}
          />
          <Route
              path="/:id"
              render={routerProps => {
                return (
                  <Details
                    data={allPokemons.find(
                      item => item.id === parseInt(routerProps.match.params.id)
                    )}
                  />
                );
              }}
            />
        </Switch>
      </div>
    );
  }
}

export default App;

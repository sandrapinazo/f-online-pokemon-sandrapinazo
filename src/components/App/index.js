import React from 'react';
import Filter from '../Filter'
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemon: [],

      filter: '',
    }
  }
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=25')
  .then(response => response.json())
  .then(data => {
    const pokemons = data.results;
    const pokemonData = pokemons.map(pokemon => fetch(pokemon.url)
        .then(response => response.json())
    );

    Promise.all(pokemonData)
      .then(responses => {
        this.setState({allPokemon: responses})
      });    
  });
  }

  render() {
    return (
      <div className="App">
        <Filter/>
      </div>
    );
  }
}

export default App;

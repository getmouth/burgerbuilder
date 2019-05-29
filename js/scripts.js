(function(){
  var pokemonRepository = (function(){
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
      return repository;
    }

    function add(pokemon) {
      repository.push(pokemon);
    }

     //loads all pokemon lists
     loadList = () => (
      fetch(apiUrl).then(resp => resp.json())
      .then(resp => {
        resp.results.forEach(item => {
          var pokemon = {
            name: item.name,
            detailUrl: item.url
          };
          add(pokemon);
        })
      })
      .catch(err => console.log(err))
    );

    loadDetails = pokemon => {
      var url = pokemon.detailUrl;

      return fetch(url).then(resp => resp.json())
                .then(details => {
                  pokemon.imageUrl = details.sprites.front_default;
                  pokemon.height   = details.height;
                  pokemon.types    = Object.keys(details.types); 
                })
                .catch(err => console.log(err));
    };

    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
    }
    
  })();

   /*******************
     Gets and Render each pokemon 
    ********************/

  pokemonRepository.loadList().then(() => {
    var allPokemons = pokemonRepository.getAll();
    console.log('all pokemons ',allPokemons)
    allPokemons.forEach(renderPokemon)
  })
  
  function renderPokemon(poke) {
    var pokeUl = document.getElementsByClassName('pokemons-list');
    var li = document.createElement('li');
    li.classList.add('poke')
    var name = poke.name;

    li.textContent = name;
    pokeUl[0].appendChild(li);

    li.addEventListener('click',() => {
      showDetails(poke)
    });
  }

  /*********************
    Displays Pokemon detailed page 
   *********************/

  showDetails = (pokemon) => {
    pokemonRepository.loadDetails(pokemon)
      .then(() => console.log(pokemon));
  }

})();

(function(){
  var pokemonRepository = (function(){
    var repository = [
      {
        name: "Charizard",
        height: 7,
        types: ['fire', 'flying']
      },
      {
        name: "Ivysaur",
        height: 1,
        types: ['grass', 'poision']
      },
      {
        name: "Charmander",
        height: 0.6,
        types: ['fire']
      }
    ]

    function getAll() {
      return repository;
    }

    function add(pokemon) {
      repository.push(pokemon);
    }
    console.log(getAll())
    return {
      add: add,
      getAll: getAll
    }
    
  })();

  /******Gets and Render each pokemon */
  var allPokemons = pokemonRepository.getAll();
  
  function renderPokemon(poke) {
    var pokeUl = document.getElementsByClassName('pokemons-list');
    var li = document.createElement('li');
    var name = poke.name;

    li.textContent = name;
    pokeUl[0].appendChild(li);

    li.addEventListener('click',() => {
      showDetails(poke)
    });


    // var height;
    // if (poke.height === 7) {
    //   height = '<span>'+ poke.height + " Wow that's big" + '</span>';
    // }else {
    //   height = poke.height;
    // }
    // console.log(pokeUl);
    //document.write('<p>' + name + ' ' + height + '</p>')
  }

  /***Displays Pokemon detailed page */

  showDetails = (pokemon) => {
    console.log('pokemon logged: ', pokemon);
  }
  

  allPokemons.forEach(renderPokemon)
  pokemonRepository.add({name: 'Kakuma', height: 0.6, types: ['Bug', 'Poison']})
  console.log(Object.keys(pokemonRepository.getAll()))
})();

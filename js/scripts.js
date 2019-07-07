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
                  pokemon.types    = details.types.map(poke => poke.type.name); 
                  console.log(details)
                  console.log(pokemon.types)

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

    var pokeUl = document.querySelector('.pokemons-list');
    var li = document.createElement('li');
    var name = poke.name;
        li.classList.add('poke')
        li.textContent = name;
        pokeUl.appendChild(li);

      pokeUl.addEventListener('click',(e) => {
        var name = e.target.innerText;
        if(name === poke.name){
          showDetails(poke)
        }

    });
  }

  /*********************
    Displays Pokemon detailed page 
   *********************/
  var $modalContainer = document.getElementById('modal-container');


  showDetails = (pokemon) => {
    pokemonRepository.loadDetails(pokemon)
      .then(() => {
        var modal    = document.createElement('div');
        var image    = document.createElement('img');
        var name     = document.createElement('h1');
        var height   = document.createElement('p');
        var types    = document.createElement('p');
        var closeBtn = document.createElement('button');
        var exist    = $modalContainer.querySelector('.modal')
        
        pokemon.types.map(type => {
          var span = document.createElement('span');
              span.innerText = type;
            return types.appendChild(span);
          
        });

      if(exist) $modalContainer.removeChild(exist);

      modal.classList.add('modal');
      image.classList.add('pokemon-img')
      types.classList.add('pokemon-types')
      closeBtn.classList.add('modal-close')
      image.setAttribute('src',pokemon.imageUrl);
      name.innerText   = pokemon.name;
      height.innerText = 'Height - ' + pokemon.height  
      closeBtn.innerText = 'Close'  
      closeBtn.addEventListener('click',hideDetails)              
          
      modal.appendChild(name);
      modal.appendChild(closeBtn);
      modal.appendChild(types);
      modal.appendChild(image);
      modal.appendChild(height);
      
      $modalContainer.appendChild(modal);
      $modalContainer.classList.add('is-visible')
     
    });
  }

  

  /*********************
    Hide Pokemon detailed page 
   *********************/

  hideDetails = () => {
    $modalContainer.classList.remove('is-visible')
  }

  window.addEventListener('keydown', (e) => {
    if(e.key=== 'Escape') {
      hideDetails();
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    if(e.target === $modalContainer) {
      hideDetails();
    }
  })

})();

<template>
    <div>
      <SearchPokemon @search="searchPokemon"></SearchPokemon>
      <section v-if="pokemon && pokemon.sprites && pokemon.sprites.front_default" class="container d-flex flex-column align-items-center">
        <div class="row py-3">
              <div class="col-12 text-center fw-bolder" id="pok-name">{{ pokemon.name.toUpperCase() }}</div>
            </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-5 card border-0 rounded-4">
            <img :src="pokemon.sprites.front_default" class="card-img" alt="pokemon-image" style="width: 300px; z-index: 1000; filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));">
          </div>
          
            
            <div class="d-flex" id="stats">
                
            </div>
          
        </div>
      </section>
      <section v-else class="container px-5 py-5 d-flex flex-column align-items-center">
        <AppLoader class="bg-transparent"></AppLoader>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AppLoader from './AppLoader.vue';
  import SearchPokemon from './SearchPokemon.vue';
  
  export default {
    name: 'PokemonDetails',
    components: {
      AppLoader,
      SearchPokemon,
    },
    props: {
      pokemon: {
        type: Object,
        default: () => ({
          sprites: {},
          name: '',
          types: [],
          stats: Array(6).fill({ base_stat: 0 }),
        }),
      },
    },
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      async searchPokemon(pokemonName) {
        if (!pokemonName) return;
  
        this.isLoading = true;
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
          this.$emit('update:pokemon', response.data);
        } catch (error) {
          console.error('Errore durante la ricerca del Pokémon:', error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
    #pok-name{
        color: #FFCE31;
        font-size: 1.5rem;
        filter: drop-shadow(5px 5px 2px rgb(0, 0, 0, 0.5));
    }
  </style>
  
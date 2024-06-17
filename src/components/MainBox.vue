<template>
  <section class="container d-flex justify-content-center my-5 py-3 text-white">
    <div id="left-box" class="pokedex-box py-2 w-75">
      <PokemonDetails 
        :pokemon="pokemon"
        @update:pokemon="updatePokemon"
        @catch-pokemon="catchPokemon"
      ></PokemonDetails>
    </div>
    <div id="right-box" class="pokedex-box w-25 overflow-y-auto">
      <PokedexList 
        :pokemons="caughtPokemons"
        @release-pokemon="releasePokemon"
      ></PokedexList>
    </div>
  </section>
</template>

<script>
import PokemonDetails from './PokemonDetails.vue';
import PokedexList from './PokedexList.vue';
import { store } from '../data/store.js';

export default {
  name: 'MainBox',
  components: {
    PokemonDetails,
    PokedexList,
  },
  props: {
    pokemon: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    caughtPokemons() {
      return store.caughtPokemons.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    updatePokemon(newPokemon) {
      this.$emit('update:pokemon', newPokemon);
    },
    catchPokemon(pokemon) {
      if (!store.caughtPokemons.some(p => p.id === pokemon.id)) {
        store.caughtPokemons.push(pokemon);
      }
    },
    releasePokemon(pokemon) {
      store.caughtPokemons = store.caughtPokemons.filter(p => p.id !== pokemon.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.pokedex-box {
  background-color: #c21616;
  border: 8px solid #90090C;
  height: 30rem;
  width: 60rem;
}
#left-box {
  border-right: -3px solid;
}
#right-box {
  border-left: -3px solid;
  &::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.9);
	border-radius: 10px;
	background-color: #CCCCCC;
  }
  &::-webkit-scrollbar
  {
    width: 12px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #ffce31;
    background-image: -webkit-linear-gradient(90deg,
                          transparent,
                          rgba(194, 22, 22, 0.4) 50%,
                          transparent,
                          transparent)
  }
}
</style>

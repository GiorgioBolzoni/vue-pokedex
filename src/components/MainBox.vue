<template>
  <section class="container d-flex justify-content-center my-5 py-3 text-white">
    <div id="left-box" class="pokedex-box py-2 w-75">
      <PokemonDetails 
        :pokemon="pokemon"
        @update:pokemon="updatePokemon"
        @catch-pokemon="catchPokemon"
      ></PokemonDetails>
    </div>
    <div id="right-box" class="pokedex-box w-25">
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
  data() {
    return {
      pokemon: {},
    };
  },
  computed: {
    caughtPokemons() {
      return store.caughtPokemons.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    updatePokemon(newPokemon) {
      this.pokemon = newPokemon;
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
  background-color: #C21616;
  border: 8px solid #90090C;
  height: 30rem;
  width: 60rem;
}
#left-box {
  border-right: -3px solid;
}
#right-box {
  border-left: -3px solid;
}
</style>

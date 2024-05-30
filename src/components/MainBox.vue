<template>
    <section class="container d-flex justify-content-center my-5 py-3 text-white">
      <div id="left-box" class="pokedex-box py-2 w-75">
        <PokemonDetails :pokemon="pokemon" @update:pokemon="updatePokemon"></PokemonDetails>
      </div>
      <div id="right-box" class="pokedex-box w-25">
        <!-- <PokedexList></PokedexList> -->
      </div>
    </section>
  </template>
  
  <script>
  import PokemonDetails from './PokemonDetails.vue';
  // import PokedexList from './PokedexList.vue';
  
  export default {
    name: 'MainBox',
    components: {
      PokemonDetails,
      // PokedexList,
    },
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
    },
    methods: {
      updatePokemon(newPokemon) {
        this.$emit('update:pokemon', newPokemon);
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
  
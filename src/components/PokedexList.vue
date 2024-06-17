<template>
  <div>
    <h4 class="text-center mt-1">My Pokédex</h4>
    <ul class="list-unstyled">
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="card mb-3">
        <div class="row g-0">
          <div class="col-4">
            <img :src="pokemon.sprites.front_default" alt="pokemon-image" class="img-fluid rounded-start">
          </div>
          <div class="col-8 d-flex align-items-center">
            <div class="card-body">
              <h5 class="card-title">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
              <button @click="release(pokemon)" class="btn btn-danger btn-sm">Release</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PokedexList',
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  methods: {
    release(pokemon) {
      this.$emit('release-pokemon', pokemon);
    },
    capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
  },
};
</script>

<style scoped>
h4{
  filter: drop-shadow(5px 5px 2px rgb(0, 0, 0, 0.5));
}
ul{
  list-style: none;
  padding: 0.5rem;
}
.card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
}
</style>

<template>
  <div>
    <ul class="list-unstyled">
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="card mb-3">
        <div class="row g-0">
          <div class="col-4">
            <img :src="pokemon.sprites.front_default" alt="pokemon-image" class="img-fluid rounded-start">
          </div>
          <div class="col-8 d-flex align-items-center">
            <div class="card-body">
              <h5 class="card-title">{{ pokemon.name }}</h5>
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
  },
};
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0.5rem;
  overflow-y: auto;
}
.card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.5rem;
}
</style>

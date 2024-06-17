<template>
  <div>
    <div class="d-flex justify-content-between px-5">
      <SearchPokemon @search="searchPokemon"></SearchPokemon>
      <div class="d-flex align-content-center align-items-center justify-content-around">
        <button type="submit" id="btn-catchit" @click="catchPokemon" class="rounded-circle mx-2"></button>
        <span class="mx-2 fw-bolder">CATCH IT</span>
      </div>
    </div>
    <section v-if="isLoading" class="container px-5 py-5 d-flex flex-column align-items-center">
      <AppLoader class="bg-transparent"></AppLoader>
    </section>
    <section v-else-if="pokemon && pokemon.sprites && pokemon.sprites.front_default" class="container d-flex flex-column align-items-center">
      <div class="row">
        <div class="col-12 text-center fw-bolder" id="pok-name">
          <span v-if="pokemon.game_indices && pokemon.game_indices[19]">#{{ pokemon.game_indices[19].game_index }}</span>
          {{ pokemon.name.toUpperCase() }}
        </div>
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-3 my-2 card border-0 rounded-4">
          <img :src="pokemon.sprites.front_default" class="card-img" alt="pokemon-image" style="width: 300px; z-index: 1000; filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));">
        </div>
        <div class="row justify-content-center pt-1">
          <div v-for="type in pokemon.types" :key="type.type.name" class="col-auto px-2">
            <span class="badge" id="type" :style="{ backgroundColor: getBadgeColor(type.type.name) }">{{ type.type.name }}</span>
          </div>
        </div>
        <div class="row mt-3 justify-content-between p-2 rounded-3" id="details">
          <div class="col-auto px-2">
            <div class="stat">HP: {{ pokemon.stats[0].base_stat }}</div>
            <div class="stat">Attack: {{ pokemon.stats[1].base_stat }}</div>
            <div class="stat">Defense: {{ pokemon.stats[2].base_stat }}</div>
          </div>
          <div class="col-auto px-2">
            <div class="stat">Speed: {{ pokemon.stats[5].base_stat }}</div>
            <div class="stat">Special Attack: {{ pokemon.stats[3].base_stat }}</div>
            <div class="stat">Special Defense: {{ pokemon.stats[4].base_stat }}</div>
          </div>
        </div>
      </div>
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
    catchPokemon() {
      if (this.pokemon && this.pokemon.name) {
        this.$emit('catch-pokemon', this.pokemon);
      }
    },
    getBadgeColor(type) {
      const typeColors = {
        normal: '#A8A77A',
        fighting: '#C22E28',
        flying: '#A98FF3',
        poison: '#A33EA1',
        ground: '#E2BF65',
        rock: '#B6A136',
        bug: '#A6B91A',
        ghost: '#735797',
        steel: '#B7B7CE',
        fire: '#EE8130',
        water: '#6390F0',
        grass: '#7AC74C',
        electric: '#F7D02C',
        psychic: '#F95587',
        ice: '#96D9D6',
        dragon: '#6F35FC',
        dark: '#705746',
        fairy: '#D685AD',
      };
      return typeColors[type] || '#777'; 
    },
  },
};
</script>

<style scoped>
#pok-name {
  color: #ffce31;
  font-size: 1.5rem;
  filter: drop-shadow(5px 5px 2px rgb(0, 0, 0, 0.5));
}

.badge {
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.stat {
  font-size: 1rem;
  color: white;
  margin-bottom: 0.5rem;
}

#details {
  box-shadow: 4px 4px 15px inset black;
  background-color: #c24242e7;
}
#type {
  box-shadow: 3px 3px 10px black;
}
#btn-catchit {
  width: 70px;
  height: 70px;
  background-image: url("images/btn-pokeball.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(3px 3px 5px rgb(0, 0, 0, 0.5));
}
</style>

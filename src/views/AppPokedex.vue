<template>
  <div>
    <Header></Header>
    <MainBox :pokemon="currentPokemon" @update:pokemon="updateCurrentPokemon"></MainBox>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../data/store.js';
import Header from '../components/Header.vue';
import MainBox from '../components/MainBox.vue';

export default {
  name: 'AppPokedex',
  components: {
    Header,
    MainBox,
  },
  data() {
    return {
      activeIndex: 0,
      shiny: false,
      loader: true,
    };
  },
  computed: {
    currentPokemon() {
      return store.pokemons[this.activeIndex] || {};
    },
  },
  methods: {
    async getPokemons() {
      try {
        let requests = [];
        for (let i = store.firstEntry; i <= store.lastEntry; i++) {
          requests.push(axios.get(`${store.apiUrl}${i}`));
        }
        const responses = await Promise.all(requests);

        responses.forEach(response => {
          store.pokemons.push(response.data);
        });
        this.loader = false;
      } catch (error) {
        console.error("Errore durante le richieste API:", error);
      }
    },
    changePokemon(entry) {
      const selectedPokemon = store.pokemons.find(pokemon => pokemon.id && pokemon.id === entry);
      if (selectedPokemon) {
        this.activeIndex = store.pokemons.indexOf(selectedPokemon);
      }
    },
    updateCurrentPokemon(newPokemon) {
      const index = store.pokemons.findIndex(p => p.id === newPokemon.id);
      if (index !== -1) {
        store.pokemons[index] = newPokemon;
      } else {
        store.pokemons.push(newPokemon);
      }
      this.activeIndex = store.pokemons.indexOf(newPokemon);
    },
  },
  mounted() {
    this.getPokemons().then(() => {
      if (store.pokemons.length > 0) {
        this.changePokemon(store.pokemons[0].id);
      }
    });
  },
};
</script>

<style scoped>
/* Aggiungi qui i tuoi stili */
</style>

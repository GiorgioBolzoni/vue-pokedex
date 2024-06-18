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
      isLoading: true,
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
        this.isLoading = false;
      } catch (error) {
        console.error("Errore durante le richieste API:", error);
      }
    },
    changePokemon(entry) {
      const selectedPokemon = store.pokemons.find(pokemon => pokemon.id === entry);
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
  async mounted() {
    await this.getPokemons();
    if (store.pokemons.length > 0) {
      this.changePokemon(store.pokemons[0].id);
    }
  },
};
</script>

<style scoped>
/* div {
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
} */

</style>

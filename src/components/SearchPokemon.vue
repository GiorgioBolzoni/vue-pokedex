<template>
  <section id="search-box" class="mx-5 py-2">
    <form @submit.prevent="search">
      <input v-model="pokemonName" type="search" placeholder="Search..." name="search-pokemon" id="search-pokemon">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'SearchPokemon',
  data() {
    return {
      pokemonName: '',
    };
  },
  methods: {
    search() {
      if (this.pokemonName) {
        this.$emit('search', this.pokemonName);
      } else {
        alert('Please enter a valid Pokemon name.');
      }
    }
  }
};
</script>

<style scoped>
#search-pokemon{
  border-radius: 4px 0 0 4px;
}
button {
  background: #0095e6;
  color: white;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  border-radius: 0 4px 4px 0;

}
button:hover {
  background-color: #3761A8;
  color: white;
}
</style>

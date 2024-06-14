<template>
  <section id="search-box" class="mx-5 py-2">
    <input v-model="searchTerm" type="search" placeholder="Search..." name="search-pokemon" id="search-pokemon" @keyup.enter="onSearch">
    <button @click="onSearch" type="submit"><i class="fa fa-search"></i></button>
  </section>
</template>

<script>
export default {
  name: 'SearchPokemon',
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    onSearch() {
      if (this.searchTerm) {
        this.$emit('search', this.searchTerm);
      } else {
        alert('Please enter a valid Pokemon');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: #0095e6;
  color: white;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}
button:hover {
  background-color: #3761A8;
  color: white;
}
</style>

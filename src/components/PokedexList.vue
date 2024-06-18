<template>
  <div>
    <h4 class="text-center mt-1">My Pokédex</h4>
    <ul class="list-unstyled">
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="card mb-3 position-relative">
        <div class="row g-0">
          <div class="col-4">
            <img :src="pokemon.sprites.front_default" alt="pokemon-image" class="img-fluid rounded-start">
          </div>
          <div class="col-7 d-flex align-items-center">
            <div class="card-body">
              <h5 class="card-title">{{ capitalizeFirstLetter(pokemon.name) }}</h5>
              <button @click="release(pokemon)" class="btn btn-danger btn-sm">Release</button>
            </div>
          </div>
          <div class="col-1 position-relative quest"
              @mouseover="showTooltip(pokemon.id)"
              @mouseleave="hideTooltip(pokemon.id)">
            <i 
              class="fa-regular fa-circle-question" 
              style="color: #c9c9c9;" 
              
            ></i>
            <div v-if="activeTooltip === pokemon.id" class="tooltip-content row">
              <h6 class="col-12 text-center">{{ capitalizeFirstLetter(pokemon.name) }}</h6>
              <p class="col-12"><strong>Type:</strong> {{ pokemon.types.map(type => type.type.name).join(', ') }}</p>
              <p class="col-6 px-2"><strong>HP:</strong> {{ pokemon.stats[0].base_stat }}</p>
              <p class="col-6 px-2"><strong>ATT:</strong> {{ pokemon.stats[1].base_stat }}</p>
              <p class="col-6 px-2"><strong>DEF:</strong> {{ pokemon.stats[2].base_stat }}</p>
              <p class="col-6 px-2"><strong>SPD:</strong> {{ pokemon.stats[5].base_stat }}</p>
              <p class="col-6 px-2"><strong>S. ATT: </strong>{{ pokemon.stats[3].base_stat }}</p>
              <p class="col-6 px-2"><strong>S. DEF: </strong>{{ pokemon.stats[4].base_stat }}</p>
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
  data() {
    return {
      activeTooltip: null,
    };
  },
  methods: {
    release(pokemon) {
      this.$emit('release-pokemon', pokemon);
    },
    capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    showTooltip(id) {
      this.activeTooltip = id;
    },
    hideTooltip(id) {
      if (this.activeTooltip === id) {
        this.activeTooltip = null;
      }
    },
  },
};
</script>

<style scoped>
h4 {
  filter: drop-shadow(5px 5px 2px rgb(0, 0, 0, 0.5));
}
ul {
  list-style: none;
  padding: 0.5rem;
}
.card {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
  border-radius: 8px;
  padding: 0.5rem;
}



img {
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.5));
}
.quest:hover {
  cursor: pointer;
}
.tooltip-content {
  position: absolute;
  top: 0;
  right: 100%;
  color: white;
  background: linear-gradient(-45deg, #000000, #ffffff);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid transparent;
  padding: 5px;
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  h6{
    font-size: 1rem;
  }
  p{
    font-size: 0.8rem;
  }
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
}
</style>

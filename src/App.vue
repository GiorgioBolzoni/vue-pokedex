<template>
  <Header></Header>
  <main>
    
    <MainBox></MainBox>
    
  </main>
</template>

<script>
  import axios from 'axios';

  import Header from './components/Header.vue';
  import MainBox from './components/MainBox.vue';
  
  export default{
    components:{
      Header,
      MainBox,
    },
    data(){
      return{

      }
    },
    mounted() {

    }
  }

</script>

<style scoped>

</style>

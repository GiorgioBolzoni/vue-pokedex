<template>

    <nav class="navbar flex justify-content-center navbar-expand-lg py-2">
        <img src="/src/assets/images/pokedex.png" alt="pokedex-logo">
    </nav>
</template>
 
 <script>
     export default {
         name:'Header',
         data(){
             return{
             }
         }
     }
 </script>
 
 <style lang="scss" scoped>
    nav{
        background-color: #C21616;
        border-bottom: 1px solid;
        box-shadow: 0 0 3px black;
        height: 6rem;
        img{
            height: 100%;
            width: 100%;
            object-fit: contain;
            object-position: center;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    }
    
 </style>
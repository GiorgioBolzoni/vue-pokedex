<template>
    <div class="d-flex flex-column align-items-center" id="loaderContainer">
        <img class="rounded-5" src="/images/pokemon-sleepy.gif" alt="">
        <div class="row">
            <div class="col-12">
                <div>Loading...</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppLoader'
    }
</script>

<style lang="scss" scoped>
#loaderContainer{
    max-width: 40%;
}
</style>
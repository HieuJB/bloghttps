<template>
  <div>
  </div>
</template>
<script>
export default {
    name:'VerifyEmail',
    created:function(){
        this.$store.dispatch('actionVerifyEmail',this.$route.params.id);
    }
}
</script>

<style>
</style>
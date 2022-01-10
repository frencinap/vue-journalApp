<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Journal App</h1>
      <p>La siguiente aplicación ha sido desarrollada utilizando Vue 3, con options y composition Api</p>
      <button @click="goDaybook" class="btn btn-success">Ir a Daybook</button>
    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    goDaybook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>

<style scoped>
.home{
  background-color: hsl(98, 3%, 90%);
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  
  
}
.logo{
  
  text-align: center;
  justify-items: center;
}
</style>

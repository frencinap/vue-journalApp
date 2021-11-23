<template>
  <div class="entry-list-container">
    <div class="px-2 py-2" >
      <input 
      type="text" 
      class="form-control" 
      placeholder="Buscar Entrada">
    </div>
    <div class="entry-scrollarea">
      <Entry
      v-for="item in 100"
      :key="item" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    Entry: defineAsyncComponent(()=> import('../components/Entry.vue'))
  }
}
</script>

<style lang="scss" socped>
input{
  height: 40px;
}
.entry-list-container{
  border-right: 2px solid #123e50;
  height: calc(100vh - 50px);

}
.entry-scrollarea{
  height: calc(100vh - 105px);
  overflow: auto;
}

</style>
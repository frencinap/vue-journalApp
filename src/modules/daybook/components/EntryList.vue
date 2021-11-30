<template>
  <div class="entry-list-container">
    <div class="px-2 py-2" >
      <input 
      type="text" 
      class="form-control" 
      placeholder="Buscar Entrada"
      v-model="term">
    </div>

    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-2"
      @click="$router.push({name: 'entry', params:{id: 'new'}})">
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry
      v-for="entry in entriesByTerm"
      :key="entry.id" 
      :entry="entry"/>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Entry: defineAsyncComponent(()=> import('../components/Entry.vue'))
  },
  computed: {
    ...mapGetters('journalModule',['getEntries']),
    entriesByTerm(){
      return this.getEntries( this.term )
    }
  },
  data(){
    return{
      term: ''
    }
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
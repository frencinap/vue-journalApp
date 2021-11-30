<template>
    <Navbar />
    <div v-if="isLoading" 
    class="row justify-content-md-center">
        <div class=" borders col-3 alert-info text-center mt-4">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>
    <div v-else
     class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

export default {
    components: {
        Navbar: defineAsyncComponent(()=> import('../components/Navbar.vue')),
        EntryList: defineAsyncComponent(()=> import('../components/EntryList.vue'))
    },
    methods: {
        ...mapActions('journalModule', ['loadEntries'])
    },
    computed: {
        ...mapState('journalModule', ['isLoading'])
    },
    created() {
        this.loadEntries()
    }
}
</script>
<style lang="scss" scoped>
.borders{
    border-radius: 4px;
}
</style>
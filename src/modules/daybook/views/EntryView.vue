<template>
    <template v-if="entry">
        <!-- Arreglar display en mobile -->
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold"> {{day}} </span>
                <span class="mx-1 fs-3 fw-bold"> {{month}} </span>
                <span class="mx-2 fs-4 fw-light"> {{yearDay}} </span>
            </div>
            <div>

                <input type="file"
                @change="onSelectedImage"
                ref="imgSelector"
                v-show="false"
                accept="image/png, image/jpeg">

                <button v-if="entry.id"
                 @click="onDeleteEntry"
                 class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary "
                @click="onSelectImg">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea 
            v-model="entry.text"
            placeholder="Qué sucedió hoy?"></textarea>
        </div>
        <!-- <img 
        src="https://sm.ign.com/t/ign_latam/screenshot/default/snk-temporada-final_uneb.1280.jpg" 
        alt="entry-picture"
        class="img-thumbnail"> -->
        <img 
        v-if="entry.picture && !localImage"
        :src="entry.picture" 
        alt="entry-picture"
        class="img-thumbnail">
        <img 
        v-if="localImage"
        :src="localImage" 
        alt="entry-picture"
        class="img-thumbnail">
    </template>
    <Fab 
    icon="fa-save" 
    @on:click="saveEntry"/>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {mapGetters, mapActions} from 'vuex'
// helper de la fecha
import getDate from '../helpers/getDate'
//helper de cloudinary
import uploadImage from '../helpers/uploadImg'

// alertas sweetalert2
import Swal from 'sweetalert2'

export default {
    props: {
        id: {
            type: String,
            requierd: true
        }
    },
    components: {
        Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
    },
    data(){
        return{
            entry: null,
            // entry: {
            //     text: ''
            // }
            //data del localImage
            localImage: null,
            //data del archivo en cuestión
            file: null
        }
    },
    computed: {
        ...mapGetters('journalModule', ['getEntryById'] ),
        day(){
            const { day } = getDate(this.entry.date)
            return day
        },
        month(){
            const {month} = getDate(this.entry.date)
            return month    
        },
        yearDay(){
            const {yearDay} = getDate(this.entry.date)
            return yearDay
        }
    },
    methods: {
        ...mapActions('journalModule', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry(){
            // condición para crear nueva entrada desde NoEntry.vue
            let entry
            if( this.id === 'new'){
                entry = {
                    text: 'Nueva entrada',
                    date: new Date().getTime()
                }
            }else{
                entry = this.getEntryById( this.id )
                if (!entry) return this.$router.push({name: 'no-entry'})
            }
            this.entry = entry
            /*condicion antigua
            const entry = this.getEntryById( this.id )
            if (!entry) return this.$router.push({name: 'no-entry'})
            this.entry = entry*/
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            //agregamos la subida de imagen aquí
            const pic = await uploadImage( this.file )
            //console.log(pic);
            this.entry.picture = pic

            if (this.entry.id) {
                //actualizar entrada
                await this.updateEntry( this.entry )
            }else{
                //console.log('Post de una nueva entrada')
                const id = await this.createEntry( this.entry )
                //redirección
                this.$router.push({name: 'entry', params:{ id: id } })
            }
            this.file = null 
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
            //this.updateEntry( this.entry )  
        },
        async onDeleteEntry(){
            //console.log('delete', this.entry);

            const { isConfirmed } = await Swal.fire({
                title: 'Estás seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            if( isConfirmed ){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({name: 'no-entry'})

                Swal.fire('Entrada eliminada','','success')
            }

            /*
            await this.deleteEntry( this.entry.id )

            this.$router.push({name: 'no-entry'})*/
        },
        onSelectedImage( event ){

            //console.log(event.target.files[0]);
            //desestructuramos la data del evento y creamos la instancia
            const file = event.target.files[0]
            if (!file) {
                //si cancela la subida de imagen, queda vacío
                this.localImage = null
                this.file = null
                return
            }
            //el file de la data
            this.file = file
            //FileReader ya viene en JS, creamos una nueva instancia FileReader
            const fr = new FileReader()
            //la instancia con la propiedad onload es una funcion en la que se iguala la data al resultado de fr
            fr.onload= () => this.localImage = fr.result
            // file es la data que queremos mostrar
            fr.readAsDataURL( file )
            
        },
        onSelectImg(){
            // buscamos la ref del input de la imagen
            //console.log(this.$refs);
            //usamos el nombre dado en el ref del input
            this.$refs.imgSelector.click()
            //document.querySelector('input').click()
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id( ) {
         this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
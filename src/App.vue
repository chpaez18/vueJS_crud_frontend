<template>
  
  <Navbar />

  <div class="container px-6 py-10 mx-auto md:py-16 h-screen  max-w-full">
    <div class="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6 items-center justify-center ">
      <div class="w-full md:w-1/2">
        
        
        <div class="flex flex-row space-x-8">
          <!-- SEARCH  -->
          <div class="pt-2 relative  text-gray-600 flex flex-row" style="margin-right:auto">
              <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search" name="search" placeholder="Buscar Persona" v-model="searchTerm">
              <div class="absolute right-0 top-0 mt-5 mr-4">
                  <svg class="text-gray-600 h-4 w-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                    <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
              </div>
          </div>
          <!-- SEARCH  -->
          
          <Button 
            text="Nuevo Contacto"
            @click="showModal=true" 
          />
        </div>

          <Card 
            :users="users" 
            @onEdit="onEdit" 
            @onDelete="onDelete" 
            :filterByTerm="filterByTerm" 
          />
        <VueTailwindPagination
          :current="currentPage"
          :total="total"
          :per-page="perPage"
          @page-changed="pageChange($event)"
        />
      </div>
    </div>
    <!-- MODAL -->
    <transition name="fade">

      <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" v-if="showModal">
          <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" @click="showModal=false"></div>
          
          <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            
            <div class="modal-content py-4 text-left px-6">
              <!--Title-->
              <div class="flex justify-between items-center pb-3">
                <p class="text-2xl font-bold">Agregar Nuevo Contacto</p>
                <div class="modal-close cursor-pointer z-50" @click="showModal=false">
                  <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              <!--Body-->
              <FormUser :form="form" @onFormSubmit="onFormSubmit"/>
            </div>
          </div>
      </div>

    </transition>
    <!-- MODAL -->

    
  </div>
</template>

<script>
import axios from 'axios'
import Card from './components/Card.vue'
import Navbar from './components/Navbar.vue'
import Button from './components/Button.vue'
import FormUser from './components/FormUser.vue'
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination"
import "@ocrv/vue-tailwind-pagination/dist/style.css"

export default {
  name: 'App',
  components: {
    Card,
    Navbar,
    Button,
    FormUser,
    VueTailwindPagination
  },

  data(){
    return {
      url: 'http://localhost/prueba_tecnica_actual/public/api/users',
      users: [],
      form: {
        first_name: '',
        last_name: '',
        description: '',
        email: '',
      },
      showModal: false,
      searchTerm:'',
      
      currentPage: 1,
      total: 100,
      perPage: 5,

      token: ''
    }
  },

  methods: {
    
    
    /* PAGINADOR */
    pageChange(pageNumber){
        this.currentPage = pageNumber
        this.getUsers()
    },
    /* PAGINADOR */


    login(){
      axios.post('http://localhost/prueba_tecnica/public/api/login',{
        username: 'coderchris@prueba.com',
        password: '123456789',
      }).then(data=>{
        
        this.token = data.data.access_token
        this.getUsers()
      })
    },
    /* METODOS CRUD */
    getUsers(){
      this.login()
      console.log('token: '+this.token)
      axios.get(`${this.url}?page=${this.currentPage}`, { headers: { 'Authorization': 'Bearer ' + this.token } }).then(data=>{
        this.users = data.data.data

        //actualizamos los props para paginar segun la data que retorna la api
        this.perPage = data.data.per_page
        this.total = data.data.total
        
      }
    )},

    updateUser(data){
      //invocamos el endpoint para actualizar un usuario, la promise que retorna ejecutamos la funcion de getUsers() para cargar de nuevo los usuarios
      axios.put(`${this.url}/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
      }).then(()=>{

        this.getUsers()
        
      }).catch(error =>{alert(error)})
    },

    deleteUser(id){
      //invocamos el endpoint para eliminar un usuario, la promise que retorna ejecutamos la funcion de getUsers() para cargar de nuevo los usuarios
      axios.delete(`${this.url}/${id}`).then(()=>{
        this.getUsers()
      }).catch(error =>{alert(error)})
    },

    createUser(data){
      //ejecutamos el endpoint para crear un user
      axios.post(this.url,{
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        email: data.email
      }).then(()=>{

        this.getUsers()
        
      }).catch(error =>{alert(error)})
    },
    /* METODOS CRUD */

    /* METODOS DE ESCUCHA */
    //Los componentes hijos se comunican con estos metodos por medio de un $.emit asi recibimos la data desde estos componentes hijos
    onEdit(data){
      this.updateUser(data)
      this.$swal({icon:"success", title: 'Registro Actualizado'});
    },

    onDelete(id){
      //ejecutamos la funcion local deleteUser()
      this.deleteUser(id)
      this.$swal({icon:"error", title: 'Registro Eliminado'});

    },

    onFormSubmit(data){

      //llamamos la funcion que se encarga de crear el user
      this.createUser(data)
      this.showModal = false
      this.$swal({icon:"success", title: 'Registro Completado'});

    }
    /* METODOS DE ESCUCHA */
  },

  /* dentro del ciclo de vida de un componente en vuejs, created() es la funcion que se ejecuta una vez el componente ha sido creado
    en este caso una vez el componente se crea llamamos la funcion que obtiene a los usuarios
  */
  created(){
    this.currentPage = 1
    this.getUsers()
  },
  computed:{
    filterByTerm:function(){
        return this.users.filter((user) =>{
          return user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())  || user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        })
    }
  }

}
</script>
<style src="./assets/tailwind.css" />
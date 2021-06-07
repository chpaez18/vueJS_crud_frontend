<template>
  <div  v-for="user in filterByTerm" :key="user.id">
    <div class="border-3 border-gray-300 rounded-md bg-white w-full flex items-center p-2  shadow border my-3" v-if="user.deleted_at == null">
        <img  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" class="h-10 w-15 rounded-full ring-2 ring-white">

        <div class="flex-grow p-3">
            <div class="font-semibold text-gray-700" v-if="tagEditingId == user.id">
                <input class="py-1 px-1  border-1  mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600" type="text" name="first_name" :value="user.first_name " />
                <input class="py-1 px-1  border-1  mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600" type="text" name="last_name" :value="user.last_name" />
            </div>
            <div class="font-semibold text-gray-700" v-else>
                {{user.first_name}} {{user.last_name}}
            </div>
            <div v-if="tagEditingId == user.id">
                
            </div>
            <div v-else>
                <h4 class="text-yellow-600 space-y-1 cursor-pointer" @click="onDelete(user.id)">Eliminar</h4>
            </div>
            
        </div>

        <div class="flex-grow p-3 ">
            <div class="text-gray-700" v-if="tagEditingId == user.id">
                <textarea class="py-1 px-1  border-1  mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600" name="description" :value="user.description" />
            </div>

            <div class="text-gray-700" v-else>
                {{user.description}}
            </div>
        </div>
        <div class="p-2" v-if="tagEditingId == user.id">
            <span class="block h-4 w-5 bottom-0 right-0 fas fa-pencil-alt cursor-pointer" @click="onEdit(user)">
                <SaveIcon />
            </span>
        </div>
        <div class="p-2" v-else>
            <span class="block h-4 w-5 bottom-0 right-0 fas fa-pencil-alt cursor-pointer" @click="setToEditing(user)">
                <PencilIcon />
            </span>
        </div>
    </div>
  </div>

  
</template>

<script>

import { PencilIcon, SaveIcon } from '@heroicons/vue/outline'
export default {
  name: 'Card',
  components: { PencilIcon, SaveIcon },
  props: {
      users: {
          type: Array
      },
      filterByTerm:Array
  },
  data(){
      return {
          tagEditingId: ''
      }
  },

  methods: {
    onDelete(id){
        //de esta forma invocamos el method onDelete() contenido en el componente App.vue y le pasamos el id capturado en el card
        this.$emit("onDelete", id)
    },

    //metodo que establece el id del user que se esta editando
    setToEditing(user){
        this.tagEditingId = user.id

        
    },
    
    onEdit(data){
        data.first_name = document.getElementsByName("first_name")[0].value 
        data.last_name = document.getElementsByName("last_name")[0].value 
        data.description = document.getElementsByName("description")[0].value 
        
        //de esta forma invocamos el method onDelete() contenido en el componente App.vue y le pasamos el id capturado en el card
        this.$emit("onEdit", data)
    
        //establecemos el auxiliar tagEditingId para retirar los inputs modificables
        this.tagEditingId = ''

        
        
    }
  }
}
</script>



<template>
<div>
    <form >
        <div class="flex justify-center py-4">
            <div class="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
        </div>


    <!--     <div class="grid grid-cols-1 mt-5 mx-7">
            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Cargar Imagen</label>
            <div class='flex items-center justify-center w-full'>
                <label class='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group'>
                    <div class='flex flex-col items-center justify-center pt-7'>
                        <svg class="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p class='lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider'>Select a photo</p>
                    </div>
                    <input type='file' class="hidden" />
                </label>
            </div>
        </div> -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div class="grid grid-cols-1">
                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Primer Nombre</label>
                <input 
                    class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" 
                    type="text" 
                    name="first_name" 
                    placeholder="Primer Nombre" 
                    @change="handleChange" 
                    :value="form.first_name"
                />
            </div>
            <div class="grid grid-cols-1">
                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Segundo Nombre</label>
                <input 
                    class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" 
                    type="text" 
                    name="last_name" 
                    placeholder="Segundo Nombre" 
                    @change="handleChange"
                    :value="form.last_name"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 mt-5 mx-7">
            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email</label>
            <input 
                class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" 
                type="email" 
                name="email" 
                placeholder="Correo Electronico" 
                @change="handleChange"
                :value="form.email"
            />
        </div>

        <div class="grid grid-cols-1 mt-5 mx-7">
            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Descripción</label>
            <textarea 
                class="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" 
                name="description"
                cols="3" 
                rows="4" 
                placeholder="Descripción" 
                @change="handleChange" 
                :value="form.description"
            />
        </div>

            <!--Footer-->
            <div class="flex justify-center pt-4 space-x-4">
                <button 
                    class='w-auto bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-xl font-medium text-white px-4 py-2'
                    @click="onFormSubmit"
                >
                    Guardar
                </button>
            </div>
    </form>
</div>
</template>

<script>
export default {
  name: 'FormUser',
  props: {
    form : {
        type : Object
    }
  },
    
  methods: {
    handleChange(event){

        //obtenemos los valores del target(los que se estan introduciendo en el input) y actualizamos el prop forms con el value
        const {name, value} = event.target;
        let form = this.form;
        form[name] = value;
        this.formulario = form;
        
    },

    onFormSubmit(e){
        //evitamos el envio del formulario
        e.preventDefault();

        //validamos el formulario
        if(this.formValidation()){
            
           this.$emit("onFormSubmit", this.form)

           //limpiamos los campos
           this.clearFormFields()
        }
    },
    
    formValidation(){

        //validamos el primer nombre
        if(document.getElementsByName("first_name")[0].value === ""){
            alert("Introduzca su primer nombre")
            return false;
        }

        //validamos el segundo nombre
        if(document.getElementsByName("last_name")[0].value === ""){
            alert("Introduzca su segundo nombre")
            return false;
        }

        //validamos el correo
        if(document.getElementsByName("email")[0].value === ""){
            alert("Introduzca un correo electronico")
            return false;
        }

        //validamos la descripcion
        if(document.getElementsByName("description")[0].value === ""){
            alert("Introduzca una descripción")
            return false;
        }

        return true;
    },

    clearFormFields(){
        //limpiamos la data del formulario
        this.formulario.first_name = "";
        this.formulario.last_name = "";
        this.formulario.description = "";
        this.formulario.email = "";
        this.formulario.isEdit = false;

        //limpiamos los campos
        document.querySelector('.form').reset()
    }

      
  }
}
</script>


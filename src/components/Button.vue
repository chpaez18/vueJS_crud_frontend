<template>
 <button @click="showModal = true" class="bg-yellow-500 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-yellow-100 rounded-md hover:shadow-lg hover:bg-yellow-600"> 
     {{text}} 
 </button>


</template>

<script>
export default {
  name: 'Button',
  props: {
      text: String
  }
}
</script>


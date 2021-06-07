<template>

</template>

<script>
export default {
  name: 'Modal',
  props: {
      showModal: Boolean
  },

  methods: {
      onShowModal(val){
        
        this.$emit("onShowModal", val)
      },

      
  }
}
</script>


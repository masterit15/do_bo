<template>
  <div class="home">
    <div class="form">
      <input type="file" name="zr_file" id="file_input" ref="fileInput">
      <button @click="uploadFile">Загрузить</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'HomeView',
  methods: {
    ...mapActions(['addFile']),
    uploadFile(){
      console.log(this.$refs.fileInput.files[0]);
      this.addFile(this.$refs.fileInput.files[0])
    }
  },
  components: {

  }
}
</script>

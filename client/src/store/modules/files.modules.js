import axios from "axios"
export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addFile({}, file){
      var formData = new FormData();
      formData.append("zr_file", file);
      axios.post('/api/upload_zr', formData)
    }
  }
}
<template>
  <v-container class="my-5">
    <v-btn
        color="yellow darken-1"
        
        text-color="indigo darken-4"
        tile dark
        fab fixed top left
        to="/ventas"
        >Home</v-btn> 
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      response: "",
      ventas: "",
    };
  },
  methods: {
    getVentas() {
      let id = this.$route.params.id;
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas-corte/" +
            id,
            {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.response = response.data;
          this.ventas = response.data.ventas;
          //console.log(response);
        })
        .catch((e) => e);
    },
    dateNow() {
      const today = new Date();
      this.dia =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      this.hora = today.getHours() + ":" + today.getMinutes();
      //console.log(this.dia);
    },
  },
  mounted() {
    this.getVentas();
    if(localStorage.loged != 'admin'){
      this.$router.push('/')
    }
  },
};
</script>

<!-----

}






----->
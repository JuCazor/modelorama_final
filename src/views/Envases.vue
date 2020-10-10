<template>
  <v-container class="my-5">
    <v-btn
      color="indigo darken-4"
      tile
      dark
      fab
      fixed
      top
      left
      to="/ventas"
      >Home</v-btn
    >
    <v-layout wrap align-start class="d-flex flex-wrap">
       <v-flex md6 sm6 lg6 v-for="todo in response" :key="todo.id">
        <v-card  elevation="1" class="pa-6 mr-3 mt-3">
            <v-layout row wrap>
                <v-flex xs6 sm6 sd6 md6>
                <div class="caption grey--text">Nombre:</div>
                <div>{{ todo.nombre }}</div>
                </v-flex>
                <v-flex xs6 sd6 md6>
                <div class="caption grey--text">Envases:</div>
                <div>{{ todo.envases }}</div>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            </v-card> 
        </v-flex> 
    </v-layout>
    
    
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
        {{ texto }}
        <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>

  </v-container>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      response: "",
      ventas: "",
      timeout: 2000,
      snackbar: false,
      dialog: false,
      texto: "",
      dialogSumar: false,
      dialogRestar: false,
      id: 1,
      idItem: 0,
      cantidadCortes: "",
      descarga: false,
      valor: null,
      tamanioPaquete: null,
      cantidadExistente: null,
      nombreProducto: null,
      inputRules: [(value) => !!value || "Este campo es requerido."],
      inputResta: [(value) => !!value || "Este campo es requerido.",
        (value) => value > 0 || "Debe ser mayor a 0"],
      cantidadCambio: null,
    };
  },
  methods: {
    getVentaInicial() {
      axios
        .get("http://178.128.183.223:3333/api/v1/administrador/productos/envases", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          //console.log(response);
          this.response = response.data;
          this.loading = false;
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
    comprobarValor() {
      //console.log(this.cantidad)
      //console.log(this.response[index].cantidadExistente)
      if (this.cantidadCambio >= 1){ //&& this.cantidadCambio <= this.response[index].cantidadExistente){
        return true;
      }else{
        this.texto = "La cantidad debe ser igual o menor a la cantidad de existencia";
        this.snackbar = true;
        return false;
      }
      
    },
  },
  mounted() {
    this.getVentaInicial();
    if (localStorage.loged != "admin") {
      this.$router.push("/");
    }
  },
};
</script>
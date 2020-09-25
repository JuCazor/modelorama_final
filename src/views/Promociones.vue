<template>
  <v-container class="my-5">
    <v-card flat class="pa-6" v-for="(item, index) in response" :key="index">
      <v-layout row wrap :class="`pa-3 project`">
        <v-flex xs6 sm4 sd4 md4>
          <div class="caption grey--text">Descuento del paquete:</div>
          <div>{{item.descuento}}</div>
        </v-flex>
        <v-flex xs6 sd4 md4>
          <div class="caption grey--text">Productos en el paquete:</div>
          <div>{{item.productosRelacionados.length}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text text-center">
            <v-dialog max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  v-on="on"
                  v-bind="attrs"
                  dark
                  color="indigo darken-4"
                  
                >Detalles</v-btn>
              </template>

              <v-card>
                <v-card-title class="text-center">
                  <div class="text-center">Detalles</div>
                </v-card-title>
                <v-card-text>
                  <v-list
                        :dense="true"
                        :nav="true"
                    >
                    <v-subheader>Productos del paquete</v-subheader>
                    <v-list-item-group color="primary">
                    <v-list-item
                        v-for="(item, i) in item.productosRelacionados"
                        :key="i"
                        :inactive="true"
                    >
                        <v-list-item-content>
                        <v-list-item-title v-text='item.productos.nombre'></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                        
                        </v-list-item-action>
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <v-flex md2 xs6>
            <v-btn outlined :loading="loading" @click="desactivar(item.id)" color="orange lighten-2" class="ml-5" v-if="item.disponible">
                desactivar
            </v-btn>
            <v-btn outlined :loading="loading" @click="activar(item.id)" color="orange lighten-2" class="ml-5" v-else> 
                activar
            </v-btn>
        </v-flex>
      </v-layout>
      <v-divider ></v-divider>
    </v-card>
    
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      response: "",
      ventas: '',
      loading: false
    };
  },
  methods: {
    getPaquetes() {
      //let id = this.$route.params.id;
      axios
        .get(
          "https://127.0.0.1:3333/api/v1/administrador/paquetes"
        )
        .then((response) => {
          this.response = response.data;
          this.ventas = response.data.ventas
          //console.log(response);
          this.loading = false;
        })
        .catch((e) => e);
    },
    desactivar(id) {
      //let id = this.$route.params.id;
      this.loading = true
      axios
        .put(
          "https://127.0.0.1:3333/api/v1/administrador/paquete/desactivar/"+id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
            response
            this.loading = false
            this.getPaquetes()
        })
        .catch((e) => e);
    },
    activar(id) {
      //let id = this.$route.params.id;
      this.loading = true
      axios
        .put(
          "https://127.0.0.1:3333/api/v1/administrador/paquete/desactivar/"+id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
            response
            this.loading = false
            this.getPaquetes()
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
    this.getPaquetes();
    if(localStorage.loged != 'admin'){
      this.$router.push('/')
    }
  },
};
</script>
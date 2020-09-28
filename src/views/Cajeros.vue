<template>
  <v-container class="my-5">
      <v-btn color="indigo darken-4" large dark block @click="dialogUsuarios = !dialogUsuarios">Añadir cajero</v-btn>
    <v-card flat class="pa-6" v-for="(item, index) in response" :key="index">
      <v-layout row wrap :class="`pa-3 project`">
        <v-flex xs6 sm4 sd4 md3>
          <div class="caption grey--text">Nombre del cajero:</div>
          <div>{{item.nombre}}</div>
        </v-flex>
        <v-flex xs6 sd4 md3>
          <div class="caption grey--text">Nombre de usuario:</div>
          <div>{{item.username}}</div>
        </v-flex>
        <v-flex xs6 sd4 md3>
          <v-dialog v-model="contraMostrar" max-width="600px">
                <template color="yellow lighten-1" v-slot:activator="{ on, attrs }">
                  <v-btn depressed dark tile color="yellow darken-1" v-on="on" v-bind="attrs">
                    Cambiar contraseña
                  </v-btn>
                </template>

                <v-card>
                  <v-toolbar color="indigo darken-4" dark elevation="0">
                    <v-spacer />
                    <div class="h1" style="font-size: 28px !important;">Cambiar contraseña</div>
                    <v-spacer />
                  </v-toolbar>
                  <div style=" margin-left: 10% !important; margin-right: 10% !important;">
                    <v-text-field
                      label="Nueva contraseña"
                      class="rounded-lg"
                      style="padding-top: 10% !important;"
                      v-model="nuevaContra"
                      dense
                      filled
                    ></v-text-field>
                  </div>
                  <v-card-actions>
                      <v-btn outlined color="indigo darken-4" @click="contraMostrar = !contraMostrar">cerrar</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn outlined color="yellow darken-1" @click="cambiarContra">cambiar contraseña</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
        </v-flex>
        <v-flex md3  xs6 >
            <v-btn depressed dark tile :loading="loading" @click="desactivar(item.id, item.username)" color="orange lighten-2" class="ml-5">
                Dar de baja
            </v-btn>
        </v-flex>
      </v-layout>
      <v-divider ></v-divider>
    </v-card>
    <v-dialog v-model="dialogUsuarios" max-width="500px">
      <v-card>
         <v-toolbar color="indigo darken-4" dark elevation="0">
            <v-spacer />
            <div class="h1" style="font-size: 28px !important;">Añadir cajero</div>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-row   align="center" justify="center">
              <v-form ref="form">
                <v-col cols="8">
                    <v-text-field v-model="nombreCajero" label="Nombre del cajero">

                    </v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="nombreUsuario" label="Nombre de usuario">

                    </v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field  v-model="contraseñaCrearUsuario" label="Contraseña">

                    </v-text-field>
                </v-col>
              </v-form>
              
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="!dialogUsuarios">Cerrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined :loading="loading" color="yellow darken-1" @click="añadirCajero()">
                    añadir cajero
                  </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
        {{texto}}
        <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      response: "",
      contraMostrar: false,
      ventas: '',
      loading: false,
      dialogUsuarios: false,
      nombreCajero: '',
      nombreUsuario: '',
      nuevaContra: '',
      contraseñaCrearUsuario: '',
      timeout: 2000,
      texto: '',
      snackbar: false,
    };
  },
  methods: {
    añadirCajero() {
        //console.log(this.nombreCajero)
        //comentario fantasma

        //console.log(this.nombreUsuario)
        //console.log(this.contraseñaCrearUsuario)
      if(this.$refs.form.validate()){ 
        axios
                .post(
                  "http://178.128.183.223:3333/api/v1/registro",
                  {
                    username: this.nombreUsuario,
                    nombre: this.nombreCajero,
                    password: this.contraseñaCrearUsuario
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.token,
                    },
                  }
                )
                .then((response) => {
                  response
                  this.loading = false;
                  //console.log(response.data);
                  this.dialogUsuarios = false
                  this.texto = "Añadido correctamente";
                  this.snackbar = true;
                  this.getCajeros()
                })
                .catch((e) => e);
      }
      
    },
    getCajeros() {
      //let id = this.$route.params.id;
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/vendedores",{
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
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
      //console.log(id)
      this.loading = true
      axios
        .delete(
          "http://178.128.183.223:3333/api/v1/administrador/vendedor/"+id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
            response
            this.loading = false;
            this.texto = "Eliminado correctamente";
            this.snackbar = true;
            this.getCajeros()
        })
        .catch((e) => e);
    },
    cambiarContra(id,username) {
      //let id = this.$route.params.id;
      this.loading = true
      axios
        .put(
          "http://178.128.183.223:3333/api/v1/administrador/vendedor/"+id,
          {
              username: username,
              password: this.nuevaContra
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
            response
            this.loading = false
            this.dialogUsuarios = false
            this.getCajeros()
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
    this.getCajeros();
    if(localStorage.loged != 'admin'){
      this.$router.push('/')
    }
  },
};
</script>
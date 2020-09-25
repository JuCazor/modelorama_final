<template>
    <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="6" sm="8" md="4">
        <v-card height="600" class="elevation-12" >
          <v-toolbar color="indigo darken-4"  dark elevation="0">
              <v-spacer />
              <div class="h1" style="font-size: 28px !important;">
                  Inicio de sesión
              </div>
            <v-spacer />
            
          </v-toolbar>
          <v-card-text style="margin-top: 10% !important;">
            <v-form  ref="form">
              <v-text-field class="text-login" dense filled  label="Usuario" v-model="usuario" name="usuario" type="text" :rules="inputRules" />
              <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" class="text-login" dense filled  id="password" v-model="contra" label="Contraseña" name="contra" :rules="inputRules"  />
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-spacer />
            <v-btn @click="login()" style="margin-top: 10% !important;" width="150" dark x-large :loading="loading" color="indigo darken-4">Entrar</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>
    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :bottom="true"
    >
      Error al iniciar sesión
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
        
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      inputRules:[
        value => !!value || 'Este campo es requerido.'
      ],
      usuario: '',
      timeout: 2000,
      contra: '',
      loading: false,
      snackbar: false,
      show2: false,
    };
  },
  methods: {
    login(){
      
      if(this.$refs.form.validate()){
        this.loading = true;
        
        axios.post('https://127.0.0.1:3333/api/v1/login',{
          username: this.usuario,
          password: this.contra,
        })
        .then( response => {
          this.loading = false;
            //console.log(response.data)
            if(response.data.privilegiado){
              localStorage.loged = 'admin';
              localStorage.token = response.data.token;
              this.$router.push('/ventas')
            }else{
              if(!response.data.privilegiado){
                localStorage.loged = 'user';
                localStorage.token = response.data.token;
                this.$router.push('/ventas/cajero')
              }else
                this.snackbar = true;
            }
          })
        .catch(e => e );
      }else{
        this.snackbar = true;
      }
    },
    comprobar () {
      
    },
    enter(user){
        this.$router.push({ name: 'prueba', params: { name: user } })
    }
  },
  mounted(){
      this.$user = { role: "guest" };
  }
};
</script>
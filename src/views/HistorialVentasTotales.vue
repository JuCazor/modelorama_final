<template>
  <v-container class="my-5">
      <v-row class="d-flex flex-wrap">
          <v-col cols="12" md="6" sm="6">
              <v-spacer></v-spacer>
                <v-btn @click="getVentas(id-1)" v-if="!(id<=1)" style="width: 30%; margin-left:70%">
                    Atras
                </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="6">
                <v-btn @click="getVentas(id+1)" v-if="(id<=(cantidadCortes/10))" style="width: 30%; margin-rigth:70%">
                    Siguiente
                </v-btn>
            </v-col>
          
      </v-row>
    <v-card flat class="pa-6" v-for="(todo) in response" :key="todo.id">
      <v-layout row wrap :class="`pa-3 project ${todo.status}`">
        <v-flex xs6 sm4 sd4 md4>
          <div class="caption grey--text">Fecha de corte:</div>
          <div>{{todo.fecha}}</div>
        </v-flex>
        <v-flex xs6 sd4 md2>
          <div class="caption grey--text">Hora de corte:</div>
          <div>{{todo.hora}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Total del corte:</div>
          <div>{{todo.total}}</div>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <v-btn color="yellow darken-1" outlined :to='"/ventas/historial/"+todo.id'>
          <v-icon>mdi-magnify-plus</v-icon>
              Detalles
          </v-btn>
          <v-btn :loading="descarga" outlined color="indigo darken-4" class="ml-5" @click="realizarExcel(todo.id)">
            <v-icon>mdi-download</v-icon>
              Descargar excel
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
      id: 1,
      cantidadCortes: '',
      descarga: false
    };
  },
  methods: {
    getVentas(id) {
        
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas-corte/pagina/"+id
        )
        .then((response) => {
          this.response = response.data.data
          this.loading = false;
          //console.log(response)
        })
        .catch((e) => e);
    },
    realizarExcel(id){
        //http://178.128.183.223:3333/api/v1/administrador/generar-hoja/1 responseType: 'blob'
                this.descarga = true
                let execlName = "Reporte" + '_' + id + '.xlsx';
                ////console.log(execlName);
                axios({
                    url: "http://178.128.183.223:3333/api/v1/administrador/generar-hoja/"+id, // Interface name
                    method: 'get',
                    responseType:"blob" 
                }).then(function (response) {
                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                    const aEle = document.createElement('a');     // Create a label
                    const href = window.URL.createObjectURL(blob);       // Create downloaded link
                    aEle.href = href;
                    aEle.download = execlName;  // File name after download
                    document.body.appendChild(aEle);
                    aEle.click();     // Click to download
                    document.body.removeChild(aEle); // Download complete remove element
                    window.URL.revokeObjectURL(href) // Release blob object
                    this.descarga = false
                }).catch((e) => {
                  e
                  this.descarga = false
                })

    },

    getVentaInicial() {
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas-corte/pagina/1"
        )
        .then((response) => {
          this.cantidadCortes = response.data.total    
          this.response = response.data.data
          this.loading = false;
          //console.log(response)
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
    this.getVentaInicial();
    if(localStorage.loged != 'admin'){
      this.$router.push('/')
    }
  },
};
</script>

<style>
v-btn.colorDonwload{
  border-color: rgb(0,91,255);
  border-color: linear-gradient(203deg, rgba(0,91,255,1) 0%, rgba(253,187,45,1) 100%);
}
</style>
<template>
  <v-container class="my-5">
    <v-row class="d-flex flex-wrap">
      <v-col cols="12" md="6" sm="6">
        <v-spacer></v-spacer>
        <v-btn
          @click="getVentas(id - 1)"
          v-if="!(id <= 1)"
          style="width: 30%; margin-left: 70%"
        >
          Atras
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <v-btn
          @click="getVentas(id + 1)"
          v-if="id <= cantidadCortes / 10"
          style="width: 30%; margin-rigth: 70%"
        >
          Siguiente
        </v-btn>
      </v-col>
    </v-row>
    <v-card flat class="pa-6" v-for="todo in response" :key="todo.id">
      <v-layout row wrap :class="`pa-3 project ${todo.status}`">
        <v-flex xs6 sm4 sd4 md4>
          <div class="caption grey--text">Fecha de corte:</div>
          <div>{{ todo.fecha }}</div>
        </v-flex>
        <v-flex xs6 sd4 md2>
          <div class="caption grey--text">Hora de corte:</div>
          <div>{{ todo.hora }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Total del corte:</div>
          <div>${{ todo.total }}</div>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <v-btn
            color="yellow darken-1"
            tile
            depressed
            dark
            :to="'/ventas/historial/' + todo.id"
          >
            <v-icon>mdi-magnify-plus</v-icon>
            Detalles
          </v-btn>
          <v-btn
            :loading="descarga"
            outlined
            color="indigo darken-4"
            class="ml-5"
            @click="realizarExcel(todo.id)"
          >
            <v-icon>mdi-download</v-icon>
            Descargar excel
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
        {{texto}}
        <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>
    <v-footer dark padless>
      <v-card
        style="width: 100%"
        flat
        tile
        class="indigo lighten-1 white--text text-center"
      >
        <v-toolbar color="indigo darken-4" dark elevation="0">
          <v-spacer />
          <div class="h1" style="font-size: 28px !important">
            Descargar Excel por período
          </div>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" sm="12">
              <v-row align="center" justify="center" class="flex-warp">
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="dias"
                    v-model="dia"
                    label="dia"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="meses"
                    v-model="mes"
                    label="mes"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="anios"
                    v-model="anio"
                    label="año"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row align="center" justify="center" class="flex-warp">
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="dias"
                    v-model="diaF"
                    label="dia"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="meses"
                    v-model="mesF"
                    label="mes"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="3">
                  <v-select
                    :items="anios"
                    v-model="anioF"
                    label="año"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-btn depressed tile dark color="yellow darken-1" @click="excelFecha()">
              <v-icon>mdi-download</v-icon> Descargar
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      response: "",
      ventas: "",
      timeout: 2000,
      snackbar: false,
      texto: '',
      id: 1,
      cantidadCortes: "",
      descarga: false,
      dia: null,
      diaF: null,
      mes: null,
      mesF: null,
      anio: null,
      anioF: null,
      dias: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      meses: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      anios: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        "2032",
        "2033",
        "2034",
        "2035",
        "2036",
        "2037",
        "2038",
        "2039",
        "2040",
        "2041",
      ],
    };
  },
  methods: {
    getVentas(id) {
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas-corte/pagina/" +
            id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.response = response.data.data;
          this.loading = false;
          //console.log(response)
        })
        .catch((e) => e);
    },
    realizarExcel(id) {
      //http://178.128.183.223:3333/api/v1/administrador/generar-hoja/1 responseType: 'blob' /api/v1/administrador/generar-hoja
      this.descarga = true;
      let execlName = "Reporte" + "_" + id + ".xlsx";
      ////console.log(execlName);
      axios({
        url:
          "http://178.128.183.223:3333/api/v1/administrador/generar-hoja/" + id, // Interface name
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        responseType: "blob",
      })
        .then(function (response) {
          const blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          });
          const aEle = document.createElement("a"); // Create a label
          const href = window.URL.createObjectURL(blob); // Create downloaded link
          aEle.href = href;
          aEle.download = execlName; // File name after download
          document.body.appendChild(aEle);
          aEle.click(); // Click to download
          document.body.removeChild(aEle); // Download complete remove element
          window.URL.revokeObjectURL(href); // Release blob object
          this.descarga = false;
        })
        .catch((e) => {
          e;
          this.descarga = false;
        });
    },
    excelFecha() {
      //http://178.128.183.223:3333/api/v1/administrador/generar-hoja/1 responseType: 'blob' /api/v1/administrador/generar-hoja
      this.descarga = true;
      let execlName = "Reporte" + "_" + this.dia + "/" + this.mes + "/" + this.anio + "-" + this.diaF + "/" + this.mesF + "/" + this.anioF +".xlsx";
      ////console.log(execlName);
      if(this.dia != null && this.mes != null && this.anio != null && this.diaF != null && this.mesF != null && this.anioF != null){
        axios({
          url:
            "http://178.128.183.223:3333/api/v1/administrador/generar-hoja", // Interface name
          method: "post",
          data: {
            fechaInicio: this.dia + "/" + this.mes + "/" + this.anio,
            fechaFin: this.diaF + "/" + this.mesF + "/" + this.anioF,
          },
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
          responseType: "blob",
        })
          .then(function (response) {
            const blob = new Blob([response.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
            });
            const aEle = document.createElement("a"); // Create a label
            const href = window.URL.createObjectURL(blob); // Create downloaded link
            aEle.href = href;
            aEle.download = execlName; // File name after download
            document.body.appendChild(aEle);
            aEle.click(); // Click to download
            document.body.removeChild(aEle); // Download complete remove element
            window.URL.revokeObjectURL(href); // Release blob object
            this.texto = "Descarga exitosa"
            this.snackbar = true;
            this.descarga = false;
            this.dia = ''
            this.mes = ''
            this.anio = ''
            this.diaF = ''
            this.mesF = ''
            this.anioF = ''
          })
          .catch((e) => {
            e;
            this.descarga = false;
          });
      }else{
        this.texto = "Introduza la información necesaria"
        this.snackbar = true;
        this.descarga = false
      }
      
    },

    getVentaInicial() {
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas-corte/pagina/1",
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.cantidadCortes = response.data.total;
          this.response = response.data.data;
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
    if (localStorage.loged != "admin") {
      this.$router.push("/");
    }
  },
};
</script>

<style>
v-btn.colorDonwload {
  border-color: rgb(0, 91, 255);
  border-color: linear-gradient(
    203deg,
    rgba(0, 91, 255, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
</style>
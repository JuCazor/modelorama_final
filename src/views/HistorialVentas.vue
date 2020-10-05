<template>
  <v-container class="my-5">
    <v-btn
        color="yellow darken-1"
        
        text-color="indigo darken-4"
        tile dark
        fab fixed top left
        to="/ventas"
        >Home</v-btn>  
    <v-card flat class="pa-6" v-for="todo in ventas" :key="todo.id">
      <v-layout row wrap :class="`pa-3 project ${todo.estado}`">
        <v-flex xs6 sm4 sd4 md4>
          <div class="caption grey--text">Numero de veta:</div>
          <div>{{ todo.id }}</div>
        </v-flex>
        <v-flex xs6 sd4 md2>
          <div class="caption grey--text">Fecha compra:</div>
          <div>{{ todo.fechaCompra }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Total:</div>
          <div>${{ todo.total }}</div>
        </v-flex>

        <v-flex xs6 sm4 md2>
          <div class="caption grey--text text-center">
            <v-dialog max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  v-on="on"
                  v-bind="attrs"
                  depressed
                  tile
                  dark
                  color="yellow darken-1"
                  >Detalles</v-btn
                >
              </template>

              <v-card>
                <v-card-title class="text-center">
                  <div class="text-center">Detalles</div>
                </v-card-title>
                <v-card-text>
                  <v-list :dense="true" :nav="true">
                    <v-subheader>Productos vendidos</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="(item, i) in todo.productosVendidos"
                        :key="i"
                        :inactive="true"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.productos.nombre"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-text="'Cantidad:' + item.cantidad"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        v-for="(item, i) in todo.paquetesVendidos"
                        :key="i"
                        :inactive="true"
                      >
                        <v-list-item-content>
                          <p>Paquete</p>
                          <div
                            v-for="(producto,
                            index) in item.productosRelacionados"
                            :key="index"
                          >
                            <v-list-item-title
                              v-text="producto.productos.nombre"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-text="'Cantidad:' + producto.cantidad"
                            ></v-list-item-subtitle>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <v-flex md2 sm4 xs6>
          <v-responsive
              :class="`rounded-circle d-inline-flex align-center justify-center ml-6 projectt ${todo.estado}`"
              height="24"
              width="24"
            >
            
            </v-responsive>
        </v-flex>
      </v-layout>
      <v-divider color="indigo darken-4" style=" width: 100%"></v-divider>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";


export default {
  components: {
  
  },
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

<style>
.project.normal {
  border-left: 4px solid #aed581;
}
.project.espera {
  border-left: 4px solid #ebee26;
}
.project.rechazado {
  border-left: 4px solid #e53935;
}
.project.aprobado {
  border-left: 4px solid #aed581;
}

.projectt.normal {
  background-color:#aed581;
  border: 4px solid #4c8b04;
}
.projectt.espera {
  background-color:#ebee26;
  border: 4px solid #bbbe00;
}
.projectt.rechazado {
  background-color:#e53935;
  border: 4px solid #880301;
}
.projectt.aprobado {
  background-color:#aed581;
  border: 4px solid #4c8b04;
}
</style>
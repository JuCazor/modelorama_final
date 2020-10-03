<template>
  <v-container class="my-5">
    <v-btn
      color="yellow darken-1"
      text-color="indigo darken-4"
      tile
      dark
      fab
      fixed
      top
      left
      to="/ventas"
      >Home</v-btn
    >
    <v-btn
      height="50"
      tile
      text-color="indigo darken-4"
      dark
      block
      color="yellow darken-1"
      @click="dialog = !dialog"
    >
      Añadir producto al almacen
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-toolbar color="indigo darken-4" dark elevation="0">
          <v-spacer />
          <div class="h1" style="font-size: 28px !important">
            Añadir producto al almacen
          </div>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form
            style="margin-left: 10% !important; margin-right: 10% !important; "
            ref="from"
          >
            <v-text-field
              label="Nombre del producto"
              class="rounded"
              v-model="nombreProducto"
              :rules="inputRules"
              dense
              filled
            ></v-text-field>
            <v-flex md12 lg12 class="d-flex flex-warp">
              <v-flex
                md4
                lg4
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
                <v-text-field
                  label="Cantidad en existencia"
                  class="rounded"
                  type="number"
                  v-model="cantidadExistente"
                  :rules="inputRules"
                  dense
                  filled
                ></v-text-field>
              </v-flex>
              <v-flex
                md4
                lg4
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
                <v-text-field
                  label="tamaño del paquete"
                  class="rounded"
                  type="number"
                  v-model="tamanioPaquete"
                  :rules="inputResta"
                  dense
                  filled
                ></v-text-field>
              </v-flex>
              <v-flex
                md4
                lg4
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
                <v-text-field
                  label="Valor del producto"
                  class="rounded"
                  type="number"
                  v-model="valor"
                  :rules="inputRules"
                  dense
                  filled
                ></v-text-field>
              </v-flex>
            </v-flex>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="dialog = !dialog"
            style="margin-left: 5%"
            depressed
            tile
            dark
            color="yellow darken-1"
          >
            cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            style="margin-right: 5%"
            @click="postProducto()"
            depressed
            tile
            dark
            color="indigo darken-4"
          >
            añadir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card flat class="pa-6" v-for="todo in response" :key="todo.id">
      <v-layout row wrap :class="`pa-3 project ${todo.status}`">
        
        <v-flex xs6 sm2 sd2 md1>
          <v-btn @click="eliminar(todo.id)" depressed tile dark color="red"><v-icon>mdi-trash-can</v-icon></v-btn>
        </v-flex>
        <v-flex xs6 sm2 sd2 md2>
          <div class="caption grey--text">Nombre:</div>
          <div>{{ todo.nombre }}</div>
        </v-flex>
        <v-flex xs6 sd4 md2>
          <div class="caption grey--text">Paquetes disponibles:</div>
          <div>{{ todo.paquetesDisponibles }}</div>
        </v-flex>
        <v-flex xs6 sm4 md1>
          <div class="caption grey--text">Valor por pieza:</div>
          <div>${{ todo.valorPieza }}</div>
        </v-flex>
        <v-flex xs6 sm4 md1>
          <div class="caption grey--text">Total invertido:</div>
          <div>${{ todo.valorTotal }}</div>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <v-btn
            color="indigo darken-4"
            outlined
            @click="restarProducto(todo.id, todo.paquetesDisponibles)"
          >
            <v-icon>mdi-minus</v-icon>
            Restar producto
          </v-btn>
          <v-btn
            :loading="descarga"
            outlined
            color="indigo darken-4"
            class="ml-5"
            @click="sumarProducto(todo.id, todo.paquetesDisponibles)"
          >
            <v-icon>mdi-plus</v-icon>
            Sumar produto
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
        {{ texto }}
        <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>

    <v-dialog max-width="700px" v-model="dialogSumar">
      <v-card>
          <v-toolbar color="indigo darken-4" dark elevation="0">
            <v-spacer />
            <div class="h1" style="font-size: 28px !important">
              Producto sumar
            </div>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-flex md12 lg12 class="d-flex mt-6 flex-warp">
              <v-flex
                md7
                lg7
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
              <v-form ref="formSumar">
                <v-text-field
                  label="Cantidad a sumar"
                  class="rounded"
                  type="number"
                  v-model="cantidadCambio"
                  :rules="inputResta"
                  dense
                  filled
                ></v-text-field>
              </v-form>
                
              </v-flex>
              <v-flex
                md5
                lg5
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
                <v-btn @click="sumarAlmacen()" height="55" depressed tile dark color="yellow darken-1">
                  sumar
                </v-btn>
                <v-btn class="ml-5" @click="dialogSumar = !dialogSumar" height="55" depressed tile dark color="yellow darken-1">
                  cancelar
                </v-btn>
              </v-flex>
            </v-flex>
          </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog max-width="700px" v-model="dialogRestar">
      <v-card>
          <v-toolbar color="indigo darken-4" dark elevation="0">
            <v-spacer />
            <div class="h1" style="font-size: 28px !important">
              Producto restar
            </div>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-flex md12 lg12 class="d-flex mt-6 flex-warp">
              <v-flex
                md7
                lg7
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
              <v-form ref="formRestar">
                <v-text-field
                  label="Cantidad a restar"
                  class="rounded"
                  type="number"
                  v-model="cantidadCambio"
                  :rules="inputResta"
                  dense
                  filled
                ></v-text-field>
              </v-form>
                
              </v-flex>
              <v-flex
                md5
                lg5
                style="margin-left: 1% !important; margin-right: 1% !important"
              >
                <v-btn @click="restarAlmacen()" height="55" depressed tile dark color="yellow darken-1">
                  restar
                </v-btn>
                <v-btn class="ml-5" @click="dialogRestar = !dialogRestar" height="55" depressed tile dark color="yellow darken-1">
                  cancelar
                </v-btn>
              </v-flex>
            </v-flex>
          </v-card-text>
      </v-card>
    </v-dialog>


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
      maximo: 0,
    };
  },
  methods: {
    postProducto() {
      if (this.$refs.from.validate()) { 
        axios
          .post(
            "http://178.128.183.223:3333/api/v1/administrador/deposito",
            {
              nombre: this.nombreProducto,
              cantidadExistente: this.cantidadExistente,
              tamanoPaquete: this.tamanioPaquete,
              valorPieza: this.valor,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            this.loading = false;
            //console.log(response);
            this.getVentaInicial()
            this.nombreProducto = ''
            this.cantidadExistente = ''
            this.tamanioPaquete = ''
            this.valor = ''
          })
          .catch((e) => e);
      }
    },
    getVentaInicial() {
      
      axios
        .get("http://178.128.183.223:3333/api/v1/administrador/deposito", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          //console.log(response);
          this.response = response.data;
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
    sumarProducto(id, maximo){
      this.idItem = id;
      this.dialogSumar = true;
      this.maximo = maximo
      maximo
    },
    restarProducto(id, maximo){
      maximo
      this.idItem = id;
      this.dialogRestar = true;
      this.maximo = maximo
    },
    comprobarValor() {
      //console.log(this.cantidad)
      //console.log(this.response[index].cantidadExistente)
      if (this.cantidadCambio >= 1 && this.cantidadCambio <= this.maximo){ //&& this.cantidadCambio <= this.response[index].cantidadExistente){
        return true;
      }else{
        this.texto = "La cantidad debe ser igual o menor a la cantidad de existencia";
        this.snackbar = true;
        return false;
      }
      
    },
    restarAlmacen(){
      if (this.$refs.formRestar.validate()) { 
        if(this.comprobarValor()){
          axios
          .put(
            "http://178.128.183.223:3333/api/v1/administrador/deposito/restar/"+this.idItem,
            {
              cantidadExistente: this.cantidadCambio,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            this.dialogRestar = false;
            //console.log(response);
            this.getVentaInicial()
          })
          .catch((e) => e);
        }
        
      }
      
    },
    sumarAlmacen(){
      //console.log(this.idItem)
      if (this.$refs.formSumar.validate()) { 
        
          axios
          .put(
            "http://178.128.183.223:3333/api/v1/administrador/deposito/sumar/"+this.idItem,
            {
              cantidadExistente: this.cantidadCambio,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            this.dialogSumar = false;
            //console.log(response);
            this.getVentaInicial()
          })
          .catch((e) => e); 
        
        
      }
      
    },
    eliminar(id){
      axios
          .delete(
            "http://178.128.183.223:3333/api/v1/administrador/deposito/"+id,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            //this.dialogSumar = false;
            //console.log(response);
            this.getVentaInicial()
          })
          .catch((e) => e); 
    }
  },
  mounted() {
    this.getVentaInicial();
    if (localStorage.loged != "admin") {
      this.$router.push("/");
    }
  },
};
</script>
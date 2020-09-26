<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      
      <v-col cols="8" sm="8" md="8">
        

        <v-card height="600" class="elevation-12">
          
          <v-toolbar color="indigo darken-4" dark elevation="0" height="100">
            <div class="h1" style="font-size: 28px !important;">Lista de productos</div>

            <v-spacer />

            
                  <v-chip
                    color="yellow lighten-1"
                    class="ml-6"
                    outlined
                    @click="cerrarSesion()"
                  >Cerrar sesión</v-chip>
                
          </v-toolbar>
          
          <v-list two-line subheader>
            <v-list-item
              :inactive="true"
              v-for="(item, index) in response"
              :key="item.id"
              @click="algo()"
            >
              <v-dialog max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-on="on" v-bind="attrs" outlined color="black">
                    <v-icon color="black">mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-toolbar color="indigo darken-4" dark elevation="0">
                    <v-spacer />
                    <div class="h1" style="font-size: 28px !important;">Editar producto</div>
                    <v-spacer />
                  </v-toolbar>
                  <div style=" margin-left: 10% !important; margin-right: 10% !important;">
                    <v-text-field
                      label="Nombre del producto"
                      class="rounded-lg"
                      style="padding-top: 10% !important;"
                      v-model="item.nombre"
                      :rules="inputRules"
                      dense
                      filled
                    ></v-text-field>
                    <v-flex md12 lg12 class="d-flex flex-warp">
                      <v-flex
                        md6
                        lg6
                        style=" margin-left: 10% !important; margin-right: 10% !important;"
                      >
                        <v-text-field
                          label="Precio venta"
                          class="rounded"
                          type="number"
                          v-model="item.precioVenta"
                          :rules="inputRules"
                          dense
                          filled
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        md6
                        lg6
                        style=" margin-left: 10% !important; margin-right: 10% !important;"
                      >
                        <v-text-field
                          label="Precio compra"
                          class="rounded"
                          type="number"
                          v-model="item.precioCompra"
                          :rules="inputRules"
                          dense
                          filled
                        ></v-text-field>
                      </v-flex>
                    </v-flex>
                    <v-text-field
                      label="Descripción"
                      class="rounded-lg"
                      v-model="item.descripcion"
                      :rules="inputRules"
                      dense
                      filled
                    ></v-text-field>
                    <v-flex md12 lg12 class="d-flex flex-warp">
                      <v-flex
                        md6
                        lg6
                        style=" margin-left: 10% !important; margin-right: 10% !important;"
                      >
                        <v-text-field
                          label="Stock"
                          class="rounded"
                          type="number"
                          v-model="item.cantidadExistente"
                          :rules="inputRules"
                          dense
                          filled
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        md6
                        lg6
                        style=" margin-left: 10% !important; margin-right: 10% !important;"
                      >
                        <v-text-field
                          label="Cantidad para alerta"
                          class="rounded"
                          v-model="item.cantidadAlerta"
                          type="number"
                          :rules="inputRules"
                          dense
                          filled
                        ></v-text-field>
                      </v-flex>
                    </v-flex>
                    <v-text-field
                      label="Codigo de barra"
                      class="rounded-lg"
                      v-model="item.codigo"
                      :rules="inputRules"
                      dense
                      filled
                    ></v-text-field>
                    <v-flex md12 lg12>
                      <v-btn
                        style="margin-left: 40%; margin-bottom: 5% !important; margin-top: 5% !important; "
                        :loading="loading"
                        dark
                        color="indigo darken-4"
                        @click="updateProduct(item.id, index)"
                      >Editar</v-btn>
                    </v-flex>
                  </div>
                </v-card>
                <div class="text-center ma-2">
                  <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
                    {{texto}}
                    <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
                  </v-snackbar>
                </div>
              </v-dialog>
              <v-list-item-content class="ml-6">
                <v-list-item-title v-text="item.nombre"></v-list-item-title>
                <v-list-item-subtitle
                  v-text='"stock: "+item.cantidadExistente+".Precio: $"+item.precioVenta'
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-show="false" icon v-bind="attrs" v-on="on" @click="añadirAVenta()">
                      <v-icon color="grey lighten-1">mdi-plus</v-icon>
                    </v-btn>
                    <v-dialog max-width="400px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-on="on" v-bind="attrs" outlined color="yellow lighten-1">
                          <v-icon color="yellow lighten-1">mdi-plus</v-icon>Añadir a venta
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>Añadir {{item.nombre}} a venta</v-card-title>
                        <div class>
                          <v-flex md12 lg12 class="d-flex flex-warp justify-center">
                            <v-flex md2>
                              <v-btn @click="cantidad--">-</v-btn>
                            </v-flex>
                            <v-flex md6>
                              <v-form>
                                <v-text-field
                                  dense
                                  filled
                                  type="number"
                                  v-model="cantidad"
                                  :rules="cantidadVentaRules"
                                ></v-text-field>
                              </v-form>
                            </v-flex>
                            <v-flex md2>
                              <v-btn @click="cantidad++">+</v-btn>
                            </v-flex>
                          </v-flex>
                        </div>
                        <v-card-actions>
                          <v-btn outlined>cancelar</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn @click="añadirAVenta(index,cantidad)">Añadir producto</v-btn>
                        </v-card-actions>
                      </v-card>
                      <div class="text-center ma-2">
                        <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
                          {{texto}}
                          <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
                        </v-snackbar>
                      </div>
                    </v-dialog>
                  </template>
                  <span>Añadir a formulario de venta</span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>
          </v-list>
        </v-card>
        
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <v-card height="100%" elevation="10">
          <v-list :dense="true" :nav="true">
            <v-toolbar color="indigo darken-4"  dark elevation="0">
              <v-spacer />
              <div class="h1" style="font-size: 28px !important;">
                  Carrito
              </div>
            <v-spacer />
            
          </v-toolbar>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in itemsDeVenta" :key="i" :inactive="true">
                <v-list-item-content>
                  <v-list-item-title v-text="item[0]"></v-list-item-title>
                  <v-list-item-subtitle v-text="item[3]"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="orange darken-1" outlined @click="eliminarCarrito(i)">
                    <v-icon color="orange darken-1" small>mdi-trash-can</v-icon>Eliminar
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              @click="vender()"
              tile
              elevation="0"
              :disabled="verCarrito"
              dark
              color="yellow lighten-1"
              
            >
              <v-icon color="white">mdi-currency-usd</v-icon>vender
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
        {{texto}}
        <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>Corte de caja</v-card-title>
        <v-card-text>
          <div>Continuar con esta accion provocara un corte de caja, es decir ver los resultados desde el ultimo corte de caja hasta la fecha para ver los resultados anteriores revisar los cortes de caja anteriores</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark @click="verCorteDeCaja()">Continuar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog2 = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!----     Dialogo cortes de caja    ----->
    <v-dialog v-model="dialog3" max-width="500px">
      <v-skeleton-loader :loading="loading" height="200" type="table-tbody">
        <v-card>
          <v-card-title>
            <v-card-title>Se ha realizado el corte de caja</v-card-title>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <div>Cantidad de ventas: {{cantidadDeVentas}}</div>
            <div>Total de las ventas: ${{responseCaja.total}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="cerrar()">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-dialog>
    <!--- Dialogo añadir cajero--->
    
    <!---   Dialogo promo   ---->
    <v-dialog v-model="dialogPromo" max-width="700px">
      <v-card>
        <v-toolbar color="blue accent-2" dark elevation="0">
          <v-spacer />
          <div class="h1" style="font-size: 28px !important;">Promociones</div>
          <v-spacer />
        </v-toolbar>
        <div style>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>mdi-account</v-icon>Individuales
            </v-tab>
            <v-tab>
              <v-icon left>mdi-lock</v-icon>Combinadas
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-select
                          :items="nombresProductos"
                          v-model="productoElegido"
                          label="Nombre"
                        ></v-select>
                    </v-col>
                    <v-col cols="2" md="2" sm="2">
                      <v-text-field v-model="aplica" label="aplica en:"></v-text-field>
                    </v-col>
                    <v-col cols="4"  md="4" sm="4">
                      <v-text-field v-model="descuentoI" label="descuento en pesos"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn @click="añadirPromoUno()" outlined  color="yellow lighten-1">
                    añadir a promoción
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-list :dense="true" :nav="true">
                        <v-list-item-group color="primary">
                          <v-list-item v-for="(item, i) in productosOferta" :key="i" :inactive="true">
                            <v-list-item-content>
                              <v-list-item-title v-text="item[2]"></v-list-item-title>
                              <v-list-item-subtitle v-text="item[1]"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn color="orange darken-1" outlined @click="eliminarPromo(i)">
                                <v-icon color="orange darken-1" small>mdi-trash-can</v-icon>Eliminar
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-col>
                    
                    <v-col cols="6">
                      <v-select
                          :items="nombresProductos"
                          v-model="productoElegido"
                          label="Nombre"
                        ></v-select>
                    </v-col>
                    <v-col cols="4" md="4" sm="4">
                      <v-text-field v-model="aplica" label="aplica en:"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-toolbar elevation="0">
                      <v-spacer />
                      <v-btn color="yellow lighten-1" outlined @click="addPaquete()">añadir al paquete</v-btn>
                      <v-spacer />
                    </v-toolbar>
                  </v-row>
                  <v-row>
                    <v-toolbar elevation="0">
                      <v-spacer />
                        <v-text-field v-model="descuentoI" label="descuento en pesos"></v-text-field>
                      <v-btn color="primary" @click="añadirPromoDos()" outlined class="ml-6">añadir paquete a promoción</v-btn>
                      <v-spacer />
                    </v-toolbar>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-card>
    </v-dialog>
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
      inputRules: [(value) => !!value || "Este campo es requerido."],
      cantidadVentaRules: [
        (value) => value > 0 || "No puede ser menos de uno.",
        (value) => !!value || "Este campo es requerido.",
      ],
      usuario: "",
      dialogUsuarios: false,
      timeout: 2000,
      contra: "",
      loading: false,
      snackbar: false,
      message: "",
      response: "",
      responseCaja: "",
      cantidad: 1,
      texto: "",
      itemsDeVenta: [],
      dia: "",
      hora: "",
      dialog2: false,
      dialog3: false,
      cantidadDeVentas: "",
      descripcion: null,
      nombreProducto: null,
      precioVenta: null,
      precioCompra: null,
      stock: '',
      stockAlerta: '',
      codigoBarra: '',
      cerveza: false,
      nombreCerveza: [
        "Bote Modelo",
        "Laton Victoria",
        "Media retornable Corona",
        "Mega pacifico",
        "Familiar michelob",
        "Cuarto stella",
        "Modelo 710",
        "Barrilito",
        "Stella botella",
      ],
      descripcionCerveza: [
        "Bote Modelo 355ml",
        "Laton Victoria 473ml",
        "Media retornable Corona 355ml",
        "Mega pacifico 1200ml",
        "Familiar michelob 940ml",
        "Cuarto stella 250ml",
        "Modelo 710ml",
        "Barrilito 325ml",
        "Stella botella 330ml",
      ],
      nomCerveza: '',
      desCerveza: '',
      dialogPromo: false,
      productoElegido: "",
      aplica: "",
      descuentoI: "",
      productosOferta: [],
      nombresProductos: [],
      idsNombresProductos: [],
    };
  },
  methods: {
    addPaquete() {
      if (this.comprobarValor2()) {
        var nombre = this.productoElegido;
        var item = [];
        item.push(this.saberIdPromo());
        item.push(this.aplica);
        item.push(nombre);
        this.productosOferta.push(item);
        this.productoElegido = "";
        this.aplica = "";
        ////console.log("asd"); this.productosOferta.push({"id":this.saberIdPromo(),"cantidad":this.aplica,"nombre":nombre});
      }
    },
    eliminarPromo(i) {
      this.productosOferta.pop(i);
    },
    comprobarValor2() {
      ////console.log("aplica: "+this.aplica+"    descuentiI: "+this.descuentoI)
      if (this.aplica >= 1) return true;
      return false;
    },
    comprobarValor3() {
      ////console.log("aplica: "+this.aplica+"    descuentiI: "+this.descuentoI)
      if (this.aplica >= 1 && this.descuentoI >= 1) return true;
      return false;
    },
    getProductos() {
      this.loading = true;

      axios
        .get("http://178.128.183.223:3333/api/v1/vendedor/productos")
        .then((response) => {
          this.response = response.data;
          //console.log(response.data);
          this.response.forEach(element => {
            this.nombresProductos.push(element.nombre)
            this.idsNombresProductos.push(element.id)
          })
          this.loading = false;
        })
        .catch((e) => e);
    },
    addProduct() {
      this.loading = true;
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/productos",
          {
            nombre: this.nombreProducto,
            precioCompra: this.precioCompra,
            precioVenta: this.precioVenta,
            descripcion: this.descripcion,
            cantidadExistente: this. stock,
            cantidadAlerta: this.stockAlerta,
            codigo: this.codigoBarra,
            imagen: 'hola',
     
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.loading = false;
          this.response = response.data;
          //console.log(response.data)
          this.enable = true;
          this.texto = "Añadido correctamente";
          this.snackbar = true;
          this.getProductos()
        })
        .catch((e) => e);
    },
    addProductChooser() {
      this.loading = true;
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/productos",
          {
            nombre: this.nombreCerveza[this.saberId()],
            precioCompra: this.precioCompra,
            precioVenta: this.precioVenta,
            descripcion: this.descripcionCerveza[this.saberId()],
            cantidadExistente: this. stock,
            cantidadAlerta: this.stockAlerta,
            codigo: this.codigoBarra,
            imagen: 'hola',
     
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.loading = false;
          this.response = response.data;
          //console.log(response.data)
          this.enable = true;
          this.texto = "Añadido correctamente";
          this.snackbar = true;
          this.getProductos()
          
        })
        .catch((e) => e);
    },
    saberId(){
      for (let index = 0; index < this.nombreCerveza.length; index++) {
       
        if( this.nombreCerveza[index] == this.nomCerveza){
          return index;
        }
      }
    },
    saberIdPromo(){
      for (let index = 0; index < this.response.length; index++) {
       
        if(this.response[index].nombre == this.productoElegido){
          return this.response[index].id;
        }
      }
    },
    añadirPromoUno() {
      //console.log("id:"+this.saberIdPromo()+"pe:"+this.productoElegido)
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/paquete",
          {
            id: this.saberIdPromo(),
            producto: this.productoElegido,
            cantidad: this.aplica,
            descuento: this.descuentoI,
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
          this.dialogPromo = false
          this.texto = "Añadido correctamente";
          this.snackbar = true;
        })
        .catch((e) => e);
    },
    añadirPromoDos() {
      //console.log(this.productosOferta[0][0])
      //console.log(this.descuentoI)
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/paquete/multiple",
          {
            productos: JSON.stringify(this.productosOferta),
            descuento: this.descuentoI,
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
          this.dialogPromo = false
          this.texto = "Añadido correctamente";
          this.snackbar = true;
        })
        .catch((e) => e);
    },
    comprobar() {},
    algo() {},
    añadirAVenta(index, cantidad) {
      if (this.comprobarValor()) {
        var nombre = this.response[index].nombre;
        var total = (
          parseFloat(this.response[index].precioVenta) * parseFloat(cantidad)
        ).toFixed(2);
        var item = [];
        item.push(nombre);
        item.push(this.response[index].id);
        item.push(cantidad);
        item.push(total);
        this.itemsDeVenta.push(item);
        this.cantidad = 0;
      }
    },
    eliminarCarrito(i) {
      this.itemsDeVenta.pop(i);
    },
    comprobarValor() {
      if (this.cantidad >= 1) return true;
      return false;
    },
    vender() {
      this.dateNow();
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/vendedor/vender",
          {
            total: 10,
            hora: this.hora,
            fecha: this.dia,
            productos: JSON.stringify(this.itemsDeVenta),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          response;
          this.getProductos();
          this.texto = "Vendido correctamente";
          this.snackbar = true;
        })
        .catch((e) => e);
    },
    updateProduct(id, n) {
      this.loading = true;
      this.response[n].nombre;
      axios
        .put(
          "http://178.128.183.223:3333/api/v1/administrador/productos/" + id,
          {
            nombre: this.response[n].nombre,
            precioCompra: this.response[n].precioCompra,
            precioVenta: this.response[n].precioVenta,
            descripcion: this.response[n].descripcion,
            cantidadExistente: this.response[n].stock,
            cantidadAlerta: this.response[n].stockAlerta,
            codigo: this.response[n].codigoBarra,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.loading = false;
          this.response = response.data;
          this.enable = true;
          this.texto = "Editado correctamente";
          this.snackbar = true;
          this.getPlatillos();
        })
        .catch((e) => e);
    },
    cerrar() {
      this.dialog2 = false;
      this.dialog3 = false;
    },
    corteDeCaja() {
      this.dateNow();
      axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/corte",
          {
            hora: this.hora,
            fecha: this.fecha,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          response;
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
    verCorteDeCaja() {
      //api/v1/vendedor/corte
      this.dialog3 = true;
      axios
        .get(
          "http://178.128.183.223:3333/api/v1/administrador/ventas/corte-actual"
        )
        .then((response) => {
          this.responseCaja = response.data[0];
          //console.log(response.data[0]);
          this.loading = false;
          var ventas = this.responseCaja.ventas;
          this.cantidadDeVentas = ventas.length;
          this.corteDeCaja();
        })
        .catch((e) => e);
    },
    cerrarSesion(){
      localStorage.loged = ""
       this.$router.push('/')
    }
  },
  mounted() {
    this.getProductos();
    if(localStorage.loged != 'user'){
      this.$router.push('/')
    }
  },
  computed: {
    verCarrito() {
      if (this.itemsDeVenta.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
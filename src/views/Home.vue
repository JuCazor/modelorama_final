<template>
  <v-container class="fill-height" fluid>
    <v-row>
          <v-col cols="12" sm="12" md="12">
          <v-card >
          <v-toolbar dark color="indigo darken-4" elevation="0" >Atajos:
            <v-flex md11 class="d-flex flex-wrap">
              <v-slide-group show-arrows>
                <v-slide-item>
                  <v-chip
                    color="yellow darken-1"
                    class="ml-6"
                    text-color="indigo darken-4"
                    tile dark
                    to="/almacen"
                  >Almacen</v-chip>
                </v-slide-item>
                <v-slide-item>
                  <v-chip
                    color="yellow darken-1"
                    text-color="indigo darken-4"
                    tile dark
                    @click="dialog2 = true"
                  >Realizar corte de caja</v-chip>
                </v-slide-item>
                <v-slide-item>
                  <v-chip tile dark text-color="indigo darken-4" text color="yellow darken-1" to="/ventas/historial/corte">Historial ventas</v-chip>
                </v-slide-item>
                <v-slide-item>
                    <v-chip tile dark text-color="indigo darken-4" color="yellow darken-1" to="/promociones">Ver las promociones</v-chip>
                </v-slide-item>
                <v-slide-item>
                    <v-chip tile dark text-color="indigo darken-4" color="yellow darken-1" to="/envases">Retornables</v-chip>
                </v-slide-item>
                <v-slide-item>
                  <v-chip text-color="indigo darken-4" color="yellow darken-1" tile dark @click="dialogPromo = true">Añadir promociones <v-icon>mdi-plus</v-icon> </v-chip>
                </v-slide-item>
                <v-slide-item>
                  <v-dialog max-width="600px">
                <template color="yellow darken-1" v-slot:activator="{ on, attrs }">
                  <v-chip height="50" tile text-color="indigo darken-4" dark color="yellow darken-1" v-on="on" v-bind="attrs">
                    Añadir producto
                    <v-icon>mdi-plus</v-icon>
                  </v-chip>
                </template>

                <v-card>
                  <v-toolbar color="indigo darken-4" dark elevation="0">
                    <v-spacer />
                    <div class="h1" style="font-size: 28px !important;">Añadir producto</div>
                    <v-spacer />
                  </v-toolbar>
                  <v-flex style="margin-left: 35%" md12 lg12 sm12>
                    <v-checkbox color="#FFAD5C" v-model="cerveza" label="¿Cerveza?"></v-checkbox>
                    <v-checkbox color="#FFAD5C" v-model="retornable" label="¿Retornable?"></v-checkbox>
                  </v-flex>
                  <div style=" margin-left: 10% !important; margin-right: 10% !important;">
                    <v-text-field
                      label="Nombre del producto"
                      class="rounded-lg"
                      style="padding-top: 10% !important;"
                      v-model="nombreProducto"
                      :rules="inputRules"
                      v-if="!cerveza"
                      dense
                      filled
                    ></v-text-field>
                    <v-col class="selects" cols="12" sm="12" v-else>
                      <v-row  align="center" justify="center" class="flex-warp">
                        <v-col cols="12" md="4" sm="4">
                          <v-select :items="nombreCerveza" v-model="nomCerveza" label="Marca"></v-select>
                        </v-col>
                        <v-col cols="12" md="4" sm="4">
                          <v-select :items="presentaciones" v-model="presi" label="Presentaciones"></v-select>
                        </v-col>
                        <v-col style="margin-top: -13%" cols="12" md="4" sm="4">
                          <v-checkbox color="#FFAD5C" v-model="otro" class="mx-2" label="otro"></v-checkbox>
                          <v-select v-if="!otro" :items="descripcionCerveza" v-model="descri" label="Volumen"></v-select>
                          <v-text-field
                            label="ml"
                            class="rounded-lg"
                            v-model="descri"
                            :rules="inputRules"
                            v-else
                            dense
                            filled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    
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
                          v-model="precioVenta"
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
                          v-model="precioCompra"
                          :rules="inputRules"
                          dense
                          filled
                        ></v-text-field>
                      </v-flex>
                    </v-flex>
                    <v-text-field
                      label="Descripción"
                      class="rounded-lg"
                      v-model="descripcion"
                      :rules="inputRules"
                      v-if="!cerveza"
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
                          v-model="stock"
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
                          v-model="stockAlerta"
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
                      v-model="codigoBarra"
                      :rules="inputRules"
                      dense
                      filled
                    ></v-text-field>
                    <v-flex md12 lg12>
                      <v-btn
                        style="margin-left: 40%; margin-bottom: 5% !important; margin-top: 5% !important; "
                        :loading="loading"
                        v-show="!cerveza"
                        dark
                        color="indigo darken-4"
                        @click="addProduct()"
                      >Añadir</v-btn>
                      <v-btn
                        style="margin-left: 40%; margin-bottom: 5% !important; margin-top: 5% !important; "
                        :loading="loading"
                        v-show="cerveza"
                        dark
                        color="indigo darken-4"
                        @click="addProductChooser()"
                      >Añadir</v-btn>
                    </v-flex>
                  </div>
                </v-card>
                <div class="text-center ma-2">
                  <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true">
                    {{texto}}
                    <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                  </v-snackbar>
                </div>
              </v-dialog>
                </v-slide-item>
                <v-slide-item>
                  <v-chip text-color="indigo darken-4"   color="yellow darken-1" tile dark to="/cajeros">
                   Añadir cajero<v-icon>mdi-plus</v-icon></v-chip>
                </v-slide-item>
                <v-divider></v-divider>
                <v-slide-item>
                  <v-chip
                    color="yellow darken-1"
                    right
                    text-color="indigo darken-4"
                    tile dark
                    @click="cerrarSesion()"
                  >Cerrar sesión</v-chip>
                </v-slide-item>
              </v-slide-group>
              
              
                </v-flex>
              </v-toolbar>
            </v-card>
          </v-col>
        </v-row>
    <v-row class="fill-height"> 
      <v-col cols="8" sm="8" md="8">
        <v-card height="600" class="elevation-12"> 
          <v-toolbar color="indigo darken-4" dark elevation="0" height="100">
            <div class="h1" style="font-size: 28px !important;">Lista de productos</div>
            <v-spacer />
            <v-text-field
              height="20"
              v-model="prodBuscar"
              outlined
              
              label="Buscar"
              type="text"
              append-icon="mdi-magnify"
              append-outer-icon="mdi-close"
              @click:append="buscar()"
              @click:append-outer="getProductos()"
            >
            </v-text-field>
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
                  <v-btn v-on="on" v-bind="attrs" tile dark depressed class="rounded" color="lime darken-1">
                    <v-icon >mdi-glass-mug-variant</v-icon>
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
              <v-btn tile dark depressed @click="eliminarProducto(item.id)" class="rounded" color="red darken-1">
                <v-icon >mdi-trash-can</v-icon>
              </v-btn>
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
                    <v-dialog max-width="400px" >
                      
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-on="on" v-bind="attrs" tile depressed dark color="yellow darken-1">
                          <v-icon color="white">mdi-plus</v-icon>Añadir a venta
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>Añadir {{item.nombre}} a venta</v-card-title>
                        <div class>
                          <v-flex md12 lg12 class="d-flex flex-warp justify-center">
                            <v-flex md2>
                              <v-btn color="yellow darken-1" height="56" dark @click="cantidad--">-</v-btn>
                            </v-flex>
                            <v-flex md6>
                              <v-form>
                                <v-text-field
                                  dense
                                  filled
                                  type="number"
                                  label="Piezas:"
                                  v-model="cantidad"
                                  :rules="cantidadVentaRules"
                                ></v-text-field>
                              </v-form>
                            </v-flex>
                            <v-flex md2>
                              <v-btn class="ml-1" height="56" color="yellow darken-1" dark @click="cantidad++">+</v-btn>
                            </v-flex>
                          </v-flex>
                        </div>
                        <v-card-actions>
                          <v-btn >cerrar</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="indigo darken-4" dark @click="añadirAVenta(index,cantidad)">Añadir producto</v-btn>
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
            <v-divider color="indigo darken-4" style="margin-left: 5%; width: 90%" inset></v-divider>
          </v-list>
        </v-card>
        
      </v-col>
      <v-col cols="4" sm="4" md="4">
        <v-card height="100%" elevation="10">
          <v-list :dense="true" :nav="true">
            <v-toolbar color="indigo darken-4"  dark elevation="0">
              <v-spacer />
              <div class="h1" style="font-size: 28px !important;">
                  <v-icon>mdi-cart</v-icon> carrito
              </div>
            <v-spacer />
            
          </v-toolbar>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in itemsDeVenta" :key="i" :inactive="true">
                <v-list-item-content>
                  <v-list-item-title v-text="item[0]"></v-list-item-title>
                   <v-list-item-subtitle v-text='"cantidad:"+item[2]'></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="orange darken-1" outlined @click="eliminarCarrito(i)">
                    <v-icon color="orange darken-1" small>mdi-trash-can</v-icon>Eliminar
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider color="indigo darken-4" style="margin-left: 5%; width: 90%" inset></v-divider>
            </v-list-item-group>
          </v-list>
          <v-row v-if="ventaEspecial">
            <v-flex  md12 sm12 lg12>
              <v-form>
                <v-text-field style="width: 80%; margin-left: 10%" v-model="nombreComprador" label="Nombre del cliente"></v-text-field> 
              </v-form>
            </v-flex>
            
          </v-row>
          <v-row style="margin-left: 37%; width: 26%" v-if="!verCarrito">
            <v-flex md12 lg12 sm12>
              <v-checkbox color="#FFAD5C" v-model="ventaEspecial" class="mx-2" label="Venta especial"></v-checkbox>
            </v-flex>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              @click="vender()"
              tile
              elevation="0"
              :disabled="verCarrito"
              dark
              color="yellow darken-1"
              
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
    <!--- Dialogo preventa--->
    
      <v-dialog v-model="dialogPreventa" max-width="300px">
          <v-card color="white">
            <v-toolbar color="indigo darken-4"  dark elevation="0">
              <v-spacer />
              <div class="h1" style="font-size: 28px !important;">
                  Complete la compra
              </div>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <v-list :dense="true" :nav="true">
                    <v-list-item-group color="primary">
                      <v-list-item v-for="(item, i) in responsePreventa.productos" :key="i" :inactive="true">
                        <v-list-item-content>
                          
                          <v-list-item-title class="text-center" v-text='item[0]+" X"+(item[3]/item[4])'></v-list-item-title>
                          <v-list-item-subtitle class="text-center" v-text='"$"+item[3]'></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      
                    </v-list-item-group>
                    
                  </v-list>
                </v-col>
                <v-col cols="12" md="12" sm="12" >
                  <v-row v-if="responsePreventa.descuento > 0" style="width: 60%; margin-left: 20%">
                    <h4  style="float: left; ">
                      Total: $<p style="margin-left: 3px; float: right;" class="text-decoration-line-through">  ${{totalPreventa}}</p>{{(totalPreventa-responsePreventa.descuento).toFixed(2)}} 
                    </h4>
                    
                  </v-row>
                  <v-row style="width: 36%; margin-left: 32%" v-else>
                    <h4 style="float: left; ">
                      Total: $<p style="margin-left: 3px; float: right;">{{totalPreventa}}</p> 
                    </h4>
                  </v-row>
                  
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                    <v-toolbar elevation="0">
                      <v-spacer />
                      <v-btn color="yellow darken-1" @click="terminarVenta()" depressed tile dark>Terminar venta</v-btn>
                      <v-spacer />
                    </v-toolbar>
                  </v-row>
              
            </v-card-actions>
          </v-card>
      </v-dialog>

    <!---   Dialogo promo   ---->
    <v-dialog v-model="dialogPromo" max-width="700px">
      <v-card>
        <v-toolbar color="indigo darken-4" dark elevation="0">
          <v-spacer />
          <div class="h1" style="font-size: 28px !important;">Promociones</div>
          <v-spacer />
        </v-toolbar>
        <div style>
          <v-tabs vertical>
            <v-tab>
              <v-icon color="indigo darken-4" left>mdi-brightness-percent</v-icon>Individuales
            </v-tab>
            <v-tab>
              <v-icon color="indigo darken-4" left>mdi-animation</v-icon>Combinadas
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
                  <v-btn @click="añadirPromoUno()" dark tile depressed  color="yellow darken-1">
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
                      <v-btn color="yellow lighten-1" block dark tile depressed @click="addPaquete()">añadir al paquete</v-btn>
                      <v-spacer />
                    </v-toolbar>
                  </v-row>
                  <v-row>
                    <v-toolbar elevation="0">
                      <v-spacer />
                        <v-text-field class="mt-3" v-model="descuentoI" label="descuento en pesos"></v-text-field>
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
      presi: '',
      responseCaja: "",
      retornable: false,
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
        "Modelo",
        "Victoria",
        "Corona",
        "Pacifico",
        "Michelob",
        "Stella",
        "Barrilito",
      ],
      presentaciones: [
        "Bote",
        "Laton",
        "Media retornable",
        "Mega",
        "Familiar",
        "Cuarto",
        "Modelo 710",
        "Botella",
        "Botella premium"
      ],
      descripcionCerveza: [
        "355ml",
        "473ml",
        "355ml",
        "1200ml",
        "940ml",
        "250ml",
        "710ml",
        "325ml",
        "330ml",
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
      ventaEspecial: false,
      responsePreventa: [],
      dialogPreventa: false,
      totalPreventa: 0,
      nombreComprador: null,
      otro: false,
      descri: '',
      prodBuscar: '',
      addaVenta: false,
    };
  },
  methods: {
    buscar(){
      

      axios
        .post("http://178.128.183.223:3333/api/v1/administrador/productos/busqueda/nombre",
        {
          nombre: this.prodBuscar
        },
        {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          })
        .then((response) => {
          this.response = response.data;
          //console.log(response.data);
          
        })
        .catch((e) => e);
    },
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
        .get("http://178.128.183.223:3333/api/v1/vendedor/productos",
        {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.response = response.data;
          console.log(response.data);
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
            envases: this.retornable
     
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
          this.nombreProducto = ""
          this.precioCompra = ""
          this.precioVenta = ""
          this.descripcion = ""
          this.stock = ""
          this.stockAlerta = ""
          this.codigoBarra = ""
          this.retornable = false
          this.cerveza = false
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
            nombre: this.nomCerveza+" "+this.presi+" "+this.descri,
            precioCompra: this.precioCompra,
            precioVenta: this.precioVenta,
            descripcion: this.nomCerveza+" "+this.presi+" "+this.descri,
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
          this.nombreProducto = ""
          this.precioCompra = ""
          this.nomCerveza = ""
          this.presi = ""
          this.descri =  ""
          this.precioVenta = ""
          this.descripcion = ""
          this. stock = ""
          this.stockAlerta = ""
          this.codigoBarra = ""
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
      if (this.comprobarValor(index)) {
        var nombre = this.response[index].nombre;
        var total = (
          parseFloat(this.response[index].precioVenta) * parseFloat(cantidad)
        ).toFixed(2);
        var item = [];
        item.push(nombre);
        item.push(this.response[index].id);
        item.push(cantidad);
        item.push(total);
        item.push(this.response[index].precioVenta);
        this.itemsDeVenta.push(item);
        this.cantidad = 0;
      }
    },
    eliminarCarrito(i) {
      this.itemsDeVenta.pop(i);
    },
    comprobarValor(index) {
      //console.log(this.cantidad)
      //console.log(this.response[index].cantidadExistente)
      if (this.cantidad >= 1 && this.cantidad <= this.response[index].cantidadExistente  ){
        return true;
      }else{
        this.texto = "La cantidad debe ser igual o menor a la cantidad de existencia";
        this.snackbar = true;
        return false;
      }
      
    },
    vender() {
      //this.dateNow();
        this.totalPreventa = 0;
        axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/preventa",
          {
            //total: 10,
            //ora: this.hora,
            //fecha: this.dia,
            productos: JSON.stringify(this.itemsDeVenta),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.responsePreventa = response.data;
          //console.log(response)
          this.dialogPreventa = true; 
          response.data.productos.forEach(element =>{
            //console.log("elemento: "+element[3])
            this.totalPreventa = (
              parseFloat(this.totalPreventa) + parseFloat(element[3])
            ).toFixed(2); 
          })
          //this.texto = "Vendido correctamente";
          //this.snackbar = true;
        })
        .catch((e) => e);
      
      
    },
    terminarVenta() {
      this.dateNow();
      //var falseF = false
      //console.log(this.itemsDeVenta[0])
      //console.log(this.responsePreventa.promocionesAplicables)
      //console.log(this.ventaEspecial)
      if(this.ventaEspecial){
        //console.log(this.nombreComprador)
        if(this.nombreComprador != null){
          axios
          .post(
            "http://178.128.183.223:3333/api/v1/administrador/vender",
            {
              //total: 10,
              hora: this.hora,
              fecha: this.dia,
              productos: this.responsePreventa.productos,
              promocionesAplicables: this.responsePreventa.promocionesAplicables,
              ventaExtraordinaria: this.ventaEspecial,
              nombreComprador: this.nombreComprador,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            }
          )
          .then((response) => {
            response
            //this.responsePreventa = response.data;
            //console.log("asdadad")
            //console.log(response)
            this.dialogPreventa = false; 
            this.totalPreventa = 0
            this.nombreComprador = ''
            this.texto = "Venta terminada";
            this.snackbar = true;
            this.getProductos();
            for (let index = 0; index < this.itemsDeVenta.length; index++) {
              this.eliminarCarrito(index);
              
            }
            this.itemsDeVenta = []
          })
          .catch((e) => e);
        }else{
          this.texto = "Debe añadir el nombre del cliente";
          this.snackbar = true;
        }
        
      }else{
        axios
        .post(
          "http://178.128.183.223:3333/api/v1/administrador/vender",
          {
            //total: 10,
            hora: this.hora,
            fecha: this.dia,
            productos: this.responsePreventa.productos,
            promocionesAplicables: this.responsePreventa.promocionesAplicables,
            ventaExtraordinaria: this.ventaEspecial,
            nombreComprador: 'SN',
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          response
          //this.responsePreventa = response.data;
          //console.log("asdadad")
          //console.log(response)
          this.dialogPreventa = false; 
          this.totalPreventa = 0
          this.nombreComprador = ''
          this.texto = "Venta terminada";
          this.snackbar = true;
          this.getProductos();
          for (let index = 0; index < this.itemsDeVenta.length; index++) {
            this.eliminarCarrito(index);
            
          }
          this.itemsDeVenta = []
        })
        .catch((e) => e);
      }
      
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
            cantidadExistente: this.response[n].cantidadExistente,
            cantidadAlerta: this.response[n].cantidadAlerta,
            codigo: this.response[n].codigo,
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
            fecha: this.dia,
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
          "http://178.128.183.223:3333/api/v1/administrador/ventas/corte-actual",
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
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
    },
    eliminarProducto(id){
      axios
        .put("https://178.128.183.223:3333/api/v1/administrador/productos/inhabilitar/"+id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          })
        .then((response) =>{
          response
          console.log(response)
          this.getProductos()
        }).catch((e) => {
          e
          console.log(e)
        })
    }
  },
  mounted() {
    this.getProductos();
    if(localStorage.loged != 'admin'){
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
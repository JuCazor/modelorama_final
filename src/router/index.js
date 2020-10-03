import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Promociones from '../views/Promociones.vue'
import Cajeros from '../views/Cajeros.vue'
import VentasCajero from '../views/VentasCajero.vue'
import Almacen from '../views/Almacen.vue'
import Envases from '../views/Envases.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: Home
    },
    {
      path: '/envases',
      name: 'envases',
      component: Envases
    },
    {
      path: '/almacen',
      name: 'almacen',
      component: Almacen
    },
    {
      path: '/cajeros',
      name: 'cajeros',
      component: Cajeros
    },
    {
      path: '/ventas/cajero',
      name: 'ventacajero',
      component: VentasCajero
    },
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    /*
    {
      path: '/prueba',
      name: 'prueba',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about"  './components/AddProduct.vue'),
    },
    */ 
    /*{
      path: '/prueba',
      name: 'prueba',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about"  './components/AddProduct.vue'),
      beforeEnter: (to, from, next) => {
        // Is the user name not null
        if(to.params.name == 'admin') {
          next() // Take you to /chat
        } else {
            // If params.name is blank or in your case, does not have permission, redirect back to the welcome page
          next({ name: 'login' }) 
        }
      }
    }, */
    {
      path: '/promociones',
      name: 'promociones',
      component: Promociones,
    },
    /*
    {
      path: '/pruebacaja',
      name: 'pruebacaja',
      component: () => import('./components/CorteDeCaja.vue'),
    },
    */
    {
      path: '/ventas/historial/corte',
      name: 'historialventasindividual',
      component: () => import('../views/HistorialVentasTotales.vue')
    },
    {
      path: '/ventas/historial/:id',
      name: 'historiaVentas',
      component: () => import('../views/HistorialVentas.vue'),
    } 
  ]
})

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from 'firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      requiresAuth:true
    }

  },
  {
    path: "/login",
    name: "Login",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    meta:{
      requiresAuth:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signin.vue"),
  },
  {
    path: "/reservacion",
    name: "Reservacion",
    meta:{
      requiresAuth:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RealizarReservacion.vue"),
  },
  
  {
    path: "/campeonatos",
    name: "Campeonatos",
    meta:{
      requiresAuth:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Campeonatos.vue"),
  },
  {
    path: "/admin-participantes",
    name: "AdminParticipantes",
    meta:{
      requiresAuth:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminParticipantes.vue"),
  },
  {
    path: "/inscripcion",
    name: "Inscripcion",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inscripcion.vue"),
  },
  {
    path: "/cliente-reservacion",
    name: "ClienteReservacion",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ClienteReservacion.vue"),
  },
  {
    path: "/inscripcion-campeonato",
    name: "Inscripcion",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inscripcion.vue"),
  },
  {
    path: "/sobre-nosotros",
    name: "SobreNosotros",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SobreNosotros.vue"),
  },
  {
    path: "/invitado",
    name: "Invitado",
    meta:{
      requiresGuest:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Invitado.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


//nav guards
router.beforeEach((to,from,next) => {
  // check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check i not logged in
    if (!firebase.auth().currentUser) {
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
       // check i not logged in
    if (firebase.auth().currentUser) {
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      // proceed to route
      next();
    }
  }else{
    // proceed to route
    next();
  }
});
export default router;

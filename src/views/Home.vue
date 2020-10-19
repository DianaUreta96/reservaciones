<template>
  <b-row class="justify-content-center">
    <b-col md="8">
     <h1 class="mt-5 text-white">
       Bienvenido a Cancha Sintética El Molino
     </h1>
     <!-- <b-button class="mt-5 mx-4 text-white" variant="outline-light">Sobre Nosotros</b-button> -->
     <b-button to="/reservacion" class="mt-5 mx-4 text-white" variant="outline-light">Realizar Reservación</b-button>
     <b-button to="/campeonatos" class="mt-5 mx-4 text-white" variant="outline-light">Crear Campeonatos</b-button>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
};
</script>

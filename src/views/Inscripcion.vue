<template>
  <b-row class="justify-content-center">
    <b-col md="5">
      <b-card class="mt-5" title="Inscripción">
        <b-card-text>
          <b-form @submit.prevent="nuevoParticipante()">
            <!-- Muestra los campionatos disponibles -->
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
            <!-- campo nombre -->
            <b-form-group
              id="input-group-2"
              label="Nombre:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="name"
                required
                placeholder="Nombre de tu equipo"
              ></b-form-input>
            </b-form-group>

          <p class="text-muted mt-3">Recuerda que solo pueden participar un numero limitado de equipos</p>
            <b-btn type="submit" variant="primary">Crear</b-btn>
          </b-form>
        </b-card-text>
      </b-card>
    </b-col>
    
  </b-row>
</template>

<script>
import db from "../firebaseInit";
export default {
  data() {
    return {
      selected: null,
      name: "",
      // nameCampeonato:'',
      options: [{ value: null, text: "Seleccion el campeonato" }],
    };
  },
  mounted: function () {
    this.optenerDatos();
  },
  methods: {
    optenerDatos() {
      this.items = [];
      db.collection("Campeonatos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let datos = {
              value: doc.id,
              text: doc.data().nombre,
            };
            this.options.push(datos);
          });
        });
    },

    nuevoParticipante(){
          var that = this;
         db.collection("Participantes")
          .add({
            nombre : that.name,
            torne:that.selected
            
          })
          .then(function (docRef) {
              that.name= "",
              that.quantity=""
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
    }
  },
};
</script>


<style>
</style>
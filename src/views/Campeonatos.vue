<template>
  <b-row class="justify-content-center">
    <b-col md="5">
      <b-card class="mt-5" title="Crear Campeonato">
        <b-card-text>
          <b-form @submit.prevent="CrearCampeonato()">
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
                placeholder="Ingrese el nombre"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Cantidad de participantes:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="quantity"
                required
                type="number"
                placeholder="Numero de participantes"
              ></b-form-input>
            </b-form-group>
            <b-btn type="submit" variant="primary">Crear</b-btn>
          </b-form>
        </b-card-text>
      </b-card>
    </b-col>
    <b-col md="12" class="mt-5">
      <b-card>
        <!-- tabla  -->
        <b-table striped hover :items="items" :fields="fields">
          <!-- El boton de la tabla -->
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="danger"
              :id="id"
              @click="Eliminar(row.item.id)"
              class="mr-1"
            >
              Eliminar
            </b-button>
          </template>
        </b-table>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import db from "@/firebaseInit";
export default {
  name: "campeonatos",
  data() {
    return {
      name: "",
      quantity: "",
      fields: ["Nombre", "Participantes", "actions"],
      items: [],
    };
  },
  mounted: function () {
    this.optenerDatos();
  },
  methods: {
    CrearCampeonato() {
      var that = this;
      db.collection("Campeonatos")
        .add({
          nombre: that.name,
          participantes: that.quantity,
        })
        .then(function (docRef) {
          that.name = "";
          that.quantity = "";
          that.optenerDatos();
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    optenerDatos() {
      this.items = [];
      db.collection("Campeonatos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let datos = {
              Nombre: doc.data().nombre,
              Participantes: doc.data().participantes,
              id: doc.id,
            };
            this.items.push(datos);
            console.log(`${doc.id} => ${doc.data()}`);
          });
        });
    },
    Eliminar(id) {
      var that = this;
      db.collection("Campeonatos")
        .doc(id)
        .delete()
        .then(function () {
          that.optenerDatos();
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      console.log(id);
    },
  },
};
</script>

<style>
</style>
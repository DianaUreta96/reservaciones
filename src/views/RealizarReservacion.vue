<template>
  <b-row class="justify-content-center">
    <b-col md="6">
      <h1 class="mt-5 text-white">Realizar Reservación</h1>
      <b-card>
        <b-card-text>
          <!-- mi formulario-->
          <b-form @submit.prevent="crear">
            <!-- campo nombre -->
            <b-form-group
              id="input-group-2"
              label="Nombre:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Ingrese su nombre"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Apellido:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="form.apellido"
                required
                placeholder="Ingrese su apellido"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Teléfono:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                v-model="form.telefono"
                required
                type="number"
                placeholder="Ingrese su número de teléfono"
              ></b-form-input>
            </b-form-group>
            <!-- calendario -->
            <div>
              <label for="example-datepicker">Fecha</label>
              <b-form-datepicker
                id="example-datepicker"
                v-model="form.fecha"
                class="mb-2"
                required
              ></b-form-datepicker>
            </div>
            <!-- hora -->
            <div>
              <b-time v-model="form.hora" locale="en" required></b-time>
            </div>

            <div class="d-flex justify-content-end">
              <b-button variant="success mt-5" type="submit"
                >Confirmar</b-button
              >
            </div>
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
  name: "Reservaciones",
  data() {
    return {
      form: {
        name: "",
        apellido: "",
        telefono: "",
        fecha: "",
        hora: "",
      },
      fields: ["Nombre", "Fecha", "Telefono", "actions"],
      items: [],
    };
  },
  mounted: function () {
    this.optenerDatos();
  },
  methods: {
    crear() {
      if (this.form.fecha !== "" && this.form.hora !== "") {
        var that = this;
        db.collection("Reservaciones")
          .add({
            nombres: that.form.name,
            apellidos: that.form.apellido,
            telefono: that.form.telefono,
            fecha: that.form.fecha,
            hora: that.form.hora,
          })
          .then(function (docRef) {
            that.limpiar();
            that.optenerDatos();
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    Eliminar(id) {
      var that = this;
      db.collection("Reservaciones")
        .doc(id)
        .delete()
        .then(function () {
          that.optenerDatos();
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
    limpiar() {
      this.form.name = "",
        this.form.apellido = "",
        this.form.telefono = "",
        this.form.fecha = "",
        this.form.hora = "";
    },
    optenerDatos() {
      this.items = [];
      db.collection("Reservaciones")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let datos = {
              Nombre: `${doc.data().nombres}-${doc.data().apellidos}`,
              Telefono: doc.data().telefono,
              Fecha: `${doc.data().fecha}-${doc.data().hora}`,
              id: doc.id,
            };
            this.items.push(datos);
            // console.log(`${doc.id} => ${doc.data()}`);
          });
        });
    },
    
  },
};
</script>

<style>
</style>
<template>
  <b-row class="">
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
    <b-col>
      <h1 class="mt-5 text-white">Horas ocupadas</h1>
      <b-card>
        <b-card-text>
          <b-form-select
            v-model="selected"
            :options="options"
            @change="updateRes()"
          ></b-form-select>
          <h6 class="my-2">horas ocupadas</h6>
          <ul>
          <li v-for="(item,index) in fechaF" :key="index">
              {{item}}
          </li>
          </ul>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>


<script>
import db from "../firebaseInit";
export default {
  name: "ClienteReservacion",
  data() {
    return {
      form: {
        name: "",
        apellido: "",
        telefono: "",
        fecha: "",
        hora: "",
      },
      selected: null,
      options: [{ value: null, text: "Ver fecha no disponibles" }],
      dataRes: [],
      fechaF: [],
    };
  },
  mounted() {
    this.getData();
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
            that.updateRes();
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    getData() {
      db.collection("Reservaciones")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.dataRes.push(doc.data().fecha);
          });

          this.limpiarDataR();
        });
    },
    limpiarDataR() {
      let unicos = Array.from(new Set(this.dataRes));

      unicos.forEach((item) => {
        let temp = {
          value: item,
          text: item,
        };
        this.options.push(temp);
      });

      // this.fechaF = result;
    },
    updateRes() {
      this.fechaF = [];
     var that = this;
      let museums = db
        .collection("Reservaciones")
        .where("fecha", "==", that.selected);
      museums.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          that.fechaF.push(doc.data().hora);
          // console.log(doc.id, " => ", doc.data());
        });
      });
    },

    limpiar() {
      (this.form.name = ""),
        (this.form.apellido = ""),
        (this.form.telefono = ""),
        (this.form.fecha = ""),
        (this.form.hora = "");
    },
  },
};
</script>

<style>
</style>
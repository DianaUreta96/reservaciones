<template>
  <b-row>
    <b-col md="12" class="mt-5">
      <b-card
        class="mt-3"
        :title="item.name"
        v-for="(item, index) in table"
        :key="index"
      >
        <!-- tabla  -->
        <b-table striped hover :items="item.items" :fields="fields">
          <!-- El boton de la tabla -->
          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="danger"
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
import db from "../firebaseInit";
export default {
  name: "AdminParticipantes",
  data() {
    return {
      ordenarEquipos: [],
      nombresTorneo: [],
      nombresEquipos: [],
      fields: ["Nombre", "actions"],
      campeonatos: "",
      table: [],
    };
  },
  mounted: async function () {
    await this.optenerDatos();
    this.ordenarTabla();
  },
  methods: {
    async optenerDatos() {
      try {
        this.table = [];
        this.nombresTorneo = [];
        this.nombresEquipos = [];
        var data = await db.collection("Campeonatos").get();
        data.forEach((doc) => {
          let temp = {
            id: doc.id,
            nombre: doc.data().nombre,
            participantes: doc.data().participantes,
          };
          this.nombresTorneo = [...this.nombresTorneo, temp];
        });

        var querySnapshot = await db.collection("Participantes").get();
        querySnapshot.forEach((doc) => {
          let temp = {
            id: doc.id,
            nombreEquipo: doc.data().nombre,
            nombreTorneo: doc.data().torne,
          };
          this.nombresEquipos = [...this.nombresEquipos, temp];
        });
      } catch (error) {
        console.log(error);
      }
    },
    ordenarTabla() {
      this.nombresEquipos.map((equipo) => {
        this.nombresTorneo.map((torneo) => {
          if (equipo.nombreTorneo === torneo.id) {
            equipo.nombreTorneo = torneo.nombre;
            // console.log(torneo.nombre)
          }
          return;
        });
      });

      this.nombresEquipos.map((equipo) => {
        if (this.table.length === 0) {
          let data = {
            name: equipo.nombreTorneo,
            items: [{ Nombre: equipo.nombreEquipo, id: equipo.id }],
          };
          this.table.push(data);
          return;
        }

        let repite = false;
        let busqueda = this.table.map((item) => {
          if (item.name === equipo.nombreTorneo) {
            this.table.map((item) => {
              if (item.name === equipo.nombreTorneo) {
                let temp = {
                  Nombre: equipo.nombreEquipo,
                  id: equipo.id,
                };
                item.items = [...item.items, temp];
              }
              repite = true;
              return "ok";
            });
          }
          return "go";
        });

        if (busqueda[0] === "go" && !repite) {
          let dataV = {
            name: equipo.nombreTorneo,
            items: [{ Nombre: equipo.nombreEquipo, id: equipo.id }],
          };
          this.table.push(dataV);
          repite = false;
        }
      });
    },
    async Eliminar(id) {
      try {
        await db.collection("Participantes").doc(id).delete();
        await this.optenerDatos();
        this.ordenarTabla();
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    },
  },
};
</script>

<style>
</style>
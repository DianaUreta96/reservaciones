<template>
  <b-row>
    <b-col md="12" class="mt-5">
      <b-card class="mt-3" :title="item.name" v-for="(item,index) in table" :key="index">
        <!-- tabla  -->
        <b-table striped hover :items="item.items" :fields="fields">
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
import db from "../firebaseInit";
export default {
  name: "AdminParticipantes",
  data() {
    return {
      fields: ["Nombre", "actions"],
      campeonatos: "",
      table: [
        {
          name: "alggo",
          id:5,
          items: [{ Nombre: "test" }],
        },
      ],
    };
  },
  mounted: function () {
    this.optenerDatos();
  },
  methods: {
    optenerDatos() {
      //   this.items = [];
        var that = this;
      db.collection("Participantes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("Participantes");
            let Tempid = doc.data().torne;
            let Tempnombre = doc.data().nombre;
            console.log(Tempid);

            var docRef = db.collection("Campeonatos").doc(Tempid);

            docRef
              .get()
              .then(function (doc) {
                if (doc.exists) {
                  let datos = {
                    items: [
                      {
                        Nombre: Tempnombre,
                        id: doc.id,
                      },
                    ],
                    id:Tempid,
                    name:doc.data().nombre
                  };
                  
                  console.log(` table = ${that.table[0].id}`);
                 
                    that.table.forEach((element,index) => {
                        if(element.id === Tempid){
                            let datos = {
                                items: [
                                  {
                                    Nombre: Tempnombre,
                                    id: doc.id,
                                  },
                                ]
                            }
                            that.table[index].push(datos);
                            
                        }else{

                            that.table.push(datos);
                        }
                    });



                  console.log("Document data:", doc.data());
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
          });
        });
    },
  },
};
</script>

<style>
</style>
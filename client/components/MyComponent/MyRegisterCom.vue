<template>
  <v-row>
    <v-col v-for="registry in registries" :key="registry._id" cols="12" md="3">
      <v-card
        v-if="registry.component"
        elevation="4"
        height="auto"
        class="myRegisterCard"
      >
        <v-card-title>
          <v-card-subtitle class="v-card__subtitle-date">
            {{ momentDate(registry.component.createdAt) }}
          </v-card-subtitle>

          <v-spacer></v-spacer>

          <v-menu bottom left min-width="120px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn light icon v-bind="attrs" v-on="on">
                <v-icon class="dots-icon">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list dense class="pa-0 custom-v-list">
              <v-list-item @click="deleteRegistryComponent(registry)">
                <v-list-item-title> Delete </v-list-item-title>
              </v-list-item>
              <v-list-item @click="registryName = true">
                <v-list-item-title> Edit </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-img
          :src="registry.component.icon"
          class="mx-auto pb-2"
          width="80"
          height="80"
          contain
        ></v-img>
        <v-card-subtitle
          class="text-center text-lg-h4 text-md-h5 pb-0 text-truncate"
        >
          {{ registry.name ? registry.name : registry.component.name }}
        </v-card-subtitle>
        <v-row class="px-5 pb-5" justify="space-between" align="center">
          <div>
            <v-text-field
              v-model="registry.token"
              hide-details
              readonly
              desnse
              solo
              tile
              flat
              class="pt-0 link-text"
              background-color="transparent"
            ></v-text-field>
          </div>
          <div>
            <a
              href="#"
              class="text-decoration-none"
              @click.prevent="copyToClipboard(registry.token)"
            >
              <v-img src="/images/copy.svg" width="25px"></v-img>
            </a>
          </div>
        </v-row>
        <v-dialog v-model="registryName" width="500">
          <RegistryName
            :registrytId="registry._id"
            :registryName="
              registry.name ? registry.name : registry.component.name
            "
            edit-name
            @update="updateRegistry"
            @close="registryName = false"
          />
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RegistryName from '../RegisterComponent/RegistryName.vue'

export default {
  components: { RegistryName },
  data: () => ({
    create: false,
    confirmModal: false,
    registryName: false,
  }),
  computed: {
    registries() {
      return this.$store.state.registries
    },
  },
  created() {
    this.getRegistries()
  },
  methods: {
    getRegistries() {
      this.$store.dispatch('getRegistries')
    },
    deleteRegistryComponent(registry) {
      this.$confirm.delete().then((confirm) => {
        this.$store
          .dispatch('deleteRegistryComponent', registry._id)
          .then((res) => {
            this.$confirm.state('done')
          })
      })
    },
    updateRegistry(params) {
      this.$store.dispatch('updateRegistry', params).then((res) => {
        this.registryName = false
      })
    },
    copyToClipboard(str) {
      const el = document.createElement('input')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
  },
}
</script>

<template>
  <v-dialog
    :value="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="color" dense flat>
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-if="state === 'loading'">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-card-text>
      <v-card-text v-show="!!message" class="pa-4"> {{ message }} </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined text @click.native="agree"> Yes </v-btn>
        <v-btn color="danger" outlined text @click.native="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * Or use await:
 * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open
 * }
 */
export default {
  data: () => ({
    options: {
      color: 'primary',
      width: 350,
    },
  }),
  computed: {
    title() {
      return this.$store.state.confirm.title
    },
    message() {
      return this.$store.state.confirm.message
    },
    color() {
      return this.$store.state.confirm.color
    },
    dialog() {
      return this.$store.state.confirm.open
    },
    state() {
      return this.$store.state.confirm.state
    },
  },
  mounted() {},
  methods: {
    agree() {
      this.$confirm.resolve()
    },
    cancel() {
      this.$confirm.reject()
    },
  },
}
</script>

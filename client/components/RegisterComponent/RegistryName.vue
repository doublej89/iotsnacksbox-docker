<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      Enter a name for the registry
    </v-card-title>

    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      @submit.prevent="submit"
    >
      <v-card-text class="p-10">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Registry Name"
          required
        ></v-text-field>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" class="ml-4" @click.prevent="$emit('close')">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    equipmentId: {
      type: String,
    },
    registrytId: {
      type: String,
    },
    registryName: {
      type: String,
    },
    editName: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      lazy: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be more then 3 characters',
      ],
    }
  },
  mounted() {
    if (this.editName) {
      console.log('Name editting time')
      this.name = this.registryName
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const params = {
          _id: this.editName ? this.registrytId : this.equipmentId,
          name: this.name,
        }
        if (this.editName) {
          this.$emit('update', params)
        } else {
          this.$emit('submit', params)
        }
      }
    },
  },
}
</script>

<template>
    <v-responsive>
        <h1>Admin page</h1>
    </v-responsive>
</template>

<script>
export default {
    layout: 'admin',
    data: () => ({
        users: [],
        loading: false 
    }),
    created() {
        this.loading = true
        this.$axios
            .get('/admin/waiting')
            .then((res) => {
                this.users = [...res.data]
                this.loading = false
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }
}
</script>

<style>

</style>
<template>
    <div>
        <input placeholder="name" v-model="name"/>
        <button @click="search">search</button>
    </div>
</template>

<script>
import api from "../api"

export default {
    props: ['type'],
    data() {
        return {
            name: '',
        }
    },
    methods: {
        search() {
            const self = this
            let _api
            if (this.name === '') {
                _api = api.getAllContract(this.type)
            } else {
                _api = api.getContractByName(this.type, this.name)
            }
            _api.then(res => {
                self.$emit('search', res.data.data)
            }).catch(() => {
                self.$emit('search', [])
            })
            this.name = ''
        }
    }
}
</script>

<style lang="scss">
button {
    margin-left: 10px;
}
</style>

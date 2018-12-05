<template>
    <div>
        <table>
            <tr>
                <td><h3>Name</h3></td>
                <td><h3>Phone</h3></td>
            </tr>
            <tr v-for="contract of contracts" v-bind:key="contract.id">
                <td class="td-name">{{contract.name}}</td>
                <td class="td-phone">{{contract.phone}}</td>
                <td class="td-button"><button @click="edit(contract.id)">edit</button></td>
                <td class="td-button"><button @click="del(contract.id)">delete</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import api from "../api"

export default {
    props: ['type', 'contracts'],
    data() {
        return {
        }
    },
    methods: {
        edit(id) {
            this.$emit("update", "update", id)
        },
        del(id) {
            const self = this
            api.deleteContract(this.type, id).then(() => {
                self.$emit("delete")
            })
        }
    },
    beforeMount() {

    },
}
</script>

<style lang="scss">
table {
    width: 50vw;
    margin: 0 auto;
    margin-top: 20px;
}
tr {
    text-align: left;
    height: 40px;
    width:  50vw;
}
.td-name {
    width: 20%;
}
.td-phone {
    width: 50%;
}
.td-button {
    width: 15%;
    button {
        border-radius: 10px;
        height: 30px;
        width: 5vw;
        font-size: 14pt;
        background-color: rgb(30, 108, 180);
        color: white;
    }
}
</style>

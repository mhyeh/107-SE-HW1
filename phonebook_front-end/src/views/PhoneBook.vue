<template>
  <div>
    <search-bar v-on:search="search" :type=type />
    <hr>
    <p id="toolbar">
      <button class="button" @click="showDialog('add')">Add new contract</button>
    </p>
    <contract-list v-on:update="showDialog" v-on:delete="getAll" :type=type :contracts="contracts"  />
    <fancy-box class="box" v-model="activityBox">
      <div class="dialog">
        <h3>{{action === "add" ? "New Contract" : "Edit Contract"}}</h3>
        <p>
          <input v-if="action === 'add'" placeholder="name" v-model="newContract.name" />
          <input v-else placeholder="name" v-model="contracts[index].name" />
        </p>
        <p>
          <input v-if="action === 'add'" placeholder="phone" v-model="newContract.phone" />
          <input v-else placeholder="phone" v-model="contracts[index].phone" />
        </p>
        <p>
          <button v-if="action === 'add'" class="button" @click="active">Create</button>
          <button v-else class="button" @click="active">Update</button>
          <button class="button" @click="activityBox = false">Cancel</button>
        </p>
      </div>
    </fancy-box>
  </div>
</template>

<script>
import api from "../api";

export default {
  props: ['type'],
  data() {
    return {
      contracts: [],
      activityBox: false,
      action: "add",
      index: 0,
      newContract: {
        name: "",
        phone: ""
      }
    }
  },
  methods: {
    search(res) {
      this.contracts = res
    },
    getAll(changeDB = false) {
      const self = this
      api.getAllContract(this.type).then(res => {
        self.contracts = res.data.data
      }).catch(err => {
        if (changeDB) {
          self.contracts = []
        }
        console.log(err)
      })
    },
    showDialog(action, index = -1) {
      this.action = action
      this.index  = this.contracts.findIndex(contract => contract.id === index);
      if (this.action === 'update' && this.index === -1) {
        return;
      }
      this.activityBox = true
    },
    active() {
      const self = this
      let _api
      if (this.action === 'add') {
        _api = api.newContract(this.type, this.newContract)
      } else {
        _api = api.editContract(this.type, this.index, this.contracts[this.index])
      }
      _api.then(() => {
        self.activityBox = false
        self.getAll()
      }).catch(() => {
        self.activityBox = false
      })
    }
  },
  watch: {
    '$route' () {
      this.getAll(true)
    },
    'activityBox' (newValue, oldValue) {
      if (!newValue) {
        this.newContract.name = ""
        this.newContract.phone = ""
      }
    }
  },
  beforeMount() {
    this.getAll()
  }
}
</script>

<style lang="scss">
hr {
  width: 70vw;
  margin-top: 30px;
}

button {
  cursor: pointer;
}
#toolbar {
  width: 50vw;
  margin: 0 auto;
  text-align: left;
  margin-top: 10px;
}

.button {
  height: 30px;
  border-radius: 5px;
  background-color: rgb(30, 108, 180);
  color: white;
}

.dialog {
  width:  50%;
  height: 50%;
  margin-left:  25%;
  margin-right: 20%;
  margin-top: 10vh;
  background-color: white;
  border-radius: 10px;
  padding-left: 30px;
  input {
    height: 30px;
    border-radius: 5px;
    font-size: 20px
  }
  .button {
    height: 40px;
    width: 100px;
    margin-right: 20px;
    border-radius: 10px;
    font-size: 20px;
  }
}
</style>
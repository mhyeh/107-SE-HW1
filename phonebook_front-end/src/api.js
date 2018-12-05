import axois from 'axios'
import config from '../config/connect.config.json'

let client = axois.create(config)

export default {
    getAllContract: (type) => {
        return client.get(type + '/');
    },
    getContractByID: (type, id) => {
        return client.get(type + '/' + id);
    },
    getContractByName: (type, name) => {
        return client.get(type + '/name/' + name);
    },
    newContract: (type, data) => {
        return client.post(type + '/', data);
    },
    editContract: (type, id, data) => {
        return client.put(type + '/' + id, data);
    },
    deleteContract: (type, id) => {
        return client.delete(type + '/' + id);
    }
}
import axios from 'axios';

export class BankService{
    baseUrl = "http://localhost:8080/bankaccounts";

    getAccounts(){
        return axios.get(this.baseUrl + "/"+id).then(res => res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "/" + id + "create", bank).then(res => res.data);
    }

    delete(id) {
        return axios.get(this.baseUrl + "delete/"+id).then(res => res.data);
    }
}

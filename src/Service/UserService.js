import axios from 'axios';

export class UserService{
    baseUrl = "http://localhost:8080/user";

    getUser(){
        return axios.get(this.baseUrl + "/"+ id).then(res => res.data);
    }

    create(user) {
        return axios.post(this.baseUrl + "/signup", user).then(res => res.data);
    }

    update(user) {
        return axios.post(this.baseUrl + "/"+ id+ "/update", user).then(res => res.data);
    }


    }

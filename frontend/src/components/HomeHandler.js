import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class HomeHandler{

    constructor(){}

    countUsers(){
        const url = `${API_URL}/home/userscount/`;
        return axios.get(url).then(res => console.log(res))
    }

 }
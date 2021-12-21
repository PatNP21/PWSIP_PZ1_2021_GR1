import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PostHandler{

    constructor(){}

    createPost(sessionid){
        const url = `${API_URL}/posts/createpost/`;
        return axios.post(url,{
            "sessionid": sessionid
        })
    }
    getPost(idpost){
        const url = `${API_URL}/posts/get/${idpost}/`;
        return axios.get(url)
    }

}
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
    getPostbyId(idpost){
        const url = `${API_URL}/posts/get/idpost/${idpost}/`;
        return axios.get(url)
    }
    getuserPosts(author)
    {
        const url = `${API_URL}/posts/get/userposts/${author}/`;
        return axios.get(url,{
            "author": author
        })
    }
    getselfPosts(sessionid){
        const url = `${API_URL}/posts/get/myposts/`;
        return axios.get(url,{
            "sessionid": sessionid
        })
    }
    deletePost(sessionid,idpost)
    {
        const url = `${API_URL}/posts/delete/${idpost}/`;
        return axios.post(url,{
            "sessionid": sessionid
        })
    }
    likePost(sessionid,idpost)
    {
        const url = `${API_URL}/posts/like/${idpost}/`;
        return axios.post(url,{
            "sessionid": sessionid
        })
    }

}
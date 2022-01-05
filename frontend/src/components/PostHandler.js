import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PostHandler{

    constructor(){}

    createPost(sessionid,content){
        const url = `${API_URL}/posts/createpost/`;
        return axios.post(url,{
            "sessionid": sessionid,
            "content" : content,
            "title" : 'Tutuy'
        })
    }
    getPostbyId(idpost){
        const url = `${API_URL}/posts/get/idpost/${idpost}/`;
        return axios.get(url)
    }
    getuserPosts(author)
    {
        const url = `${API_URL}/posts/get/userposts/${author}/`;
        return axios.get(url)
    }
<<<<<<< HEAD
    getselfPosts(sessionid)
    {
        const url = `${API_URL}/posts/get/myposts/`
        return axios.post(url, {
            "sessionid": sessionid
=======
    getselfPosts(sessionid){
        const url = `${API_URL}/posts/get/myposts/`;
        return axios.post(url,{
            "sessionid" : sessionid
>>>>>>> 4050e00a76af63896bb61a0512c731d126373d63
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
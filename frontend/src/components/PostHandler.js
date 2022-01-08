import axios from 'axios';
import FormData from 'form-data'

const API_URL = 'http://localhost:8000';

export default class PostHandler{

    constructor(){}

    createPost(sessionid,content,image){
        const url = `${API_URL}/posts/createpost/`;
        let data = new FormData()
        data.append('sessionid', sessionid)
        data.append('content', content)
        data.append('title', 'Tutuy')
        data.append('image', image)
        return axios.post(url, data, {
            "headers": {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
        })
    }
    getPostbyId(idpost){
        const url = `${API_URL}/posts/get/idpost/${idpost}/`;
        return axios.get(url)
    }
    getPosts(page){
        const url = `${API_URL}/posts/get/page/${page}/`
        return axios.get(url)
    }
    getuserPosts(author)
    {
        const url = `${API_URL}/posts/get/userposts/${author}/`;
        return axios.get(url)
    }
    getselfPosts(sessionid)
    {
        const url = `${API_URL}/posts/get/myposts/`;
        return axios.post(url, {
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

    createComment(sessionid, idpost, content)
    {
        const url = `${API_URL}/comments/create/${idpost}`
        let data = new FormData()
        data.append('sessionid', sessionid)
        data.append('content', content)
        return axios.post(url, {
            "headers": {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
        })
    }

    deleteComment(sessionid, idcomment)
    {
        const url = `${API_URL}/comments/delete/${idcomment}`
        return axios.post(url, {
            'sessionid': sessionid
        })
    }

}
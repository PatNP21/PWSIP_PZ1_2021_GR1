import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default class AdminHandler {
    constructor() {}

    blockUser(sessionid, username) {
        const url = `${API_URL}/admin/blockuser/${username}/`
        return axios.post(url, {
            'sessionind': sessionid,
            'username': username
        })
    }

    unblockUser(sessionid, username) {
        const url = `${API_URL}/admin/unblockuser/${username}/`
        return axios.post(url, {
            'sessionind': sessionid,
            'username': username
        })
    }

    deletePost(sessionid, idpost) {
        const url = `${API_URL}/admin/deletepost/${idpost}/`
        return axios.post(url, {
            'sessionind': sessionid,
            'idpost': idpost
        })
    }

    deletePost(sessionid, idcomment) {
        const url = `${API_URL}/admin/deletecomment/${idcomment}/`
        return axios.post(url, {
            'sessionind': sessionid,
            'idcomment': idcomment
        })
    }
}
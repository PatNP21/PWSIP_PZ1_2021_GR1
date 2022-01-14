import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProfileHandler{

    constructor(){}


    myprofile(sessionid) {
        const url = `${API_URL}/profile/myprofile/`;
        return axios.post(url,{
            "sessionid" : sessionid
        });
    }
    getprofilebyusername(username)
    {
        const url = `${API_URL}/profile/get/${username}/`;
        return axios.get(url);
    }
    changeprofile(sessionid,email,firstname,lastname,dateofbirth)
    {
        const url = `${API_URL}/profile/changeprofile/`;
        return axios.post(url,{
            "sessionid" : sessionid,
            "email" : email,
            "firstname" : firstname,
            "lastname" : lastname,
            "dateofbirth" : dateofbirth
        });
    }

    // sekcja obslugi przyjacioł
    requestFriend(sessionid,username)
    {
        const url = `${API_URL}/friends/request/${username}/`;
        return axios.post(url,{
            "sessionid" : sessionid,
        });
    }
    acceptFriend(sessionid,username)
    {
        const url = `${API_URL}/friends/accept/${username}/`;
        return axios.post(url,{
            "sessionid" : sessionid,
        });
    }
    denyFriend(sessionid,username)
    {
        const url = `${API_URL}/friends/deny/${username}/`;
        return axios.post(url,{
            "sessionid" : sessionid,
        });
    }
    removeFriend(sessionid,username)
    {
        const url = `${API_URL}/friends/remove/${username}/`;
        return axios.post(url,{
            "sessionid" : sessionid,
        });
    }
    blockUser(sessionid,username)
    {
        const url = `${API_URL}/friends/block/${username}/`
        return axios.post(url,{
            "sessionid" : sessionid,
        })
    }
    unblockUser(sessionid,username)
    {
        const url = `${API_URL}/friends/unblock/${username}/`
        return axios.post(url,{
            "sessionid" : sessionid,
        })
    }

    list_of_friends(sessionid) {
        const URL = `${API_URL}/friends/list/`
        return axios.post(URL, {
            "sessionid" : sessionid
        })
    } 

    get_requests_for_you(sessionid) {
        const URL = `${API_URL}/friends/pendingrequests/`
        return axios.post(URL, {
            "sessionid" : sessionid
        })
    }
 }
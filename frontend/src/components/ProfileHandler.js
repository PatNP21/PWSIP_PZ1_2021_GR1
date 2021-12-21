import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProfileHandler{

    constructor(){}


    myprofile(sessionid) {
        const url = `${API_URL}/login/`;
        return axios.post(url,{
            "sessionid " : sessionid
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
            "sessionid " : sessionid,
            "email" : email,
            "firstname" : firstname,
            "lastname" : lastname,
            "dateofbirth" : dateofbirth
        });
    }
 }
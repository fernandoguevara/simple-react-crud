import axios from 'axios';

function getAxiosInstance(){
    
    const baseURL = 'http://localhost';
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function getNotes(){
    const axios = getAxiosInstance();
    return axios.get('/notes');
}

export function createNote(note){
    const axios = getAxiosInstance();
    return axios.post('/notes', note);
}

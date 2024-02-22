import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:8000'
})

api.interceptors.request.use((request)=>{
    if (localStorage.getItem('accessToken')){
        request.headers.Authorization = localStorage.getItem("token");
    }
    return request
})

export default api
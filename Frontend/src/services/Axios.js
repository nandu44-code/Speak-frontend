import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:8000'
})

api.interceptors.request.use((config)=>{

   const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
});

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response.status === 401) {
            
//             logoutUser(); 
//         }
//         return Promise.reject(error);
//     }
// );

// const logoutUser = () => {
    
//     localStorage.removeItem('accessToken');
    
//     window.location.href = '/login'; // Adjust the path as needed
// };

export default api
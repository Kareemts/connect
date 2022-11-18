import axios from 'axios';

const token = localStorage.getItem('token');
console.log('token',token);
export const axiosUrl = axios.create({
  headers: {
    Authorization: 'Bearer ' + token,
  },
});

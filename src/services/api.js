import axios from 'axios';

const api = axios.create({ baseURL: 'https://tvsettings.sportpari.by/api' });

export default api;
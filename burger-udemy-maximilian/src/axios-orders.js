import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-2b34f.firebaseio.com/'
})

export default instance;
import axios from "axios";
export default axios.create({
    baseURL: 'http://localhost:8060',
    // baseURL: 'http://192.168.0.106:8060'
});
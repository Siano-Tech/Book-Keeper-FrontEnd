import axios from 'axios';

// Default Axis Endpoint for all the requests
// axios.defaults.baseURL = 'http://192.168.0.130:5000';
// axios.defaults.baseURL = 'https://book-keeper-backend.vercel.app';

// Default Axis Endpoint for all the requests
if(window.location.hostname.includes('localhost')) {
    // axios.defaults.baseURL = 'http://192.168.0.130:5000';
    axios.defaults.baseURL = 'http://192.168.5.209:5000';
} else {
    axios.defaults.baseURL = 'https://book-keeper-backend.vercel.app';
}
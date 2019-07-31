import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  params: {
    print: 'pretty'
  }
});

export default axiosInstance;

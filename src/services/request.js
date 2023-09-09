import axios from 'axios';

const API_KEY = '38331073-f9ce91789c32f4e98a0c5c888';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPictures = async (query, page) => {
  const resp =
    await axios.get(`/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12
`);
  return resp;
};

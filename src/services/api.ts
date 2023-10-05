import md5 from 'md5';

const publicKey = process.env.REACT_APP_PUBLIC_KEY as string;
const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
const apiUrl = process.env.REACT_APP_API_URL as string;

const timeStamp = Date.now();
const md5Hash = md5(timeStamp + privateKey + publicKey);


const api = {
  getCharacters: async(offset = 0) => {
    const response = await fetch(`${apiUrl}/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${md5Hash}&limit=10&offset=${offset}`);

    return response.json();
  },
  getCharacterById: async(id: number) => {
    const response = await fetch( `${apiUrl}/characters/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${md5Hash}`);

    return response.json();;
  },
};

export default api;
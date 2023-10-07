import md5 from 'md5';

interface CharacterSearchParams {
  limit: number;
  offset: number;
  nameStartsWith?: string;
};

const publicKey = process.env.REACT_APP_PUBLIC_KEY as string;
const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
const apiUrl = process.env.REACT_APP_API_URL as string;

const timeStamp = Date.now();
const md5Hash = md5(timeStamp + privateKey + publicKey);

const createUrlWithParams = (endpoint?: string, params: Record<string, any> = {}): string => {
  const queryParams = new URLSearchParams({
    ts: timeStamp.toString(),
    apikey: publicKey,
    hash: md5Hash,
    ...params,
  });

  return `${apiUrl}/${endpoint}?${queryParams.toString()}`;
};

const api = {
  getCharacters: async(offset: number = 0, nameStartsWith: string = '') => {
    const searchParams: CharacterSearchParams = {
      limit: 10,
      offset,
    };
  
    if (nameStartsWith) {
      searchParams.nameStartsWith = nameStartsWith;
    }
  
    const url: string = createUrlWithParams('characters', searchParams);
    const response = await fetch(url);
    return response.json();
  },

  getCommicsByCharacterId: async (id: number) => {
    const url: string = createUrlWithParams(`/characters/${id}/comics`);
    const response = await fetch(url);
    return response.json();
  },

  getSeriesByCharacterId: async (id: number) => {
    const url: string = createUrlWithParams(`/characters/${id}/series`);
    const response = await fetch(url);
    return response.json();
  },

  getEventsByCharacterId: async (id: number) => {
    const url: string = createUrlWithParams(`/characters/${id}/events`);
    const response = await fetch(url);
    return response.json();
  }
};

export default api;
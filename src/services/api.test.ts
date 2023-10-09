import api from './api';
import { mockedResponseGetCharacters, mockedResponseGetComicsByCharacterId, mockedResponseGetEventsByCharacterId, mockedResponseGetSeriesByCharacterId } from './mockRequest';

const CHARACTER_ID = 1011334;

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch characters', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => Promise.resolve(mockedResponseGetCharacters),
    });

    const characters = await api.getCharacters();
    expect(characters).toHaveProperty('code', 200);
    expect(characters).toHaveProperty('status', 'Ok');
    expect(characters).toHaveProperty('copyright', '© 2023 MARVEL');
    expect(characters).toHaveProperty('data');
    expect(characters.data).toHaveProperty('results');
    
    expect(characters.data.results.length).toBeGreaterThan(0);
    
    const firstCharacter = characters.data.results[0];
    expect(firstCharacter).toHaveProperty('id');
    expect(firstCharacter).toHaveProperty('name');
    expect(firstCharacter).toHaveProperty('description');
    expect(firstCharacter).toHaveProperty('thumbnail');
    expect(firstCharacter).toHaveProperty('comics');
    expect(firstCharacter).toHaveProperty('series');
    expect(firstCharacter).toHaveProperty('stories');
    expect(firstCharacter).toHaveProperty('events');
    expect(firstCharacter).toHaveProperty('urls');
  });

  it('should fetch comics by character id', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => Promise.resolve(mockedResponseGetComicsByCharacterId),
    });

    const comics = await api.getComicsByCharacterId(CHARACTER_ID);
    expect(comics).toHaveProperty('code', 200);
    expect(comics).toHaveProperty('status', 'Ok');
    expect(comics).toHaveProperty('copyright', '© 2023 MARVEL');
    expect(comics).toHaveProperty('data');
    expect(comics.data).toHaveProperty('results');
    
    expect(comics.data.results.length).toBeGreaterThan(0);
    
    const firstComic = comics.data.results[0];
    expect(firstComic).toHaveProperty('id');
    expect(firstComic).toHaveProperty('title');
    expect(firstComic).toHaveProperty('digitalId');
    expect(firstComic).toHaveProperty('issueNumber');
    expect(firstComic).toHaveProperty('variantDescription');
    expect(firstComic).toHaveProperty('description');
    expect(firstComic).toHaveProperty('modified');
    expect(firstComic).toHaveProperty('isbn');
    expect(firstComic).toHaveProperty('upc');
    expect(firstComic).toHaveProperty('diamondCode');
    expect(firstComic).toHaveProperty('ean');
    expect(firstComic).toHaveProperty('issn');
    expect(firstComic).toHaveProperty('format');
    expect(firstComic).toHaveProperty('pageCount');
    expect(firstComic).toHaveProperty('textObjects');
    expect(firstComic).toHaveProperty('resourceURI');
    expect(firstComic).toHaveProperty('urls');
    expect(firstComic).toHaveProperty('series');
    expect(firstComic).toHaveProperty('variants');
    expect(firstComic).toHaveProperty('collections');
    expect(firstComic).toHaveProperty('collectedIssues');
    expect(firstComic).toHaveProperty('dates');
  });

  it('should fetch series by character id', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => Promise.resolve(mockedResponseGetSeriesByCharacterId),
    });

    const series = await api.getSeriesByCharacterId(CHARACTER_ID);
    expect(series).toHaveProperty('code', 200);
    expect(series).toHaveProperty('status', 'Ok');
    expect(series).toHaveProperty('attributionText', 'Data provided by Marvel. © 2023 MARVEL');
    expect(series).toHaveProperty('data');
    expect(series.data).toHaveProperty('results');
    
    expect(series.data.results.length).toBeGreaterThan(0);
    
    const firstSerie = series.data.results[0];
    expect(firstSerie).toHaveProperty('id');
    expect(firstSerie).toHaveProperty('title');
    expect(firstSerie).toHaveProperty('description');
    expect(firstSerie).toHaveProperty('startYear');
    expect(firstSerie).toHaveProperty('endYear');
    expect(firstSerie).toHaveProperty('type');
    expect(firstSerie).toHaveProperty('modified');
    expect(firstSerie).toHaveProperty('thumbnail');
    expect(firstSerie).toHaveProperty('creators');
    expect(firstSerie).toHaveProperty('characters');
    expect(firstSerie).toHaveProperty('stories');
    expect(firstSerie).toHaveProperty('comics');
    expect(firstSerie).toHaveProperty('events');
    expect(firstSerie).toHaveProperty('next');
    expect(firstSerie).toHaveProperty('previous');
    expect(firstSerie).toHaveProperty('resourceURI');
    expect(firstSerie).toHaveProperty('urls');
  });

  it('should fetch events by character id', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => Promise.resolve(mockedResponseGetEventsByCharacterId),
    });

    const events = await api.getEventsByCharacterId(CHARACTER_ID);
    expect(events).toHaveProperty('code', 200);
    expect(events).toHaveProperty('status', 'Ok');
    expect(events).toHaveProperty('attributionText', 'Data provided by Marvel. © 2023 MARVEL');
    expect(events).toHaveProperty('data');
    expect(events.data).toHaveProperty('results');
    
    expect(events.data.results.length).toBeGreaterThan(0);
    
    const firstEvent = events.data.results[0];
    expect(firstEvent).toHaveProperty('id');
    expect(firstEvent).toHaveProperty('title');
    expect(firstEvent).toHaveProperty('description');
    expect(firstEvent).toHaveProperty('resourceURI');
    expect(firstEvent).toHaveProperty('modified');
    expect(firstEvent).toHaveProperty('start');
    expect(firstEvent).toHaveProperty('end');
    expect(firstEvent).toHaveProperty('creators');
    expect(firstEvent).toHaveProperty('thumbnail');
    expect(firstEvent).toHaveProperty('characters');
    expect(firstEvent).toHaveProperty('stories');
    expect(firstEvent).toHaveProperty('comics');
    expect(firstEvent).toHaveProperty('next');
    expect(firstEvent).toHaveProperty('previous');
  });
});
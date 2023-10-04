export type CharacterType = {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: [
      {
        name: string;
        resourceURI: string;
        available: number;
        returned: number;
      }
    ];
  };
  events: {
    items: [
      {
        name: string;
        resourceURI: string;
        available: number;
      }
    ];
  };
};
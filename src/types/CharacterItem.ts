import { MediaType } from "./MediaItem";

export type CharacterType = {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: MediaType[];
  };
  events: {
    items: MediaType[];
  };
};
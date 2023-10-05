import { CharacterType } from "./CharacterItem";

export type CharacterResponse = {
  code: number;
  data: {
    count: number;
    limit: number;
    offset: number;
    results: CharacterType[];
    total: number;
  }
}
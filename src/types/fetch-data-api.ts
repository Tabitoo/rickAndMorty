import { Character } from "./character";

export interface FetchDataApi {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string | null;
  },
  results: Character[];
}
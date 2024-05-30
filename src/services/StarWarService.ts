import { Character } from "../interfaces/TableInterfaces";

class StarWarsService {
  private readonly baseUrl: string = "https://swapi.dev/api/";

  async getCharacter(id: number): Promise<Character | null> {
    try {
      const response = await fetch(`${this.baseUrl}people/${id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data = await response.json();
      return data as Character;
    } catch (error) {
      console.error("Error fetching character:", error);
      return null;
    }
  }

  async getCharacters(): Promise<Character[] | null> {
    try {
      const response = await fetch(`${this.baseUrl}people/`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      return data.results as Character[];
    } catch (error) {
      console.error("Error fetching characters:", error);
      return null;
    }
  }
}

export default StarWarsService;

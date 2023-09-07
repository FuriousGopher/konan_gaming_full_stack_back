import { promises as fsPromises } from 'fs';
import * as path from 'path';


// Reads and parses game data from a JSON file, optionally filtering by search query
export const fetchGameData = async (searchQuery?: string) => {
  try {
    const filePath = path.join(__dirname, '../..', 'public', 'game-data.json');
    const data = await fsPromises.readFile(filePath);
    const parsedGamesArray = JSON.parse(data.toString());
    if (searchQuery) {
      return parsedGamesArray.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return JSON.parse(data.toString());
  } catch (err) {
    throw err;
  }
};

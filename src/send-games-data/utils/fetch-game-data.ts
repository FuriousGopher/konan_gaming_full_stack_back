import { promises as fsPromises } from 'fs';

export const fetchGameData = async (searchQuery?: string) => {
  try {
    const data = await fsPromises.readFile('dist/public/game-data.json');
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

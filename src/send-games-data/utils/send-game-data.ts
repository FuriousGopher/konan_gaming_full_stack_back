import { promises as fsPromises } from 'fs';

export const sendGameData = async (searchQuery?: string) => {
  try {
    const data = await fsPromises.readFile(
      'src/send-games-data/games-info/game-data.json',
    );
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

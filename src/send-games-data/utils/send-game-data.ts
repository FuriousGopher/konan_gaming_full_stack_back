import { promises as fsPromises } from 'fs';

export const sendGameData = async () => {
  try {
    const data = await fsPromises.readFile(
      'src/send-games-data/games-info/game-data.json',
    );
    return JSON.parse(data.toString());
  } catch (err) {
    throw err;
  }
};

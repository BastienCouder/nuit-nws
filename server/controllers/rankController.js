import fs from "fs/promises";

// Read
export const readrank = async (req, res, next) => {
  try {
    const data = await fs.readFile("./data/user.json", "utf8");
    const ranks = JSON.parse(data);
    res.json(ranks);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la lecture des données des ranks.",
    });
  }
};
const RankController = {
  readrank,
};

export { RankController };

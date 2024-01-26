import fs from "fs/promises";

// Read
export const readUser = async (req, res, next) => {
  try {
    const data = await fs.readFile("./data/user.json", "utf8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la lecture des données des utilisateurs.",
    });
  }
};
const UserController = {
  readUser,
};

export { UserController };

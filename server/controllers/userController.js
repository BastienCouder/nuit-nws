import User from "../models/user.js";
// Read
export const readUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la lecture des données des utilisateurs.",
    });
  }
};

export const signup = async (req, res, next) => {
  const { nom, prenom, email, tel } = req.body;
  try {
    const user = new User({
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
      score,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = (req, res, next) => {};

const UserController = {
  readUser,
  signup,
  login,
};

export { UserController };

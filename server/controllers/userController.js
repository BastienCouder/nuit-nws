import User from "../schemas/user.js";
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
  const { nom, prenom, email, tel, entreprise, poste } = req.body;
  try {
    if (!nom || !prenom || !email || !tel || !entreprise || !poste) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const user = new User({
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

export const login = (req, res, next) => {};

const UserController = {
  readUser,
  signup,
  login,
};

export { UserController };

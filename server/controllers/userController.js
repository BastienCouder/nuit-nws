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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Un utilisateur avec cet email existe déjà." });
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
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(". ") });
    }
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const login = (req, res, next) => {};

const UserController = {
  readUser,
  signup,
  login,
};

export { UserController };

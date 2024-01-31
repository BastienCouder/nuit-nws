// Dans votre fichier routes (par exemple, qualityRoutes.js)
import Quality from "../schemas/quality.js";

export const createQuality = async (req, res, next) => {
  const { contenu } = req.body;

  if (!contenu) {
    return res
      .status(400)
      .json({ message: "Le nom de la qualité est requis." });
  }

  try {
    const newQuality = new Quality({ contenu });
    const savedQuality = await newQuality.save();
    res.status(201).json(savedQuality);
  } catch (error) {
    console.error("Erreur lors de la création de la qualité :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la qualité." });
  }
};
export const readQualities = async (req, res, next) => {
  try {
    const qualities = await Quality.find({});
    res.status(200).json(qualities);
  } catch (error) {
    console.error("Erreur lors de la récupération des qualités :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des qualités." });
  }
};

const qualityController = {
  createQuality,
  readQualities,
};

export { qualityController };

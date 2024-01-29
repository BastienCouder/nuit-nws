// Create
export const answerRank = async (req, res, next) => {
  try {
    // Suppose que les données à ajouter sont présentes dans le corps de la requête (req.body)
    const newData = req.body;

    res.json({ success: true, message: "Rank créé avec succès." });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la création du rank.",
    });
  }
};

const answerController = {answerRank};

export { answerController };

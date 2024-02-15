const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Supprimer toutes les entrées de la table SelectionUtilisateur
  await prisma.selectionUtilisateur.deleteMany({});
  
  console.log(`Toutes les entrées de 'SelectionUtilisateur' ont été supprimées.`);
  
  // ... (le reste de votre script de seed)
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

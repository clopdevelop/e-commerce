import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop Gaming',
      description: 'Una laptop gaming de alto rendimiento para los juegos más exigentes.',
      price: 1500.00,
      // Asegúrate de añadir o quitar campos según tu esquema
    },
  });

  console.log(`Producto creado: ${product1.name}`);

  const product2 = await prisma.product.create({
    data: {
      name: 'Smartphone 5G',
      description: 'Última generación de smartphone con conectividad 5G.',
      price: 800.00,
      // Asegúrate de añadir o quitar campos según tu esquema
    },
  });

  console.log(`Producto creado: ${product2.name}`);

  // Añade más productos según necesites
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

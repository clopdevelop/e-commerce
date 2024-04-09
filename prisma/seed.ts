import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: "Laptop Gaming",
      description:
        "Una laptop gaming de alto rendimiento para los juegos más exigentes.",
      price: 1500.0,
      // Asegúrate de añadir o quitar campos según tu esquema
    },
  });


  const product2 = await prisma.product.create({
    data: {
      name: "Smartphone 5G",
      description: "Última generación de smartphone con conectividad 5G.",
      price: 800.0,
      // Asegúrate de añadir o quitar campos según tu esquema
    },
  });


  // Creación de un usuario de ejemplo
  const user = await prisma.user.create({
    data: {
      first_name: "usuario",
      email: "usuario@example.com",
      password: "usuario", 
    },
  });


  // Creación de tipos de entregas
  const deliverytype = await prisma.deliveryType.create({
    data: {
      delivery_type: "Standard",
    },
  });

  await prisma.deliveryType.create({
    data: {
      delivery_type: "Express",
    },
  });

  await prisma.deliveryType.create({
    data: {
      delivery_type: "Free",
    },
  });

  await prisma.deliveryType.create({
    data: {
      delivery_type: "InShop",
    },
  });

  // Creación de un método de pago de ejemplo
  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      payment_method: "Tarjeta de Crédito",
    },
  });

  // Creación de una orden
  const order = await prisma.order.create({
    data: {
      id_user: user.id_user,
      delivery_type: deliverytype.delivery_type, 
      status: "PENDING",
      paid: false,
      orderDetails: {
        create: [
          { id_product: product1.id_product, quantity: 1, unit_price: 1500.0 },
          { id_product: product2.id_product, quantity: 2, unit_price: 800.0 },
        ],
      },
      invoice: {
        create: {
          invoice_n: "INV0001",
          type: "A",
          amount: 3100.0, 
          paymentMethod: {
            connect: {
              id_p_method: paymentMethod.id_p_method, 
            },
          },
        },
      },
    },
    include: {
      orderDetails: true,
      invoice: true,
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
